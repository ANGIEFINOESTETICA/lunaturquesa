
document.addEventListener('DOMContentLoaded', function(){
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('nav-overlay');
  const closeNav = document.getElementById('close-nav');
  const langBtn = document.getElementById('lang-toggle');
  const header = document.getElementById('site-header');

  // compute header height and set CSS var
  function setHeaderHeightVar(){
    if(header){
      const h = Math.round(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--header-h', h + 'px');
    }
  }
  setHeaderHeightVar();
  window.addEventListener('resize', setHeaderHeightVar);

  function openNav(){
    navOverlay.classList.add('open');
    navOverlay.setAttribute('aria-hidden','false');
    hamburger.setAttribute('aria-expanded','true');
    // prevent body scroll
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
  // close overlay when clicking link
  document.querySelectorAll('#nav-overlay a').forEach(a=> a.addEventListener('click', function(e){
    // smooth scroll with offset
    const href = this.getAttribute('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if(el){
        const headerH = header ? header.getBoundingClientRect().height : 80;
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const target = rect.top + scrollTop - headerH - 12;
        window.scrollTo({top: target, behavior: 'smooth'});
      }
    }
    closeNavFunc();
  }));

  // Close overlay on ESC
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeNavFunc();
  });

  // Clicking outside inner closes
  navOverlay.addEventListener('click', function(e){
    if(e.target === navOverlay) closeNavFunc();
  });

  // Language toggle
  let lang = 'es';
  function setLang(to){
    document.querySelectorAll('[data-en]').forEach(el=>{
      const en = el.getAttribute('data-en'), es = el.getAttribute('data-es');
      if(en && es) el.textContent = to === 'en' ? en : es;
    });
    lang = to;
    if(langBtn) langBtn.textContent = to === 'en' ? 'ES' : 'EN';
  }
  if(langBtn){
    langBtn.addEventListener('click', ()=> setLang(lang === 'en' ? 'es' : 'en'));
    setLang('es');
  }

  // basic slider (if exists)
  const slidesWrap = document.querySelector('.slides');
  if(slidesWrap){
    const slides = slidesWrap.querySelectorAll('.slide');
    let idx = 0;
    function show(i){
      slides.forEach((s,si)=> s.style.display = si === i ? 'block' : 'none');
    }
    show(0);
    setInterval(()=>{ idx = (idx + 1) % slides.length; show(idx); }, 4500);
  }
});
