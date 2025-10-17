(function () {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // ==== Idioma ====
  let lang = localStorage.getItem('lt_lang') || 'es';

  function setLang(to) {
    lang = to === 'en' ? 'en' : 'es';
    $$('[data-es]').forEach((el) => {
      const es = el.getAttribute('data-es');
      const en = el.getAttribute('data-en');
      if (lang === 'en' && en != null) el.textContent = en;
      else if (lang === 'es' && es != null) el.textContent = es;
    });
    const btn = $('#lang-toggle');
    if (btn) btn.textContent = lang === 'en' ? 'ES | EN' : 'EN | ES';
    try {
      localStorage.setItem('lt_lang', lang);
    } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', () => {
    // ==== Inicializar idioma ====
    setLang(lang);
    const langBtn = $('#lang-toggle');
    if (langBtn)
      langBtn.addEventListener('click', () =>
        setLang(lang === 'es' ? 'en' : 'es')
      );

    // ==== Menú hamburguesa ====
    const hb = $('#hamburger');
    const menu = $('#side-menu');
    const veil = $('#menu-veil');

    if (hb && menu && veil) {
      hb.addEventListener('click', (e) => {
        e.stopPropagation();
        hb.classList.toggle('active');
        menu.classList.toggle('active');
        veil.classList.toggle('active');
      });

      // Cierra al hacer clic fuera
      document.addEventListener('click', (e) => {
        if (
          !menu.contains(e.target) &&
          !hb.contains(e.target) &&
          veil.classList.contains('active')
        ) {
          menu.classList.remove('active');
          hb.classList.remove('active');
          veil.classList.remove('active');
        }
      });

      // Cierra al hacer clic en un enlace
      menu.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => {
          menu.classList.remove('active');
          hb.classList.remove('active');
          veil.classList.remove('active');
        });
      });
    }

    // ==== Animación del logo inicial ====
    const intro = $('#intro');
    if (intro) {
      setTimeout(() => {
        intro.classList.add('hide');
        setTimeout(() => intro.remove(), 800);
      }, 1200);
    }

    console.log('✅ Script funcionando correctamente');
  });
})();
