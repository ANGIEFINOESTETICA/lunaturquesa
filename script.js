(function(){
  'use strict';
  const $ = (s)=>document.querySelector(s);
  const $$ = (s)=>Array.from(document.querySelectorAll(s));

  // language storage
  let lang = localStorage.getItem('lt_lang') || 'es';
  function setLang(to){
    lang = (to==='en' ? 'en' : 'es');
    // for this zipped version basic: change lang button label only (extendable)
    const btn = $('#lang-toggle');
    if(btn) btn.textContent = (lang==='en' ? 'ES | EN' : 'EN | ES');
    try{ localStorage.setItem('lt_lang', lang);}catch(e){}
  }

  document.addEventListener('DOMContentLoaded', ()=>{

    setLang(lang);

    const hb = $('#hamburger');
    const side = $('#side-menu');
    const veil = $('#menu-veil');

    function openMenu(){
      side.classList.add('active');
      veil.classList.add('active');
      document.body.style.overflow = 'hidden';
      hb.classList.add('is-active');
      hb.setAttribute('aria-expanded','true');
    }
    function closeMenu(){
      side.classList.remove('active');
      veil.classList.remove('active');
      document.body.style.overflow = '';
      hb.classList.remove('is-active');
      hb.setAttribute('aria-expanded','false');
    }

    if(hb){
      hb.addEventListener('click', (e)=>{ e.stopPropagation(); if(side.classList.contains('active')) closeMenu(); else openMenu(); });
    }
    if(veil) veil.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeMenu(); });

    // close menu when clicking on a menu item (for multi-page navigation)
    if(side) side.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> {
      closeMenu();
    }));

    // hide intro with nice transition
    const intro = $('#intro');
    if(intro){
      setTimeout(()=>{ intro.classList.add('hide'); intro.style.opacity='0'; try{ intro.remove(); }catch(e){} }, 1200);
    }

    // small accessibility: if user taps outside header, close menus
    document.addEventListener('click', (e)=>{
      const header = document.querySelector('.header');
      if(side && !side.contains(e.target) && !header.contains(e.target)){
        closeMenu();
      }
    });

  });
})();