(function(){
  'use strict';

  // ==== Atajos para seleccionar elementos ====
  const $ = (s)=>document.querySelector(s);
  const $$ = (s)=>Array.from(document.querySelectorAll(s));

  // ==== Idioma ====
  let lang = localStorage.getItem('lt_lang') || 'es';

  function setLang(to){
    lang = (to === 'en' ? 'en' : 'es');
    $$('[data-es]').forEach(el=>{
      const es = el.getAttribute('data-es');
      const en = el.getAttribute('data-en');
      if(lang === 'en' && en != null) el.textContent = en;
      else if(lang === 'es' && es != null) el.textContent = es;
    });
    const btn = $('#lang-toggle');
    if(btn) btn.textContent = (lang === 'en' ? 'ES | EN' : 'EN | ES');
    try { localStorage.setItem('lt_lang', lang); } catch(e){}
  }

  // ====== Manejo del intro (mostrado primero, eliminado después) ======
  // Usamos window.onload para garantizar que imágenes y fuentes hayan cargado
  function initIntroBehaviour(){
    const intro = $('#intro');
    if(!intro) return;

    // Tiempo antes de empezar el fade (en ms). Ajusta si quieres más o menos.
    const introDelayMs = 2200;
    // Duración del fade en CSS debe coincidir con el tiempo que esperaremos antes de remover.
    const fadeDurationMs = 800;

    // Espera a que la ventana cargue completamente para respetar la animación/tiempos del logo
    window.addEventListener('load', ()=>{
      // Seguridad: si el intro ya no está en DOM, salimos
      if(!document.body.contains(intro)) return;

      // Esperamos el delay y luego aplicamos la clase 'hide' para iniciar el fade.
      setTimeout(()=>{
        // Añade clase para disparar la transición CSS (ej: opacity -> 0)
        intro.classList.add('hide');

        // Después del fade, removemos el elemento (solo si sigue en DOM)
        setTimeout(()=>{
          if(document.body.contains(intro)){
            try { intro.remove(); } catch(e){}
          }
        }, fadeDurationMs + 40); // +40 ms por seguridad con las transiciones
      }, introDelayMs);
    });
  }

  document.addEventListener('DOMContentLoaded', ()=>{

    // ==== Inicializar idioma ====
    setLang(lang);
    const langBtn = $('#lang-toggle');
    if(langBtn) langBtn.addEventListener('click', ()=> setLang(lang === 'es' ? 'en' : 'es'));

    // ==== Menú hamburguesa ====
    const hb = $('#hamburger');
    const nav = $('#side-menu');   // ✅ ID corregido
    const veil = $('#menu-veil');  // ✅ Velo del fondo

    if(hb && nav){
      hb.addEventListener('click', (e)=>{
        e.stopPropagation();
        hb.classList.toggle('active');
        nav.classList.toggle('open');
        if(veil) veil.classList.toggle('show');

        // Mantener atributos ARIA coherentes
        const expanded = hb.getAttribute('aria-expanded') === 'true';
        hb.setAttribute('aria-expanded', String(!expanded));
        nav.setAttribute('aria-hidden', String(expanded));
        if(veil) veil.setAttribute('aria-hidden', String(expanded));
      });

      // Cierra el menú al hacer clic fuera
      document.addEventListener('click', (e)=>{
        if(!nav.contains(e.target) && !hb.contains(e.target)){
          nav.classList.remove('open');
          hb.classList.remove('active');
          if(veil) veil.classList.remove('show');
          hb.setAttribute('aria-expanded', 'false');
          nav.setAttribute('aria-hidden', 'true');
          if(veil) veil.setAttribute('aria-hidden', 'true');
        }
      });

      // Cierra el menú al hacer clic en un enlace
      nav.querySelectorAll('a').forEach(a=>{
        a.addEventListener('click', ()=>{
          nav.classList.remove('open');
          hb.classList.remove('active');
          if(veil) veil.classList.remove('show');
          hb.setAttribute('aria-expanded', 'false');
          nav.setAttribute('aria-hidden', 'true');
          if(veil) veil.setAttribute('aria-hidden', 'true');
        });
      });
    }

    // Inicializa comportamiento del intro en load (no aquí) - llamamos la función
    initIntroBehaviour();

    console.log("✅ Script Luna Turquesa cargado correctamente");
  });
})();
