document.addEventListener("DOMContentLoaded", () => {
  /* === PANTALLA DE INTRO CON LOGO === */
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
      const isOpen = sideMenu.classList.toggle("open");
      hamburger.classList.toggle("active", isOpen);
      menuVeil.classList.toggle("visible", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen);
      sideMenu.setAttribute("aria-hidden", !isOpen);
    });

    // Cerrar menú al hacer clic fuera
    menuVeil.addEventListener("click", () => {
      sideMenu.classList.remove("open");
      hamburger.classList.remove("active");
      menuVeil.classList.remove("visible");
      hamburger.setAttribute("aria-expanded", "false");
      sideMenu.setAttribute("aria-hidden", "true");
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll(".menu-item").forEach(link => {
      link.addEventListener("click", () => {
        sideMenu.classList.remove("open");
        hamburger.classList.remove("active");
        menuVeil.classList.remove("visible");
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

      document.querySelectorAll("[data-en]").forEach(el => {
        el.textContent = isEnglish ? el.dataset.en : el.dataset.es;
      });
    });
  }
});
