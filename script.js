document.addEventListener('DOMContentLoaded',()=>{
  const ham=document.getElementById('hamburger');
  const nav=document.getElementById('nav-overlay');
  const close=document.getElementById('close-nav');
  function open(){nav.classList.add('open');document.body.style.overflow='hidden';}
  function hide(){nav.classList.remove('open');document.body.style.overflow='';}
  if(ham)ham.onclick=open;
  if(close)close.onclick=hide;
  nav.addEventListener('click',e=>{if(e.target===nav)hide();});
});