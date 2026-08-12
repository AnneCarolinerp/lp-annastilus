(() => {
  'use strict';

  const feed = document.querySelector('[data-instagram-feed]');
  if (!feed) return;

  const FEED_URL = 'data/instagram-feed.json';
  const MAX_POSTS = 7;
  const DEFAULT_ALT = 'Publicação da AnnaStilus no Instagram';

  const buildAltText = (caption = '') => {
    const normalized = String(caption).replace(/\s+/g, ' ').trim();
    if (!normalized) return DEFAULT_ALT;

    const maxLength = 120;
    if (normalized.length <= maxLength) return normalized;

    return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
  };

  const renderPost = (post) => {
    const link = document.createElement('a');
    link.href = post.permalink;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Abrir publicação da AnnaStilus no Instagram');

    const image = document.createElement('img');
    image.src = post.imageUrl;
    image.alt = buildAltText(post.caption);
    image.width = 480;
    image.height = 380;
    image.loading = 'lazy';
    image.decoding = 'async';

    link.append(image);
    return link;
  };

  const loadInstagramFeed = async () => {
    feed.setAttribute('aria-busy', 'true');

    try {
      // O pequeno versionamento evita manter um JSON antigo em cache por muitas horas,
      // sem criar uma URL diferente a cada visita.
      const cacheBucket = Math.floor(Date.now() / (10 * 60 * 1000));
      const response = await fetch(`${FEED_URL}?v=${cacheBucket}`, { cache: 'no-cache' });

      if (!response.ok) throw new Error(`Instagram feed HTTP ${response.status}`);

      const payload = await response.json();
      const posts = Array.isArray(payload.posts)
        ? payload.posts
          .filter((post) => post && post.imageUrl && post.permalink)
          .slice(0, MAX_POSTS)
        : [];

      // Mantém as imagens estáticas atuais como fallback se ainda não houver feed válido.
      if (!posts.length) return;

      const fragment = document.createDocumentFragment();
      posts.forEach((post) => fragment.append(renderPost(post)));
      feed.replaceChildren(fragment);
    } catch {
      // Falha silenciosa para o visitante: o HTML estático já presente continua como fallback.
    } finally {
      feed.setAttribute('aria-busy', 'false');
    }
  };

  loadInstagramFeed();
})();
