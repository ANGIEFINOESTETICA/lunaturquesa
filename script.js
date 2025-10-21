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
    // Función central para abrir/cerrar
    const toggleMenu = (open) => {
      sideMenu.classList.toggle("active", open);
      hamburger.classList.toggle("active", open);
      menuVeil.classList.toggle("active", open);

      // ARIA y overflow del body
      hamburger.setAttribute("aria-expanded", open ? "true" : "false");
      sideMenu.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
    };

    // Click en hamburguesa
    hamburger.addEventListener("click", () => {
      toggleMenu(!sideMenu.classList.contains("active"));
    });

    // Click en velo para cerrar
    menuVeil.addEventListener("click", () => toggleMenu(false));

    // Click en enlaces del menú para cerrar (usa la clase real .menu-item)
    document.querySelectorAll(".menu-item").forEach(link => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    // Cerrar con Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sideMenu.classList.contains("active")) {
        toggleMenu(false);
      }
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
