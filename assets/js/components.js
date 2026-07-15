(() => {
  'use strict';

  let toastTimer;

  window.showSiteToast = (message) => {
    const toast = document.querySelector('[data-toast]');
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 4200);
  };
})();
