(function () {
  'use strict';

  // === Selectores rápidos ===
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // === Idioma por defecto ===
  let lang = localStorage.getItem('lt_lang') || 'es';

  function setLang(to) {
    lang = to === 'en' ? 'en' : 'es';
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

    // === Iniciar idioma ===
    setLang(lang);
    const langBtn = $('#lang-toggle');
    if (langBtn)
      langBtn.addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es'));

    // === Menú hamburguesa ===
    const hb = $('#hamburger');
    const sideMenu = $('#menu-lateral');
    const veil = $('#menu-veil');

    function openMenu() {
      if (sideMenu) sideMenu.classList.add('active');
      if (veil) veil.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (hb) hb.classList.add('is-active');
      if (hb) hb.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      if (sideMenu) sideMenu.classList.remove('active');
      if (veil) veil.classList.remove('active');
      document.body.style.overflow = '';
      if (hb) hb.classList.remove('is-active');
      if (hb) hb.setAttribute('aria-expanded', 'false');
    }

    if (hb) {
      hb.addEventListener('click', (e) => {
        e.stopPropagation();
        if (sideMenu && sideMenu.classList.contains('active')) closeMenu();
        else openMenu();
      });
    }

    if (veil) veil.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    if (sideMenu)
      sideMenu.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', closeMenu)
      );

    // === Ocultar la introducción del logo ===
    const intro = $('#intro');
    if (intro) {
      setTimeout(() => {
        intro.style.opacity = '0';
        intro.style.pointerEvents = 'none';
        try { intro.remove(); } catch (e) { }
      }, 1200); // ajusta el tiempo si quieres
    }

  });

})();
console.log("✅ Script cargado correctamente sin errores");
