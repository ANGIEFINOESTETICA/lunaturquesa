document.addEventListener("DOMContentLoaded", () => {
  // ====== ANIMACIÓN DEL LOGO DE INICIO ======
  const intro = document.getElementById("intro");
  if (intro) {
    setTimeout(() => {
      intro.classList.add("hidden");
    }, 2000); // cambia el tiempo si quieres más o menos duración
  }

  // ====== MENÚ HAMBURGUESA ======
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      menu.classList.toggle("open");
    });

    // Cierra el menú al hacer clic en un enlace
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        menu.classList.remove("open");
      });
    });
  }

  // ====== BOTÓN DE IDIOMA (si existe) ======
  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    let lang = localStorage.getItem("lt_lang") || "es";

    const setLang = (to) => {
      lang = to;
      document.querySelectorAll("[data-es]").forEach(el => {
        const es = el.getAttribute("data-es");
        const en = el.getAttribute("data-en");
        el.textContent = lang === "en" && en ? en : es;
      });
      langBtn.textContent = lang === "en" ? "ES | EN" : "EN | ES";
      localStorage.setItem("lt_lang", lang);
    };

    setLang(lang);
    langBtn.addEventListener("click", () => setLang(lang === "es" ? "en" : "es"));
  }

  console.log("✅ Script funcionando correctamente");
});
