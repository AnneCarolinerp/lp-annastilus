(() => {
  'use strict';

  const config = window.ANNASTILUS_CONFIG || {};
  const onlyDigits = (value = '') => String(value).replace(/\D/g, '');
  const whatsappNumber = onlyDigits(config.whatsappNumber);

  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll('[data-whatsapp-link]').forEach((link) => {
    const message = link.getAttribute('data-whatsapp-message') || 'Olá! Vim pelo site da AnnaStilus.';

    if (whatsappNumber.length >= 12) {
      link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      return;
    }

    link.addEventListener('click', (event) => {
      event.preventDefault();
      const text = 'Configure o número do WhatsApp em assets/js/config.js antes de publicar o site.';
      if (typeof window.showSiteToast === 'function') window.showSiteToast(text);
      else window.alert(text);
    });
  });

  const externalLinks = {
    Instagram: config.instagramUrl,
    Facebook: config.facebookUrl,
    Pinterest: config.pinterestUrl
  };

  document.querySelectorAll('[data-placeholder-link]').forEach((link) => {
    const key = link.getAttribute('data-placeholder-link');
    const url = externalLinks[key];
    if (url) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      return;
    }

    link.addEventListener('click', (event) => {
      event.preventDefault();
      const text = `Configure o link de ${key} em assets/js/config.js antes de publicar o site.`;
      if (typeof window.showSiteToast === 'function') window.showSiteToast(text);
      else window.alert(text);
    });
  });
})();
