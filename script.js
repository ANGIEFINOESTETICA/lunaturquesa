document.addEventListener("DOMContentLoaded", () => {
  /* === PANTALLA DE INTRODUCCIÓN CON LOGO === */
  const intro = document.getElementById("intro");
  if (intro) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        intro.classList.add("hidden");
        setTimeout(() => intro.remove(), 900);
      }, 1400);
    });
  }

  /* === MENÚ HAMBURGUESA === */
  const hamburger = document.getElementById("hamburger");
  const sideMenu = document.getElementById("side-menu");
  const menuVeil = document.getElementById("menu-veil");

  if (hamburger && sideMenu && menuVeil) {
    hamburger.addEventListener("click", () => {
      const isOpen = sideMenu.classList.toggle("active");
      hamburger.classList.toggle("active", isOpen);
      menuVeil.classList.toggle("active", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    menuVeil.addEventListener("click", () => {
      sideMenu.classList.remove("active");
      hamburger.classList.remove("active");
      menuVeil.classList.remove("active");
      document.body.style.overflow = "";
    });

    document.querySelectorAll(".menu-item").forEach(link => {
      link.addEventListener("click", () => {
        sideMenu.classList.remove("active");
        hamburger.classList.remove("active");
        menuVeil.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  /* === CAMBIO DE IDIOMA === */
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    let isEnglish = false;
    langToggle.addEventListener("click", () => {
      isEnglish = !isEnglish;
      langToggle.textContent = isEnglish ? "ES | EN" : "EN | ES";

      document.querySelectorAll("[data-es]").forEach(el => {
        const es = el.getAttribute("data-es");
        const en = el.getAttribute("data-en");
        el.textContent = isEnglish && en ? en : es;
      });
    });
  }

  /* === SISTEMA DE PESTAÑAS CON TRANSICIÓN SUAVE + SCROLL SIN SALTOS === */
  const menuLinks = document.querySelectorAll('.side-menu a');
  const sections = document.querySelectorAll('main section.panel');

  if (menuLinks.length && sections.length) {
    // Oculta todas las secciones excepto la primera
    sections.forEach((sec, index) => {
      sec.style.display = index === 0 ? 'block' : 'none';
      sec.style.opacity = index === 0 ? '1' : '0';
      sec.style.transition = 'opacity 0.6s ease';
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();

        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          // Fade out de todas las secciones
          sections.forEach(sec => {
            sec.style.opacity = '0';
            setTimeout(() => (sec.style.display = 'none'), 600);
          });

          // Fade in de la sección seleccionada después de 600ms
          setTimeout(() => {
            targetSection.style.display = 'block';
            setTimeout(() => {
              targetSection.style.opacity = '1';
              // Scroll suave después de que el fade in esté completo (600ms)
              setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 600);
            }, 50);
          }, 600);

          // Cerrar menú hamburguesa
          sideMenu.classList.remove('active');
          hamburger.classList.remove('active');
          menuVeil.classList.remove('active');
          document.body.style.overflow = "";
        }
      });
    });
  }
});
