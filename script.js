(function(){
  'use strict';

  // ==== Shortcuts ====
  const $ = (s)=>document.querySelector(s);
  const $$ = (s)=>Array.from(document.querySelectorAll(s));

  // ==== Language ====
  let lang = localStorage.getItem('lt_lang') || 'en';

  function setLang(to){
    lang = (to === 'es' ? 'es' : 'en');
    $$('[data-es]').forEach(el=>{
      const es = el.getAttribute('data-es');
      const en = el.getAttribute('data-en');
      if(lang === 'es' && es != null) el.textContent = es;
      else if(lang === 'en' && en != null) el.textContent = en;
    });
    const btn = $('#lang-toggle');
    if(btn) btn.textContent = (lang === 'es' ? 'EN | ES' : 'ES | EN');
    try { localStorage.setItem('lt_lang', lang); } catch(e){}
  }

  document.addEventListener('DOMContentLoaded', ()=>{

    // ==== Init language ====
    setLang(lang);
    const langBtn = $('#lang-toggle');
    if(langBtn) langBtn.addEventListener('click', ()=> setLang(lang === 'en' ? 'es' : 'en'));

    // ==== Hamburger menu ====
    const hb = $('#hamburger');
    const nav = $('#menu');

    if(hb && nav){
      hb.addEventListener('click', (e)=>{
        e.stopPropagation();
        hb.classList.toggle('active');
        nav.classList.toggle('open');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e)=>{
        if(!nav.contains(e.target) && !hb.contains(e.target)){
          nav.classList.remove('open');
          hb.classList.remove('active');
        }
      });

      // Close menu when clicking a link
      nav.querySelectorAll('a').forEach(a=>{
        a.addEventListener('click', ()=>{
          nav.classList.remove('open');
          hb.classList.remove('active');
        });
      });
    }

    // ==== Intro logo animation ====
    const intro = $('#intro');
    if(intro){
      intro.style.display = 'flex';
      intro.style.opacity = '1';
      setTimeout(()=>{
        intro.style.transition = 'opacity 0.8s ease';
        intro.style.opacity = '0';
        setTimeout(()=>{
          intro.remove();
        }, 800);
      }, 2200); // 2.2 seconds
    }

    console.log("✅ Script loaded correctly");
  });
})();
