document.addEventListener('DOMContentLoaded', function(){
  // Language toggle
  const btn = document.getElementById('lang-toggle');
  let lang = 'en';
  function setLang(to){
    document.querySelectorAll('[data-en]').forEach(el=>{
      const en = el.getAttribute('data-en');
      const es = el.getAttribute('data-es');
      if(en && es){
        el.textContent = to === 'en' ? en : es;
      }
    });
    // whatsapp text
    const wh = document.querySelector('.wh-text');
    if(wh){
      wh.textContent = to === 'en' ? 'Book your appointment' : 'Reserva tu cita';
    }
    btn.setAttribute('aria-pressed', to === 'es');
    lang = to;
  }
  btn.addEventListener('click', ()=> setLang(lang === 'en' ? 'es' : 'en'));
  // default english
  setLang('en');

  // IntersectionObserver reveal
  const panels = document.querySelectorAll('.panel');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible'); });
  }, {threshold:0.12});
  panels.forEach(p=>io.observe(p));

  // smooth scroll logo
  const logoLink = document.getElementById('logo-link');
  if(logoLink) logoLink.addEventListener('click', e=>{ e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); });
});