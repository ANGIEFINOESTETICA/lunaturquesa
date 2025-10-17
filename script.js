(function () {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // Idioma predeterminado ES
  let lang = localStorage.getItem('lt_lang') || 'es';

  function setLang(a) {
    lang = a === 'en' ? 'en' : 'es';
    $$('[data-es]').forEach(el => {
      const es = el.getAttribute('data-es');
      const en = el.getAttribute('data-en');
      if (lang === 'en' && en != null) el.textContent = en;
      else if (lang === 'es' && es != null) el.textContent = es;
    });

    const btn = $('#lang-toggle');
    if (btn) btn.textContent = (lang === 'en' ? 'ES | EN' : 'EN | ES');

    try { localStorage.setItem('lt_lang', lang); } catch (e) { }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setLang(lang);

    const hb = $('#hamburguesa');
    const side = $('#menu-lateral');
    const veil = $('#menu-veil');
    const langBtn = $('#lang-toggle');

    function openMenu() {
      side.classList.add('activo');
      veil.classList.add('activo');
      document.body.style.overflow = 'hidden';
      hb.classList.add('is-active');
      hb.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      side.classList.remove('activo');
      veil.classList.remove('activo');
      document.body.style.overflow = '';
      hb.classList.remove('is-active');
      hb.setAttribute('aria-expanded', 'false');
    }

    if (hb) {
      hb.addEventListener('click', (e) => {
        e.stopPropagation();
        if (side.classList.contains('activo')) closeMenu();
        else openMenu();
      });
    }

    if (veil) veil.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    if (side) side.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', closeMenu)
    );

    if (langBtn)
      langBtn.addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es'));

    // Ocultar la introducción después de 1.2s
    const intro = $('#intro');
    if (intro)
      setTimeout(() => {
        intro.style.opacity = '0';
        intro.style.pointerEvents = 'none';
        try { intro.remove(); } catch (e) { }
      }, 1200);
  });
})();
