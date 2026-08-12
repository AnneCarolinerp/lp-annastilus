import fs from 'node:fs/promises';
import path from 'node:path';

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
const API_VERSION = process.env.INSTAGRAM_API_VERSION?.trim() || 'v26.0';
const EXPECTED_USERNAME = (process.env.INSTAGRAM_EXPECTED_USERNAME?.trim() || 'annastilus').toLowerCase();
const API_BASE = `https://graph.instagram.com/${API_VERSION}`;
const OUTPUT_PATH = path.resolve(process.cwd(), 'data/instagram-feed.json');
const MAX_POSTS = 7;

if (!ACCESS_TOKEN) {
  console.error('INSTAGRAM_ACCESS_TOKEN não foi configurado.');
  process.exit(1);
}

const requestJson = async (url, context) => {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(20_000)
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.error) {
    const message = payload?.error?.message || `HTTP ${response.status}`;
    throw new Error(`${context}: ${message}`);
  }

  return payload;
};

const instagramUrl = (pathname, params = {}) => {
  const url = new URL(`${API_BASE}${pathname}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  url.searchParams.set('access_token', ACCESS_TOKEN);
  return url;
};

const getCarouselCover = async (mediaId) => {
  const payload = await requestJson(
    instagramUrl(`/${mediaId}/children`, {
      fields: 'id,media_type,media_url,thumbnail_url',
      limit: '1'
    }),
    `Falha ao obter a capa do carrossel ${mediaId}`
  );

  const firstChild = payload?.data?.[0];
  if (!firstChild) return '';

  return firstChild.media_type === 'VIDEO'
    ? firstChild.thumbnail_url || ''
    : firstChild.media_url || '';
};

const compactCaption = (caption = '') => {
  const normalized = String(caption).replace(/\s+/g, ' ').trim();
  if (normalized.length <= 220) return normalized;
  return `${normalized.slice(0, 219).trimEnd()}…`;
};

const main = async () => {
  // Valida o token e a conta antes de tocar no último JSON válido.
  const account = await requestJson(
    instagramUrl('/me', { fields: 'user_id,username' }),
    'Não foi possível validar a conta do Instagram'
  );

  const username = String(account.username || '').toLowerCase();
  if (username !== EXPECTED_USERNAME) {
    throw new Error(
      `O token pertence a @${account.username || 'desconhecido'}, mas o feed esperado é @${EXPECTED_USERNAME}.`
    );
  }

  const instagramUserId = account.user_id;
  if (!instagramUserId) {
    throw new Error('A API não retornou user_id para a conta profissional autorizada.');
  }

  const media = await requestJson(
    instagramUrl(`/${instagramUserId}/media`, {
      fields: 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp',
      limit: String(MAX_POSTS)
    }),
    'Não foi possível consultar as mídias do Instagram'
  );

  const sourcePosts = Array.isArray(media.data) ? media.data : [];
  if (!sourcePosts.length) {
    throw new Error('A API retornou zero publicações; o último feed válido foi preservado.');
  }

  const normalizedPosts = [];

  for (const item of sourcePosts) {
    let imageUrl = item.media_type === 'VIDEO'
      ? item.thumbnail_url || ''
      : item.media_url || '';

    if (!imageUrl && item.media_type === 'CAROUSEL_ALBUM') {
      imageUrl = await getCarouselCover(item.id);
    }

    if (!imageUrl || !item.permalink || !item.id) continue;

    normalizedPosts.push({
      id: item.id,
      mediaType: item.media_type,
      imageUrl,
      permalink: item.permalink,
      caption: compactCaption(item.caption),
      timestamp: item.timestamp
    });
  }

  normalizedPosts.sort((a, b) => {
    const aTime = Date.parse(a.timestamp || '') || 0;
    const bTime = Date.parse(b.timestamp || '') || 0;
    return bTime - aTime;
  });

  const posts = normalizedPosts.slice(0, MAX_POSTS);
  if (!posts.length) {
    throw new Error('Nenhuma publicação retornou uma imagem utilizável; o feed anterior foi preservado.');
  }

  const output = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    username: EXPECTED_USERNAME,
    posts
  };

  // Escrita atômica: o arquivo anterior só é substituído após uma resposta válida completa.
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  const temporaryPath = `${OUTPUT_PATH}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  await fs.rename(temporaryPath, OUTPUT_PATH);

  console.log(`Feed de @${EXPECTED_USERNAME} atualizado com ${posts.length} publicação(ões).`);
};

main().catch((error) => {
  console.error(`Falha ao atualizar o feed: ${error.message}`);
  process.exit(1);
});
