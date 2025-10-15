(function(){
  'use strict';

  // ==== Helpers ====
  const $ = (s)=>document.querySelector(s);
  const $$ = (s)=>Array.from(document.querySelectorAll(s));

  // ==== Language handling ====
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

    // Initialize language
    setLang(lang);
    const langBtn = $('#lang-toggle');
    if(langBtn) langBtn.addEventListener('click', ()=> setLang(lang === 'es' ? 'en' : 'es'));

    // Hamburger menu logic
    const hb = $('#hamburgerv2');
    const nav = $('#menu');
    const veil = $('#menu-veil');

    if(hb && nav){
      hb.addEventListener('click', (e)=>{
        e.stopPropagation();
        const isOpen = hb.classList.toggle('active');
        nav.classList.toggle('open', isOpen);
        if(veil) veil.setAttribute('aria-hidden', !isOpen);
        hb.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      // Close when clicking outside
      document.addEventListener('click', (e)=>{
        if(!nav.contains(e.target) && !hb.contains(e.target)){
          nav.classList.remove('open');
          hb.classList.remove('active');
          if(veil) veil.setAttribute('aria-hidden', 'true');
          hb.setAttribute('aria-expanded', 'false');
        }
      });

      // Close on menu link click
      nav.querySelectorAll('a').forEach(a=>{
        a.addEventListener('click', ()=>{
          nav.classList.remove('open');
          hb.classList.remove('active');
          if(veil) veil.setAttribute('aria-hidden', 'true');
          hb.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Intro animation removal
    const intro = $('#intro');
    if(intro){
      setTimeout(()=>{
        intro.classList.add('hide');
        setTimeout(()=> intro.remove(), 800);
      }, 1200);
    }

    console.log('✅ script.js loaded');
  });
})();