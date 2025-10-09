document.addEventListener('DOMContentLoaded',function(){
  const hamb = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  const lang = document.getElementById('langToggle');
  const reservar = document.getElementById('reservarBtn');
  hamb && hamb.addEventListener('click',()=>{
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });
  const texts = document.querySelectorAll('[data-es]');
  lang && lang.addEventListener('click',()=>{
    const isEN = lang.innerText.trim() === 'EN';
    if(isEN){
      texts.forEach(el=> el.innerText = el.getAttribute('data-en') || el.innerText);
      lang.innerText = 'ES';
    } else {
      texts.forEach(el=> el.innerText = el.getAttribute('data-es') || el.innerText);
      lang.innerText = 'EN';
    }
  });
  reservar && reservar.addEventListener('click', (e)=>{
    e.preventDefault();
    window.open('https://wa.me/15613709889','_blank');
  });
  const faders = document.querySelectorAll('.section, .hero-inner');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.style.opacity = 1;
    });
  }, {threshold:0.2});
  faders.forEach(f=>{ f.style.opacity=0; obs.observe(f); });
});
