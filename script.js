// Language toggle with smooth fade and WhatsApp text update
const langToggle = document.getElementById('lang-toggle');
const enEls = document.querySelectorAll('.lang-en');
const esEls = document.querySelectorAll('.lang-es');
const whatsappFloat = document.getElementById('whatsapp-float');

function setLanguageToEnglish(){
  enEls.forEach(el=>{
    el.classList.remove('hidden');
    el.style.opacity = 1;
  });
  esEls.forEach(el=>{
    el.classList.add('hidden');
    el.style.opacity = 0;
  });
  langToggle.textContent = '🇪🇸 Español';
  // Update WhatsApp text
  document.querySelectorAll('.wh-text').forEach(t => t.textContent = 'Book your appointment');
}

function setLanguageToSpanish(){
  esEls.forEach(el=>{
    el.classList.remove('hidden');
    el.style.opacity = 1;
  });
  enEls.forEach(el=>{
    el.classList.add('hidden');
    el.style.opacity = 0;
  });
  langToggle.textContent = '🇺🇸 English';
  document.querySelectorAll('.wh-text').forEach(t => t.textContent = 'Reserva tu cita');
}

// initialize default: Spanish visible
setLanguageToSpanish();

langToggle.addEventListener('click', function(){
  // fade transition
  document.querySelectorAll('.panel').forEach(p=>{
    p.style.transition = 'opacity .35s ease, transform .35s ease';
    p.style.opacity = 0;
    p.style.transform = 'translateY(6px)';
  });
  setTimeout(()=>{
    if (langToggle.textContent.includes('English')){
      setLanguageToEnglish();
    } else {
      setLanguageToSpanish();
    }
    // bring panels back
    document.querySelectorAll('.panel').forEach(p=>{
      p.style.opacity = 1;
      p.style.transform = 'translateY(0)';
    });
  }, 360);
});

// Smooth scroll for anchor links (if any)
document.addEventListener('click', function(e){
  if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')){
    e.preventDefault();
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  }
});
