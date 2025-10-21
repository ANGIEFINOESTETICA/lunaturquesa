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

    hamburger.setAttribute("aria-expanded", isOpen);
    sideMenu.setAttribute("aria-hidden", !isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Cerrar al hacer clic fuera
  menuVeil.addEventListener("click", () => {
    sideMenu.classList.remove("active");
    hamburger.classList.remove("active");
    menuVeil.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Cerrar al hacer clic en un enlace
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
});
