(() => {
  const toggle = document.getElementById('lang-toggle');
  const translatable = Array.from(document.querySelectorAll('[data-en]'));
  const whatsappText = document.querySelector('.wh-text');
  let lang = 'en';
  function applyLanguage(toLang){
    translatable.forEach(el => {
      const text = el.getAttribute('data-' + toLang);
      if(text !== null) {
        if(el.children.length === 0) el.textContent = text;
        else el.innerText = text;
      }
    });
    if(whatsappText) {
      const w = whatsappText.getAttribute('data-' + toLang);
      if(w) whatsappText.textContent = w;
    }
    lang = toLang;
  }
  document.addEventListener('DOMContentLoaded', () => applyLanguage(lang));
  if(toggle){
    toggle.addEventListener('click', () => {
      document.querySelectorAll('.panel').forEach(p => { p.style.opacity = 0; p.style.transform = 'translateY(6px)'; });
      setTimeout(() => {
        applyLanguage(lang === 'en' ? 'es' : 'en');
        document.querySelectorAll('.panel').forEach(p => { p.style.opacity = 1; p.style.transform = 'translateY(0)'; });
      }, 320);
    });
  }
  // fallback for missing angie.png
  const portrait = document.querySelector('.portrait');
  if(portrait){
    portrait.addEventListener('error', ()=>{ portrait.src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop' });
  }
})();