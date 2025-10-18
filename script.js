// script.js - language toggle, menu, modal, intro
(function(){
  'use strict';

  // selectors
  const $ = (s)=>document.querySelector(s);
  const $$ = (s)=>Array.from(document.querySelectorAll(s));

  // default language = english
  let lang = localStorage.getItem('lt_lang') || 'en';

  // set language function
  function setLang(to){
    lang = (to === 'es' ? 'es' : 'en');
    // elements with data-en/data-es will be swapped
    $$('[data-en]').forEach(el=>{
      const en = el.getAttribute('data-en');
      const es = el.getAttribute('data-es');
      // prefer innerHTML for elements that need markup (lists mostly)
      if (lang === 'en' && en != null) {
        if (el.tagName.toLowerCase()==='input' || el.tagName.toLowerCase()==='textarea') el.value = en;
        else el.innerHTML = en;
      } else if (lang === 'es' && es != null) {
        if (el.tagName.toLowerCase()==='input' || el.tagName.toLowerCase()==='textarea') el.value = es;
        else el.innerHTML = es;
      }
    });

    // elements that have only data-es (fallback)
    $$('[data-es]').forEach(el=>{
      if (!el.hasAttribute('data-en')) {
        if (lang === 'es') el.innerHTML = el.getAttribute('data-es');
        else el.innerHTML = el.innerHTML; // keep as is (if originally en)
      }
    });

    // update lang button label
    const btn = $('#lang-toggle');
    if (btn) btn.textContent = (lang === 'en' ? 'EN | ES' : 'ES | EN');

    try{ localStorage.setItem('lt_lang', lang); }catch(e){}
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    setLang(lang);

    // hamburger & side menu
    const hb = $('#hamburger');
    const side = $('#side-menu');
    const veil = $('#menu-veil');
    const langBtn = $('#lang-toggle');

    function openMenu(){
      side.classList.add('active');
      veil.classList.add('active');
      document.body.style.overflow = 'hidden';
      hb.classList.add('is-active');
      hb.setAttribute('aria-expanded','true');
    }
    function closeMenu(){
      side.classList.remove('active');
      veil.classList.remove('active');
      document.body.style.overflow = '';
      hb.classList.remove('is-active');
      hb.setAttribute('aria-expanded','false');
    }

    if (hb){
      hb.addEventListener('click',(e)=>{
        e.stopPropagation();
        if (side.classList.contains('active')) closeMenu(); else openMenu();
      });
    }
    if (veil) veil.addEventListener('click', closeMenu);
    document.addEventListener('keydown',(e)=>{ if (e.key==='Escape') closeMenu(); });
    if (side) side.querySelectorAll('a').forEach(a=> a.addEventListener('click', closeMenu));
    if (langBtn) langBtn.addEventListener('click', ()=> setLang(lang==='en' ? 'es' : 'en'));

    // About modal
    const modal = $('#modal');
    const modalBody = $('#modal-body');
    const aboutOpen = $('#about-open');
    const modalClose = $('#modal-close');

    // prepare full about content (EN/ES) - use your full text
    const aboutFull = {
      en: `<p>I’m Angie Fino, a professional nurse from Colombia and currently a licensed Medical Assistant in the United States, as well as a certified phlebotomist, licensed facial specialist, and licensed massage therapist. With over 10 years of experience, I have deep knowledge of anatomy, physiology, and biosecurity, allowing me to provide safe, effective, and personalized treatments for comprehensive skin care and wellness.</p>
           <p>My education and experience empower me to apply rigorous protocols that prioritize patient safety without compromising quality or visible results. My philosophy is to combine the science and art of aesthetics to create a unique experience that enhances your natural beauty and delivers authentic well-being. In my suite in Wellington, Florida, I prioritize patient safety and personalized care that elevates your experience to a higher level.</p>`,
      es: `<p>Soy Angie Fino, profesional de enfermería de Colombia y actualmente Asistente Médico con licencia en EE. UU., además de flebotomista certificada, especialista en estética facial con licencia y terapeuta de masaje con licencia. Con más de 10 años de experiencia, tengo un sólido conocimiento de anatomía, fisiología y bioseguridad, lo que me permite ofrecer tratamientos seguros, efectivos y personalizados para cuidado integral de la piel y bienestar.</p>
           <p>Mi educación y experiencia me permiten aplicar protocolos rigurosos que priorizan la seguridad del paciente sin comprometer la calidad ni los resultados visibles. Mi filosofía combina la ciencia y el arte de la estética para crear una experiencia única que realza tu belleza natural y entrega un bienestar auténtico. En mi suite en Wellington, Florida, priorizo la seguridad del paciente y la atención personalizada que eleva tu experiencia.</p>`
    };

    function openModal(){
      modal.classList.add('active');
      modal.setAttribute('aria-hidden','false');
      modalBody.innerHTML = (lang === 'en' ? aboutFull.en : aboutFull.es);
      document.body.style.overflow = 'hidden';
    }
    function closeModal(){
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden','true');
      modalBody.innerHTML = '';
      document.body.style.overflow = '';
    }

    if (aboutOpen) aboutOpen.addEventListener('click', openModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e)=>{ if (e.target===modal) closeModal(); });

    // Intro auto-hide
    const intro = $('#intro');
    if (intro) setTimeout(()=>{ intro.style.opacity='0'; intro.style.pointerEvents='none'; try{ intro.remove(); }catch(e){} }, 1200);

    // adjust content language when setLang is used externally (listen storage)
    window.setLang = setLang; // expose for debugging if needed
  });
})();
