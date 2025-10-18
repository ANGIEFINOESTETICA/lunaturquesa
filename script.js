document.addEventListener('DOMContentLoaded',()=>{
  const hb=document.getElementById('hamburger');
  const side=document.getElementById('side-menu');
  const veil=document.getElementById('menu-veil');
  const langBtn=document.getElementById('lang-toggle');
  let lang=localStorage.getItem('lt_lang')||'en';

  function setLang(a){
    lang=a==='es'?'es':'en';
    document.querySelectorAll('[data-en]').forEach(el=>{
      el.textContent=el.getAttribute(lang==='es'?'data-es':'data-en');
    });
    langBtn.textContent=lang==='es'?'ES | EN':'EN | ES';
    localStorage.setItem('lt_lang',lang);
  }
  if(hb){hb.addEventListener('click',()=>{
    side.classList.toggle('active');
    veil.classList.toggle('active');
  });}
  if(veil){veil.addEventListener('click',()=>{
    side.classList.remove('active');
    veil.classList.remove('active');
  });}
  document.querySelectorAll('.menu-item').forEach(a=>a.addEventListener('click',()=>{
    side.classList.remove('active');
    veil.classList.remove('active');
  }));
  langBtn.addEventListener('click',()=>setLang(lang==='es'?'en':'es'));
  setLang(lang);
});