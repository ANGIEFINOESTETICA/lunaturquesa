
document.addEventListener('DOMContentLoaded', function(){
  const hb = document.getElementById('hamburger'), mobile = document.getElementById('mobileMenu');
  hb && hb.addEventListener('click', ()=> mobile.style.display = mobile.style.display==='flex' ? 'none' : 'flex');
  document.querySelectorAll('.tab').forEach(btn=> btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active'); document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
  }));
  const intro = document.getElementById('intro'); if(intro) setTimeout(()=>{ intro.style.opacity='0'; setTimeout(()=>intro.remove(),700); },1200);
});
