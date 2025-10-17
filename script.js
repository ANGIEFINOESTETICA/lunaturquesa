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
    const nav = $('#side-menu');   // ✅ ID corregido
    const veil = $('#menu-veil');  // ✅ Velo del fondo

    if(hb && nav){
      hb.addEventListener('click', (e)=>{
        e.stopPropagation();
        hb.classList.toggle('active');
        nav.classList.toggle('open');
        if(veil) veil.classList.toggle('show');
      });

      // Cierra el menú al hacer clic fuera
      document.addEventListener('click', (e)=>{
        if(!nav.contains(e.target) && !hb.contains(e.target)){
          nav.classList.remove('open');
          hb.classList.remove('active');
          if(veil) veil.classList.remove('show');
        }
      });

      // Cierra el menú al hacer clic en un enlace
      nav.querySelectorAll('a').forEach(a=>{
        a.addEventListener('click', ()=>{
          nav.classList.remove('open');
          hb.classList.remove('active');
          if(veil) veil.classList.remove('show');
        });
      });
    }

    // ==== Animación del lo
