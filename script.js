document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('side-menu');
  const burger = document.getElementById('hamburger');
  const langBtn = document.getElementById('lang-toggle');
  let lang = localStorage.getItem('lang') || 'en';

  burger.addEventListener('click', () => menu.classList.toggle('active'));

  function setLang(l) {
    lang = l;
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = el.getAttribute('data-' + lang);
    });
    localStorage.setItem('lang', lang);
    langBtn.textContent = lang === 'en' ? 'EN | ES' : 'ES | EN';
  }

  langBtn.addEventListener('click', () => setLang(lang === 'en' ? 'es' : 'en'));
  setLang(lang);
});
