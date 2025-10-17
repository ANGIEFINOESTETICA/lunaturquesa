(function () {
  'use strict';

  // ==== Atajos para seleccionar elementos ====
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // ==== Idioma ====
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
    if (btn) btn.textContent = lang === 'en' ? 'ES | EN' : 'EN | ES';
    try { localStorage.setItem('lt_lang', lang); } catch (e) { }
  }

  document.addEventListener('DOMContentLoaded', () => {

    // ==== Inicializar idioma ====
    setLang(lang);
    const langBtn = $('#lang-toggle');
    if (langBtn) langBtn.addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es'));

    // ==== Menú hamburguesa ====
    const hb = $('#hamburger');
    const nav = $('#menu');
    const veil = $('#menu-veil');

    if (hb && nav) {
      hb.addEventListener('click', (e) => {
        e.stopPropagation();
        hb.classList.toggle('active');
        nav.classList.toggle('active');
        if (veil) veil.classList.toggle('active');
      });

      // Cierra el menú al hacer clic fuera
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hb.contains(e.target)) {
          nav.classList.remove('active');
          hb.classList.remove('active');
          if (veil) veil.classList.remove('active');
        }
      });

      // Cierra el menú al hacer clic en un enlace
      nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          nav.classList.remove('active');
          hb.classList.remove('active');
          if (veil) veil.classList.remove('active');
        });
      });
    }

    // ==== Animación del logo de inicio ====
    const intro = $('#intro');
    if (intro) {
      setTimeout(() => {
        intro.classList.add('hide');
        setTimeout(() => intro.remove(), 800);
      }, 1200);
    }

    console.log("✅ Script cargado correctamente");
  });

  // ==== Traducciones ====
  const translations = {
    es: {
      service1_desc: "Cuidado profesional adaptado a las necesidades de tu piel para limpiar, hidratar y rejuvenecer, utilizando protocolos seguros y productos de alta calidad.",
      service1_benefits: `
        <li>Mejora de la textura y luminosidad de la piel.</li>
        <li>Hidratación profunda y equilibrio cutáneo.</li>
        <li>Limpieza de impurezas y poros.</li>
        <li>Reducción de signos de envejecimiento y fatiga.</li>
        <li>Resultados visibles desde la primera sesión.</li>
      `
    },
    en: {
      service1_desc: "Professional care tailored to your skin's needs to cleanse, hydrate, and rejuvenate using safe protocols and high-quality products.",
      service1_benefits: `
        <li>Improves skin texture and radiance.</li>
        <li>Deep hydration and balance.</li>
        <li>Removes impurities and unclogs pores.</li>
        <li>Reduces signs of aging and fatigue.</li>
        <li>Visible results from the first session.</li>
      `
    }
  };

})();
