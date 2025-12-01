/* === MENÚ HAMBURGUESA === */
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("side-menu");
const veil = document.getElementById("menu-veil");

hamburger.addEventListener("click", () => {
  const abierto = sideMenu.classList.toggle("show");
  veil.classList.toggle("show", abierto);
  hamburger.setAttribute("aria-expanded", abierto);
});

veil.addEventListener("click", () => {
  sideMenu.classList.remove("show");
  veil.classList.remove("show");
  hamburger.setAttribute("aria-expanded", "false");
});

document.querySelectorAll(".menu-item").forEach(item => {
  item.addEventListener("click", () => {
    sideMenu.classList.remove("show");
    veil.classList.remove("show");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

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

/* === OCULTAR/ MOSTRAR SECCIÓN INICIO === */
function actualizarInicio() {
  const inicio = document.querySelector('#inicio-top');
  const hash = window.location.hash;

  if (hash === '#inicio-top' || hash === '' || hash === '#top') {
    inicio?.classList.remove('oculto'); 
  } else {
    inicio?.classList.add('oculto');
  }
}

window.addEventListener('hashchange', actualizarInicio);
window.addEventListener('load', actualizarInicio);
