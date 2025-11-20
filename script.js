document.addEventListener("DOMContentLoaded", () => {

  /* === PANTALLA DE INTRODUCCIÓN CON LOGO (2 segundos) === */
  const intro = document.getElementById("intro");
  if (intro) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        intro.classList.add("hidden");
        setTimeout(() => intro.remove(), 900);
      }, 2000); // ⏳ Duración exacta de 2 segundos
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

    // Cerrar al hacer clic afuera
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

/* === DESPLAZAMIENTO SUAVE === */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* === PESTAÑAS CON TRANSICIÓN === */
const menuLinks = document.querySelectorAll('.side-menu a');
const sections = document.querySelectorAll('main section.panel');

if (menuLinks.length && sections.length) {

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

        sections.forEach(sec => {
          sec.style.opacity = '0';
          setTimeout(() => (sec.style.display = 'none'), 600);
        });

        setTimeout(() => {
          targetSection.style.display = 'block';
          setTimeout(() => (targetSection.style.opacity = '1'), 50);
        }, 600);

        // cerrar hamburguesa
        document.getElementById('hamburger').classList.remove('active');
        document.getElementById('menu-veil').classList.remove('active');
        document.getElementById('side-menu').classList.remove('active');
        document.body.style.overflow = "";
      }
    });
  });
}
