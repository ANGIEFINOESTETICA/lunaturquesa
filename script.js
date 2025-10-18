document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("side-menu");
  const veil = document.getElementById("menu-veil");
  const burger = document.getElementById("hamburger");
  const langBtn = document.getElementById("lang-toggle");

  // Menú hamburguesa
  burger.addEventListener("click", () => {
    menu.classList.toggle("active");
    veil.classList.toggle("active");
  });
  veil.addEventListener("click", () => {
    menu.classList.remove("active");
    veil.classList.remove("active");
  });

  // Cambio de idioma
  let currentLang = "en";
  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "es" : "en";
    document.querySelectorAll("[data-en]").forEach(el => {
      const text = el.getAttribute(`data-${currentLang}`);
      if (text) el.textContent = text;
    });
    langBtn.textContent = currentLang === "en" ? "EN | ES" : "ES | EN";
  });
});
