
document.addEventListener('DOMContentLoaded', function(){
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  const lang = document.getElementById('langToggle');
  const book = document.getElementById('bookBtn');

  hamburger.addEventListener('click', ()=>{
    mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
  });

  lang.addEventListener('click', ()=>{
    // simple bilingual toggle (static example)
    if(document.documentElement.lang === 'es'){
      document.documentElement.lang = 'en';
      lang.textContent = 'EN / ES';
      // replace some visible strings (basic)
      document.querySelector('.subtitle').textContent = 'Facial & Body Aesthetics — Angie Fino';
      document.querySelector('.cta').textContent = 'See services';
    } else {
      document.documentElement.lang = 'es';
      lang.textContent = 'ES / EN';
      document.querySelector('.subtitle').textContent = 'Estética Facial y Corporal — Angie Fino';
      document.querySelector('.cta').textContent = 'Ver servicios';
    }
  });

  book.addEventListener('click', ()=>{
    // open WhatsApp link as quick booking (example)
    window.open('https://wa.me/1234567890','_blank');
  });
});
