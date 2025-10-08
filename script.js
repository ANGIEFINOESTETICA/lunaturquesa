
document.addEventListener('DOMContentLoaded', function(){
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click', function(e){
    e.preventDefault();
    const id = this.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
  }));

  // Hero slider simple autoplay with prev/next
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');
  function showSlide(i){
    const s = document.querySelector('.slides');
    if(!s) return;
    slideIndex = (i + slides.length) % slides.length;
    s.style.transform = 'translateX(' + (-slideIndex * 100) + '%)';
  }
  setInterval(()=> showSlide(slideIndex + 1), 4500);

  // Language toggle - toggles elements with data-en/data-es attributes
  const langBtn = document.getElementById('lang-toggle');
  let lang = 'es';
  function setLang(to){
    document.querySelectorAll('[data-en]').forEach(el=>{
      const en = el.getAttribute('data-en');
      const es = el.getAttribute('data-es');
      if(en && es) el.textContent = to === 'en' ? en : es;
    });
    lang = to;
    langBtn.textContent = to === 'en' ? 'ES' : 'EN';
  }
  if(langBtn){
    langBtn.addEventListener('click', ()=> setLang(lang === 'en' ? 'es' : 'en'));
    setLang('es');
  }

  // Before/After slider handle
  const ba = document.querySelectorAll('.ba-wrap');
  ba.forEach(wrap=>{
    const handle = wrap.querySelector('.ba-handle');
    const resize = wrap.querySelector('.ba-resize');
    let dragging = false;
    function move(x){
      const rect = wrap.getBoundingClientRect();
      let pct = (x - rect.left) / rect.width;
      pct = Math.max(0, Math.min(1, pct));
      resize.style.width = (pct*100) + '%';
      handle.style.left = (pct*100) + '%';
    }
    handle.addEventListener('mousedown', ()=> dragging=true);
    window.addEventListener('mouseup', ()=> dragging=false);
    window.addEventListener('mousemove', (e)=>{ if(dragging) move(e.clientX); });
    // touch support
    handle.addEventListener('touchstart', ()=> dragging=true);
    window.addEventListener('touchend', ()=> dragging=false);
    window.addEventListener('touchmove', (e)=>{ if(dragging) move(e.touches[0].clientX); });
  });
});
