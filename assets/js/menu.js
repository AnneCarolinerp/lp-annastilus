(() => {
  'use strict';

  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const toggleLabel = toggle?.querySelector('.sr-only');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (toggleLabel) toggleLabel.textContent = 'Abrir menu';
  };

  toggle.addEventListener('click', () => {
    const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(willOpen));
    menu.classList.toggle('is-open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
    if (toggleLabel) toggleLabel.textContent = willOpen ? 'Fechar menu' : 'Abrir menu';
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
})();
