
document.addEventListener('DOMContentLoaded', function(){
  // Hamburger toggle
  const ham = document.getElementById('hamburger');
  const nav = document.getElementById('nav-links');
  if(ham) ham.addEventListener('click', ()=> nav.classList.toggle('open'));

  // Smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const id = href.slice(1);
        const el = document.getElementById(id);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile nav
        if(window.innerWidth < 720) nav.classList.remove('open');
      }
    });
  });

  // Simple slider (auto)
  let slides = Array.from(document.querySelectorAll('.slide'));
  if(slides.length){
    let idx=0;
    function show(i){
      slides.forEach((s,si)=> s.style.display = (si===i)?'block':'none');
    }
    show(0);
    setInterval(()=>{ idx=(idx+1)%slides.length; show(idx); },4500);
  }

  // Language toggle
  const langBtn = document.getElementById('lang-toggle');
  let lang = 'es';
  function setLang(to){
    document.querySelectorAll('[data-en]').forEach(el=>{
      const en = el.getAttribute('data-en');
      const es = el.getAttribute('data-es');
      if(en && es){
        el.textContent = to==='en'? en : es;
      }
    });
    lang = to;
    if(langBtn) langBtn.textContent = to==='en'?'ES':'EN';
    // update aria-labels or placeholders if needed
  }
  if(langBtn){
    langBtn.addEventListener('click', ()=> setLang(lang==='en'?'es':'en'));
    setLang('es');
  }

  // Lightbox for thumbs
  const lightbox = document.getElementById('lightbox');
  document.querySelectorAll('.thumb img').forEach(img=>{
    img.addEventListener('click', ()=>{ if(!lightbox) return; lightbox.style.display='flex'; lightbox.querySelector('img').src = img.src; });
  });
  if(lightbox) lightbox.addEventListener('click', ()=> lightbox.style.display='none');

  // Before-after handle
  document.querySelectorAll('.ba-wrap').forEach(wrap=>{
    const resized = wrap.querySelector('.ba-resize');
    const handle = wrap.querySelector('.ba-handle');
    if(!resized || !handle) return;
    let dragging=false;
    function setPct(clientX){
      const rect = wrap.getBoundingClientRect();
      let pct = (clientX - rect.left)/rect.width;
      pct = Math.max(0, Math.min(1, pct));
      resized.style.width = (pct*100) + '%';
      handle.style.left = (pct*100) + '%';
    }
    handle.addEventListener('mousedown', ()=> dragging=true);
    window.addEventListener('mouseup', ()=> dragging=false);
    window.addEventListener('mousemove', e=>{ if(dragging) setPct(e.clientX); });
    handle.addEventListener('touchstart', ()=> dragging=true);
    window.addEventListener('touchend', ()=> dragging=false);
    window.addEventListener('touchmove', e=>{ if(dragging) setPct(e.touches[0].clientX); });
  });
});
