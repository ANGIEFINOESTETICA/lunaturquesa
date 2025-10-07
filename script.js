(() => {
  const toggle = document.getElementById('lang-toggle');
  const translatable = Array.from(document.querySelectorAll('[data-en]'));
  const whatsappText = document.querySelector('.wh-text');
  let lang = 'en'; // default english

  function applyLanguage(toLang) {
    translatable.forEach(el => {
      const text = el.getAttribute(`data-${toLang}`);
      if (text !== null) {
        if (el.children.length === 0) {
          el.textContent = text;
        } else {
          el.innerText = text;
        }
      }
    });
    if (whatsappText) {
      const wtext = whatsappText.getAttribute(`data-${toLang}`);
      if (wtext) whatsappText.textContent = wtext;
    }
    if (toggle) toggle.setAttribute('aria-pressed', toLang === 'es' ? 'true' : 'false');
    lang = toLang;
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(lang);
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      document.querySelectorAll('.panel').forEach(p => {
        p.style.transition = 'opacity .32s ease, transform .32s ease';
        p.style.opacity = 0;
        p.style.transform = 'translateY(6px)';
      });
      setTimeout(() => {
        const next = lang === 'en' ? 'es' : 'en';
        applyLanguage(next);
        document.querySelectorAll('.panel').forEach(p => {
          p.style.opacity = 1;
          p.style.transform = 'translateY(0)';
        });
      }, 340);
    });
  }

  const portrait = document.querySelector('.portrait');
  if (portrait) {
    portrait.addEventListener('error', () => {
      portrait.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop';
    });
  }

})();