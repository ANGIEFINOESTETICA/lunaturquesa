document.addEventListener('DOMContentLoaded', function(){
  const panels = document.querySelectorAll('.panel');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, {threshold:0.12});
  panels.forEach(p=>io.observe(p));

  // smooth scroll to top on logo click
  const logoLink = document.getElementById('logo-link');
  if(logoLink){
    logoLink.addEventListener('click', function(e){
      e.preventDefault();
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }
});