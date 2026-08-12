(() => {
  'use strict';

  const feed = document.querySelector('[data-instagram-feed]');
  if (!feed) return;

  const FEED_URL = 'data/instagram-feed.json';
  const EXPECTED_USERNAME = 'annastilus';
  const MAX_POSTS = 7;
  const DEFAULT_ALT = 'Publicação da AnnaStilus no Instagram';
  const fallbackItems = Array.from(feed.children, (item) => item.cloneNode(true));

  const buildAltText = (caption = '') => {
    const normalized = String(caption).replace(/\s+/g, ' ').trim();
    if (!normalized) return DEFAULT_ALT;

    const maxLength = 120;
    if (normalized.length <= maxLength) return normalized;

    return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
  };

  const isValidInstagramUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && /(^|\.)instagram\.com$/i.test(url.hostname);
    } catch {
      return false;
    }
  };

  const isValidImageUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const normalizePosts = (payload) => {
    if (!payload || String(payload.username || '').toLowerCase() !== EXPECTED_USERNAME) return [];
    if (!Array.isArray(payload.posts)) return [];

    return payload.posts
      .filter((post) => post && isValidImageUrl(post.imageUrl) && isValidInstagramUrl(post.permalink))
      .sort((a, b) => {
        const aTime = Date.parse(a.timestamp || '') || 0;
        const bTime = Date.parse(b.timestamp || '') || 0;
        return bTime - aTime;
      })
      .slice(0, MAX_POSTS);
  };

  const renderPost = (post, index) => {
    const link = document.createElement('a');
    link.href = post.permalink;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Abrir publicação ${index + 1} da AnnaStilus no Instagram`);

    const image = document.createElement('img');
    image.src = post.imageUrl;
    image.alt = buildAltText(post.caption);
    image.width = 480;
    image.height = 380;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.referrerPolicy = 'no-referrer';
    image.addEventListener('error', () => {
      const fallback = fallbackItems[index]?.cloneNode(true);
      if (fallback && link.isConnected) link.replaceWith(fallback);
    }, { once: true });

    link.append(image);
    return link;
  };

  const loadInstagramFeed = async () => {
    feed.setAttribute('aria-busy', 'true');

    try {
      // Atualiza o JSON em intervalos curtos sem forçar uma URL única a cada visita.
      const cacheBucket = Math.floor(Date.now() / (10 * 60 * 1000));
      const response = await fetch(`${FEED_URL}?v=${cacheBucket}`, {
        cache: 'no-cache',
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error(`Instagram feed HTTP ${response.status}`);

      const payload = await response.json();
      const posts = normalizePosts(payload);

      // O HTML já contém a galeria estática atual como fallback. Só substituímos
      // o conteúdo depois que um feed válido foi carregado por completo.
      if (!posts.length) return;

      const fragment = document.createDocumentFragment();
      posts.forEach((post, index) => fragment.append(renderPost(post, index)));
      feed.replaceChildren(fragment);
    } catch (error) {
      // Falha silenciosa para o visitante: a seção continua usando o fallback do HTML.
      console.warn('Feed do Instagram indisponível; mantendo fallback local.', error);
    } finally {
      feed.setAttribute('aria-busy', 'false');
    }
  };

  loadInstagramFeed();
})();
