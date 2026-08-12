import fs from 'node:fs/promises';

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
const OUTPUT_FILE = process.env.INSTAGRAM_REFRESHED_TOKEN_FILE?.trim();

if (!ACCESS_TOKEN) {
  console.error('INSTAGRAM_ACCESS_TOKEN não foi configurado.');
  process.exit(1);
}

if (!OUTPUT_FILE) {
  console.error('INSTAGRAM_REFRESHED_TOKEN_FILE não foi configurado.');
  process.exit(1);
}

const main = async () => {
  const url = new URL('https://graph.instagram.com/refresh_access_token');
  url.searchParams.set('grant_type', 'ig_refresh_token');
  url.searchParams.set('access_token', ACCESS_TOKEN);

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(20_000)
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.error || !payload.access_token) {
    const message = payload?.error?.message || `HTTP ${response.status}`;
    throw new Error(message);
  }

  await fs.writeFile(OUTPUT_FILE, `${payload.access_token}\n`, { mode: 0o600 });

  const expiresInDays = payload.expires_in
    ? Math.round((Number(payload.expires_in) / 86_400) * 10) / 10
    : null;

  console.log(
    expiresInDays
      ? `Token renovado com validade informada de aproximadamente ${expiresInDays} dias.`
      : 'Token renovado com sucesso.'
  );
};

main().catch((error) => {
  console.error(`Falha ao renovar o token do Instagram: ${error.message}`);
  process.exit(1);
});
