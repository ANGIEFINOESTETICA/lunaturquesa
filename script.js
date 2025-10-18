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
  const sideMenu = document.getElementById("menu-lateral");
  const menuVeil = document.getElementById("menu-veil");

  if (hamburger && sideMenu && menuVeil) {
    hamburger.addEventListener("click", () => {
      const isOpen = sideMenu.classList.toggle("open");
      hamburger.classList.toggle("active", isOpen);
      menuVeil.classList.toggle("visible", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen);
      sideMenu.setAttribute("aria-hidden", !isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Cerrar menú al hacer clic fuera
    menuVeil.addEventListener("click", () => {
      sideMenu.classList.remove("open");
      hamburger.classList.remove("active");
      menuVeil.classList.remove("visible");
      hamburger.setAttribute("aria-expanded", "false");
      sideMenu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    });

    // Cerrar menú al hacer clic en un enlace del menú
    document.querySelectorAll(".menu a").forEach(link => {
      link.addEventListener("click", () => {
        sideMenu.classList.remove("open");
        hamburger.classList.remove("active");
        menuVeil.classList.remove("visible");
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
});
