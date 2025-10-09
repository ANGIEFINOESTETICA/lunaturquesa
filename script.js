
/*
  script.js - Optimized for Luna Turquesa
  - Bilingual (default: ES)
  - Hamburger menu open/close with outside click handling
  - Smooth scroll for anchor links
  - Fixed reserve button behavior
  - Safe DOM selection (works with different id/class names)
*/

(function () {
  'use strict';

  // Helper: safe query selector
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // Default language: Spanish (ES)
  let lang = 'es';

  // Find language toggle button (several possible IDs/classes)
  const langBtn = $('#lang-toggle') || $('#langToggle') || $('.lang-btn') || $('.lang') || $('[data-lang-toggle]');

  // Find hamburger and nav menu (robust)
  const hamburger = $('#hamburger') || document.querySelector('.hamburger');
  const navMenu = $('#nav-menu') || document.querySelector('.nav-menu') || $('#mainNav') || document.querySelector('.nav');

  // Reserve elements
  const reserveBtns = Array.from(document.querySelectorAll('a[href*="wa.me"], .book-desktop, .mobile-reserve, .fixed-reserve, .reservar, .reservar-hero'));

  // Toggle language function: toggles all elements with data-es / data-en or data-en/data-es attributes
  function setLanguage(to) {
    lang = (to === 'en' ? 'en' : 'es');
    // elements with data-es/data-en
    $$('[data-es]').forEach(el => {
      const es = el.getAttribute('data-es');
      const en = el.getAttribute('data-en');
      if (lang === 'en' && en != null) el.textContent = en;
      else if (lang === 'es' && es != null) el.textContent = es;
    });
    // Update aria-pressed or button label if toggler present
    if (langBtn) {
      try {
        if (lang === 'en') {
          langBtn.textContent = 'ES';
          langBtn.setAttribute('aria-pressed', 'true');
        } else {
          langBtn.textContent = 'EN';
          langBtn.setAttribute('aria-pressed', 'false');
        }
      } catch (e){}
    }
    // remember preference in localStorage
    try { localStorage.setItem('lt_lang', lang); } catch(e) {}
  }

  // Initialize language from storage or default 'es'
  function initLanguage() {
    try {
      const stored = localStorage.getItem('lt_lang');
      if (stored === 'en' || stored === 'es') {
        setLanguage(stored);
        return;
      }
    } catch(e){}
    setLanguage('es');
  }

  // Hamburger toggle with outside click handler
  function initHamburger() {
    if (!hamburger || !navMenu) return;
    // Toggle on click
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      // animate bars (if using .bar)
      hamburger.classList.toggle('is-active');
    });
    // Close when clicking a nav link
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', ()=> {
        navMenu.classList.remove('active');
        hamburger.classList.remove('is-active');
      });
    });
    // Close when clicking outside
    document.addEventListener('click', (ev) => {
      if (!navMenu.contains(ev.target) && !hamburger.contains(ev.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('is-active');
      }
    });
    // Allow Esc to close
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('is-active');
      }
    });
  }

  // Smooth scroll for anchor links within page
  function initSmoothScroll() {
    document.addEventListener('click', function(e){
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
          // close mobile menu if open
          if (navMenu) { navMenu.classList.remove('active'); hamburger && hamburger.classList.remove('is-active'); }
        }
      }
    });
  }

  // Ensure reserve buttons open whatsapp in new tab (safety/consistency)
  function initReserveButtons() {
    reserveBtns.forEach(btn => {
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });
  }

  // Accessibility: ensure tab focus styles, aria attributes for nav menu
  function initAccessibility() {
    if (navMenu) {
      navMenu.setAttribute('role', 'navigation');
      navMenu.setAttribute('aria-hidden', navMenu.classList.contains('active') ? 'false' : 'true');
    }
  }

  // Init everything on DOM ready
  document.addEventListener('DOMContentLoaded', function(){
    try {
      // init language
      initLanguage();
      // bind lang toggle
      if (langBtn) {
        langBtn.addEventListener('click', function(){
          setLanguage(lang === 'es' ? 'en' : 'es');
        });
      }
      // init hamburger logic
      initHamburger();
      // smooth scroll anchors
      initSmoothScroll();
      // reserve buttons
      initReserveButtons();
      // accessibility attributes
      initAccessibility();
      // Minor: hide intro overlay if present
      const intro = document.getElementById('intro');
      if (intro) {
        setTimeout(()=>{
          intro.style.opacity = '0';
          intro.style.pointerEvents = 'none';
          try{ intro.remove(); }catch(e){}
        }, 1200);
      }
    } catch (err) {
      // Fail gracefully but log to console for debugging
      console.error('Script init error:', err);
    }
  });

})();