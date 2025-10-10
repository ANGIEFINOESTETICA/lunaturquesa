
document.addEventListener('DOMContentLoaded', function(){
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('nav-overlay');
  const closeNav = document.getElementById('close-nav');
  const langBtn = document.getElementById('lang-toggle');
  const header = document.getElementById('site-header');

  function setHeaderVar(){
    if(header){
      const h = Math.round(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--header-h', h + 'px');
    }
  }
  setHeaderVar();
  window.addEventListener('resize', setHeaderVar);

  function openNav(){
    navOverlay.classList.add('open');
    navOverlay.setAttribute('aria-hidden','false');
    hamburger.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
  function closeNavFunc(){
    navOverlay.classList.remove('open');
    navOverlay.setAttribute('aria-hidden','true');
    hamburger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }

  if(hamburger) hamburger.addEventListener('click', openNav);
  if(closeNav) closeNav.addEventListener('click', closeNavFunc);

  // Close overlay when link clicked and smooth scroll with header offset
  document.querySelectorAll('.nav-list a').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const id = href.slice(1);
        const el = document.getElementById(id);
        if(el){
          const headerH = header ? header.getBoundingClientRect().height : 92;
          const rect = el.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const target = rect.top + scrollTop - headerH - 12;
          window.scrollTo({top: target, behavior: 'smooth'});
        }
      }
      closeNavFunc();
    });
  });

  // Close on ESC or clicking outside
  document.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeNavFunc(); });
  navOverlay.addEventListener('click', e=>{ if(e.target === navOverlay) closeNavFunc(); });

  // Language toggle - start in English, show only target language on button, button in gold
  let lang = 'en';
  function setLang(to){
    document.querySelectorAll('[data-en]').forEach(el=>{
      const en = el.getAttribute('data-en'), es = el.getAttribute('data-es');
      if(en && es) el.textContent = to === 'en' ? en : es;
    });
    lang = to;
    if(langBtn){
      langBtn.textContent = to === 'en' ? 'ES' : 'EN';
      langBtn.style.color = '#C99B33';
    }
  }
  if(langBtn){ langBtn.addEventListener('click', ()=> setLang(lang === 'en' ? 'es' : 'en')); setLang('en'); }

  // slider autoplay
  const slidesWrap = document.querySelector('.slides');
  if(slidesWrap){
    const slides = slidesWrap.querySelectorAll('.slide');
    let idx = 0;
    function show(i){ slides.forEach((s,si)=> s.style.display = si === i ? 'block' : 'none'); }
    show(0);
    setInterval(()=>{ idx = (idx + 1) % slides.length; show(idx); }, 4500);
  }
});
