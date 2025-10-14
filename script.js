
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


/* ======= Menú hamburguesa ======= */
.hamburger {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
  cursor: pointer;
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 26px;
  height: 20px;
}

.hamburger .bar {
  height: 3px;
  width: 100%;
  background-color: #009999;
  border-radius: 5px;
  transition: all 0.3s ease;
}

/* Animación al abrir */
.hamburger.active .bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger.active .bar:nth-child(2) {
  opacity: 0;
}
.hamburger.active .bar:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Menú lateral */
.menu {
  position: fixed;
  top: 0;
  right: -250px;
  width: 250px;
  height: 100%;
  background: rgba(0, 51, 51, 0.97);
  backdrop-filter: blur(6px);
  transition: right 0.3s ease;
  z-index: 1000;
  padding-top: 80px;
}

.menu.open {
  right: 0;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin: 20px 0;
  text-align: center;
}

.menu a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.3s;
}

.menu a:hover {
  color: #00cccc;
}
