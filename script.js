document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const sideMenu = document.getElementById("side-menu");
  const menuVeil = document.getElementById("menu-veil");
  const langToggle = document.getElementById("lang-toggle");
  const intro = document.getElementById("intro");

  // 🟡 Desvanecer intro (logo)
  if (intro) {
    setTimeout(() => {
      intro.style.opacity = "0";
      setTimeout(() => {
        intro.style.display = "none";
      }, 1000);
    }, 800);
  }

  // 🍔 Menú hamburguesa
  const toggleMenu = () => {
    const isActive = sideMenu.classList.toggle("active");
    menuVeil.classList.toggle("active", isActive);
    hamburger.setAttribute("aria-expanded", isActive);
  };

  hamburger.addEventListener("click", toggleMenu);
  menuVeil.addEventListener("click", toggleMenu);

  document.querySelectorAll(".menu-item").forEach(link => {
    link.addEventListener("click", toggleMenu);
  });

  // 🌐 Cambio de idioma
  let currentLang = "es";
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "es" ? "en" : "es";
    document.querySelectorAll("[data-es]").forEach(el => {
      const text = el.getAttribute(`data-${currentLang}`);
      if (text) el.textContent = text;
    });
    langToggle.textContent = currentLang === "es" ? "EN | ES" : "ES | EN";
  });
});
