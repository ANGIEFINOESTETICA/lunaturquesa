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

  document.addEventListener('DOMContentLoaded', ()=>{

    // ==== Inicializar idioma ====
    setLang(lang);
    const langBtn = $('#lang-toggle');
    if(langBtn) langBtn.addEventListener('click', ()=> setLang(lang === 'es' ? 'en' : 'es'));

    // ==== Menú hamburguesa ====
    const hb = $('#hamburger');
    const nav = $('#menu');

    if(hb && nav){
      hb.addEventListener('click', (e)=>{
        e.stopPropagation();
        hb.classList.toggle('active');
        nav.classList.toggle('open');
      });

      // Cierra el menú al hacer clic fuera
      document.addEventListener('click', (e)=>{
        if(!nav.contains(e.target) && !hb.contains(e.target)){
          nav.classList.remove('open');
          hb.classList.remove('active');
        }
      });

      // Cierra el menú al hacer clic en un enlace
      nav.querySelectorAll('a').forEach(a=>{
        a.addEventListener('click', ()=>{
          nav.classList.remove('open');
          hb.classList.remove('active');
        });
      });
    }

    // ==== Animación del logo de inicio ====
    const intro = $('#intro');
    if(intro){
      // Desvanece y elimina el intro después de un momento
      setTimeout(()=>{
        intro.classList.add('hide');
        setTimeout(()=> intro.remove(), 800); // elimina el elemento después del fade
      }, 1200);
    }

    console.log("✅ El script está funcionando correctamente");
  });
})();
