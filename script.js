document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  if (intro) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        intro.classList.add("hidden");
        setTimeout(() => intro.remove(), 900);
      }, 1400);
    });
  }

  const hamburger = document.getElementById("hamburger");
  const sideMenu = document.getElementById("menu-lateral");
  const menuVeil = document.getElementById("menu-veil");

  if (hamburger && sideMenu && menuVeil) {
    hamburger.addEventListener("click", () => {
      const isOpen = sideMenu.classList.toggle("open");
      menuVeil.classList.toggle("visible", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    menuVeil.addEventListener("click", () => {
      sideMenu.classList.remove("open");
      menuVeil.classList.remove("visible");
      document.body.style.overflow = "";
    });
  }

  const langToggle = document.getElementById("lang-toggle");
  let isEnglish = true;
  if (langToggle) {
    langToggle.textContent = "ES | EN";
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
