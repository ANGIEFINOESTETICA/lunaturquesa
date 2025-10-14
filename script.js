(function(){
  'use strict';
  const $ = (s)=>document.querySelector(s);
  const $$ = (s)=>Array.from(document.querySelectorAll(s));

  // language toggle (keeps label; translations optional)
  let lang = localStorage.getItem('lt_lang') || 'es';
  function setLang(to){
    lang = (to==='en' ? 'en' : 'es');
    const btn = $('#lang-toggle');
    if(btn) btn.textContent = (lang==='en' ? 'ES | EN' : 'EN | ES');
    try{ localStorage.setItem('lt_lang', lang);}catch(e){}
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    setLang(lang);

    const hb = $('#hamburger');
    const side = $('#side-menu');
    const veil = $('#menu-veil');

    function openMenu(){ side.classList.add('active'); veil.classList.add('active'); document.body.style.overflow='hidden'; hb.classList.add('is-active'); hb.setAttribute('aria-expanded','true'); }
    function closeMenu(){ side.classList.remove('active'); veil.classList.remove('active'); document.body.style.overflow=''; hb.classList.remove('is-active'); hb.setAttribute('aria-expanded','false'); }

    if(hb) hb.addEventListener('click',(e)=>{ e.stopPropagation(); if(side.classList.contains('active')) closeMenu(); else openMenu(); });

    if(veil) veil.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeMenu(); });

    // smooth scroll for single-page links
    $$('#side-menu .menu-item, a[href^="#"]').forEach(a=>{
      a.addEventListener('click', (ev)=>{
        ev.preventDefault();
        closeMenu();
        const href = a.getAttribute('href');
        const target = href && href.startsWith('#') ? document.querySelector(href) : null;
        if(target){
          target.scrollIntoView({behavior:'smooth', block:'start'});
        } else {
          // default
          window.location = href;
        }
      });
    });

    // hide intro after 1.2s, mimic original behavior
    const intro = $('#intro');
    if(intro){
      setTimeout(()=>{ intro.style.opacity='0'; intro.style.pointerEvents='none'; try{ intro.remove(); }catch(e){} }, 1200);
    }

    // contact form handling using Formspree (replace FORM_ID with your id)
    const form = $('#contact-form');
    const success = $('#form-success');
    if(form){
      form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const action = form.getAttribute('action');
        if(action.includes('REPLACE_WITH_FORM_ID')){
          alert('Por favor reemplaza el ID de Formspree en el atributo "action" del formulario con tu Form ID para habilitar el envío.');
          success.style.display='block';
          success.textContent = 'Mensaje simulado (reemplaza FORMspree ID para envío real).';
          return;
        }
        // else submit via fetch
        const data = new FormData(form);
        fetch(action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
          .then(response=>{
            if(response.ok){
              success.style.display='block';
              form.reset();
            } else {
              response.json().then(data=>{
                if(Object.hasOwn(data, 'errors')){
                  alert(data["errors"].map(e=>e["message"]).join(", "));
                } else {
                  alert('Error al enviar, inténtalo más tarde.');
                }
              })
            }
          }).catch(()=> alert('Error de red.'));
      });
    }

    // favicon click scroll to top
    const favicon = document.querySelector('link[rel="icon"]');
    const logoLink = document.getElementById('logo-link');
    if(logoLink){
      logoLink.addEventListener('click', (e)=>{
        e.preventDefault();
        document.getElementById('top').scrollIntoView({behavior:'smooth'});
      });
    }

  });
})();