
(function(){
  'use strict';
  const $ = (s)=>document.querySelector(s);
  const $$ = (s)=>Array.from(document.querySelectorAll(s));
  let lang = localStorage.getItem('lt_lang') || 'es';
  function setLang(to){
    lang = (to==='en' ? 'en' : 'es');
    $$('[data-es]').forEach(el=>{
      const es = el.getAttribute('data-es');
      const en = el.getAttribute('data-en');
      if(lang==='en' && en!=null) el.textContent = en;
      else if(lang==='es' && es!=null) el.textContent = es;
    });
    const btn = $('#lang-toggle');
    if(btn) btn.textContent = (lang==='en' ? 'ES | EN' : 'EN | ES');
    try{ localStorage.setItem('lt_lang', lang);}catch(e){}
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    // init lang
    setLang(lang);
    const langBtn = $('#lang-toggle');
    if(langBtn) langBtn.addEventListener('click', ()=> setLang(lang==='es' ? 'en' : 'es'));

    // hamburger
    const hb = $('#hamburger');
    // create nav menu if not present
    let nav = $('#nav-menu');
    if(!nav){
      nav = document.createElement('nav');
      nav.id = 'nav-menu';
      nav.className = 'nav-menu';
      nav.innerHTML = '<a href="#about">Inicio</a><a href="#about">Sobre mí</a><a href="#services">Servicios</a><a href="#reviews">Opiniones</a><a href="#contact">Contacto</a>';
      document.body.insertBefore(nav, document.querySelector('.hero') || document.body.firstChild);
    }
    if(hb){
      hb.addEventListener('click', (e)=>{
        e.stopPropagation();
        nav.classList.toggle('active');
        hb.classList.toggle('is-active');
      });
    }
    // click outside to close
    document.addEventListener('click', (e)=>{
      if(nav && !nav.contains(e.target) && hb && !hb.contains(e.target)){
        nav.classList.remove('active');
        hb.classList.remove('is-active');
      }
    });
    // smooth scroll handled by CSS scroll-behavior; close nav on link click
    nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{ nav.classList.remove('active'); if(hb) hb.classList.remove('is-active'); }));

    // hide intro after short delay
    const intro = $('#intro');
    if(intro) setTimeout(()=>{ intro.style.opacity='0'; intro.style.pointerEvents='none'; try{ intro.remove(); }catch(e){} }, 1200);
  });
})();

// ======= MENÚ HAMBURGUESA =======
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  menu.classList.toggle('open');
});

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    menu.classList.remove('open');
  });
});

// === Animación del logo de inicio ===
window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  if (intro) {
    setTimeout(() => {
      intro.classList.add('hidden');
    }, 2000); // cambia a 1000 o 3000 si quieres que dure menos o más
  }
});
