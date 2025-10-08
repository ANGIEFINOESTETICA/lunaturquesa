
document.addEventListener('DOMContentLoaded', function(){
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click', function(e){
    e.preventDefault();
    const id = this.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
  }));

  // Hero slider autoplay + swipe
  const slides = document.querySelectorAll('.slide');
  const slidesWrap = document.querySelector('.slides');
  let idx = 0;
  function show(i){ if(!slidesWrap) return; idx = (i+slides.length)%slides.length; slidesWrap.style.transform = 'translateX(' + (-idx*100) + '%)'; }
  let autoplay = setInterval(()=> show(idx+1),4500);

  // pause on hover
  const hero = document.querySelector('.slider');
  if(hero){ hero.addEventListener('mouseenter', ()=> clearInterval(autoplay)); hero.addEventListener('mouseleave', ()=> autoplay=setInterval(()=> show(idx+1),4500)); }

  // bilingual toggle using data-en/data-es
  const langBtn = document.getElementById('lang-toggle');
  let lang = 'es';
  function setLang(to){
    document.querySelectorAll('[data-en]').forEach(el=>{ const en = el.getAttribute('data-en'); const es = el.getAttribute('data-es'); if(en && es) el.textContent = to==='en'?en:es; });
    lang = to; langBtn.textContent = to==='en'?'ES':'EN';
  }
  if(langBtn){ langBtn.addEventListener('click', ()=> setLang(lang==='en'?'es':'en')); setLang('es'); }

  // before/after draggable
  document.querySelectorAll('.ba-wrap').forEach(wrap=>{
    const handle = document.createElement('div'); handle.className='ba-handle'; wrap.appendChild(handle);
    const resized = wrap.querySelector('.ba-resize');
    let dragging=false;
    function setPct(clientX){
      const rect = wrap.getBoundingClientRect();
      let pct = (clientX-rect.left)/rect.width; pct = Math.max(0,Math.min(1,pct));
      resized.style.width = (pct*100)+'%'; handle.style.left = (pct*100)+'%';
    }
    handle.addEventListener('mousedown', ()=> dragging=true);
    window.addEventListener('mouseup', ()=> dragging=false);
    window.addEventListener('mousemove', e=>{ if(dragging) setPct(e.clientX); });
    // touch
    handle.addEventListener('touchstart', ()=> dragging=true);
    window.addEventListener('touchend', ()=> dragging=false);
    window.addEventListener('touchmove', e=>{ if(dragging) setPct(e.touches[0].clientX); });
  });

  // lightbox
  const light = document.querySelector('.lightbox');
  document.querySelectorAll('img[data-light]').forEach(img=> img.addEventListener('click', ()=>{ if(!light) return; light.style.display='flex'; light.querySelector('img').src=img.src; }));
  if(light) light.addEventListener('click', ()=> light.style.display='none');

  // movable book button (drag)
  const book = document.querySelector('.book-float');
  if(book){
    let dragging=false, offsetX=0, offsetY=0;
    book.addEventListener('mousedown', e=>{ dragging=true; offsetX=e.offsetX; offsetY=e.offsetY; });
    window.addEventListener('mouseup', ()=> dragging=false);
    window.addEventListener('mousemove', e=>{ if(dragging){ book.style.right='auto'; book.style.left=(e.clientX-offsetX)+'px'; book.style.top=(e.clientY-offsetY)+'px'; book.style.bottom='auto'; } });
    // touch support
    book.addEventListener('touchstart', e=>{ dragging=true; offsetX=e.touches[0].clientX - book.getBoundingClientRect().left; offsetY=e.touches[0].clientY - book.getBoundingClientRect().top; });
    window.addEventListener('touchend', ()=> dragging=false);
    window.addEventListener('touchmove', e=>{ if(dragging){ book.style.right='auto'; book.style.left=(e.touches[0].clientX-offsetX)+'px'; book.style.top=(e.touches[0].clientY-offsetY)+'px'; book.style.bottom='auto'; } });
  }
});
