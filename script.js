(() => {
  const toggle = document.getElementById('lang-toggle');
  const translatable = Array.from(document.querySelectorAll('[data-en]'));
  let lang = 'en';
  function applyLanguage(toLang){
    translatable.forEach(el=>{
      const text=el.getAttribute(`data-${toLang}`);
      if(text) el.textContent=text;
    });
    lang=toLang;
  }
  document.addEventListener('DOMContentLoaded',()=>applyLanguage(lang));
  toggle.addEventListener('click',()=>{
    const next = lang==='en'?'es':'en';
    applyLanguage(next);
  });
})();