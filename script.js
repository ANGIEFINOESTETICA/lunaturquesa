
document.addEventListener('DOMContentLoaded', function(){
  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click', function(e){ e.preventDefault(); const id=this.getAttribute('href').slice(1); const el=document.getElementById(id); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); }));

  // hero autoplay
  const slidesWrap = document.querySelector('.slides'); const slides = document.querySelectorAll('.slide'); let idx=0;
  function show(i){ if(!slidesWrap) return; idx=(i+slides.length)%slides.length; slidesWrap.style.transform='translateX(' + (-idx*100) + '%)'; }
  let auto = setInterval(()=>show(idx+1),4500);
  const sliderEl = document.querySelector('.slider'); if(sliderEl){ sliderEl.addEventListener('mouseenter', ()=> clearInterval(auto)); sliderEl.addEventListener('mouseleave', ()=> auto=setInterval(()=>show(idx+1),4500)); }

  // lang
  const langBtn = document.getElementById('lang-toggle'); let lang='es';
  function setLang(to){ document.querySelectorAll('[data-en]').forEach(el=>{ const en=el.getAttribute('data-en'); const es=el.getAttribute('data-es'); if(en && es) el.textContent = to==='en'?en:es; }); lang=to; if(langBtn) langBtn.textContent = to==='en'?'ES':'EN'; }
  if(langBtn){ langBtn.addEventListener('click', ()=> setLang(lang==='en'?'es':'en')); setLang('es'); }

  // lightbox
  const light = document.querySelector('.lightbox');
  document.querySelectorAll('.thumb img[data-light]').forEach(img=> img.addEventListener('click', ()=>{ if(!light) return; light.style.display='flex'; light.querySelector('img').src = img.src; }));
  if(light) light.addEventListener('click', ()=> light.style.display='none');

  // before/after draggable
  document.querySelectorAll('.ba-wrap').forEach(wrap=>{
    const resized = wrap.querySelector('.ba-resize'); const handle = wrap.querySelector('.ba-handle');
    let dragging=false;
    function setPct(clientX){ const rect=wrap.getBoundingClientRect(); let pct=(clientX-rect.left)/rect.width; pct=Math.max(0,Math.min(1,pct)); resized.style.width=(pct*100)+'%'; handle.style.left=(pct*100)+'%'; }
    handle.addEventListener('mousedown', ()=> dragging=true); window.addEventListener('mouseup', ()=> dragging=false);
    window.addEventListener('mousemove', e=>{ if(dragging) setPct(e.clientX); });
    // touch
    handle.addEventListener('touchstart', ()=> dragging=true); window.addEventListener('touchend', ()=> dragging=false);
    window.addEventListener('touchmove', e=>{ if(dragging) setPct(e.touches[0].clientX); });
  });
});
