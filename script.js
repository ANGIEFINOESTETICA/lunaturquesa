document.addEventListener("DOMContentLoaded", () => {
  /* === INTRO LOGO === */
  const intro = document.getElementById("introducción");
  if (intro) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        intro.classList.add("oculto");
        setTimeout(() => intro.remove(), 900);
      }, 1400);
    });
  }

  /* === MENÚ HAMBURGUESA === */
  const hamburguesa = document.getElementById("hamburguesa");
  const sideMenu = document.getElementById("menú lateral");
  const menuVeil = document.getElementById("menú-velo");

  if (hamburguesa && sideMenu && menuVeil) {
    const openMenu = () => {
      sideMenu.classList.add("abrir");
      menuVeil.classList.add("visible");
      document.body.style.overflow = "hidden";
      hamburguesa.classList.add("activo");
      hamburguesa.setAttribute("aria-expanded", "true");
      sideMenu.setAttribute("aria-hidden", "false");
    };

    const closeMenu = () => {
      sideMenu.classList.remove("abrir");
      menuVeil.classList.remove("visible");
      document.body.style.overflow = "";
      hamburguesa.classList.remove("activo");
      hamburguesa.setAttribute("aria-expanded", "false");
      sideMenu.setAttribute("aria-hidden", "true");
    };

    hamburguesa.addEventListener("click", (e) => {
      e.stopPropagation();
      if (sideMenu.classList.contains("abrir")) closeMenu();
      else openMenu();
    });

    menuVeil.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    document.querySelectorAll(".menu-item").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  /* === CAMBIO DE IDIOMA === */
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    let currentLang = localStorage.getItem("lt_lang") || "es";
    const updateLanguage = (lang) => {
      document.querySelectorAll("[data-es]").forEach((el) => {
        const text = lang === "en" ? el.dataset.en : el.dataset.es;
        if (text) el.textContent = text;
      });
      langToggle.textContent = lang === "en" ? "ES | EN" : "EN | ES";
      localStorage.setItem("lt_lang", lang);
    };

    updateLanguage(currentLang);

    langToggle.addEventListener("click", () => {
      currentLang = currentLang === "es" ? "en" : "es";
      updateLanguage(currentLang);
    });
  }
});
