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

/* === DESPLAZAMIENTO SUAVE ENTRE SECCIONES === */
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

/* === SISTEMA DE PESTAÑAS CON TRANSICIÓN SUAVE === */
const menuLinks = document.querySelectorAll('.side-menu a');
const sections = document.querySelectorAll('main section.panel');

if (menuLinks.length && sections.length) {
  // Oculta todas las secciones excepto la primera
  sections.forEach((sec, index) => {
    sec.style.display = index === 0 ? 'block' : 'none';
    sec.style.opacity = index === 0 ? '1' : '0';
    sec.style.transition = 'opacity 0.6s ease';
  });

  // Al hacer clic en un enlace del menú
  menuLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Ocultar todas con fade out
        sections.forEach(sec => {
          sec.style.opacity = '0';
          setTimeout(() => (sec.style.display = 'none'), 600);
        });

        // Mostrar la seleccionada con fade in
        setTimeout(() => {
          targetSection.style.display = 'block';
          setTimeout(() => (targetSection.style.opacity = '1'), 50);
        }, 600);

        // Cerrar el menú hamburguesa
        document.getElementById('hamburger').classList.remove('active');
        document.getElementById('menu-veil').classList.remove('active');
        document.getElementById('side-menu').classList.remove('active');
        document.body.style.overflow = "";
      }
    });
  });
}

// ===============================
// MOSTRAR/OCULTAR SECCIÓN INICIO
// ===============================
function actualizarInicio() {
  const inicio = document.querySelector('#inicio-top');
  const hash = window.location.hash;

  if (hash === '#inicio-top' || hash === '' || hash === '#top') {
    inicio?.classList.remove('oculto');  // mostrar inicio
  } else {
    inicio?.classList.add('oculto');     // ocultar inicio
  }
}

window.addEventListener('hashchange', actualizarInicio);
window.addEventListener('load', actualizarInicio);



// ELEMENTOS
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('side-menu');
const veil = document.getElementById('menu-veil');

// ABRIR / CERRAR MENÚ
hamburger.addEventListener('click', () => {
  const abierto = sideMenu.classList.toggle('show');
  veil.classList.toggle('show', abierto);

  hamburger.setAttribute('aria-expanded', abierto);
});

// CERRAR MENÚ AL HACER CLIC EN EL VELO
veil.addEventListener('click', () => {
  sideMenu.classList.remove('show');
  veil.classList.remove('show');
  hamburger.setAttribute('aria-expanded', 'false');
});

// CERRAR MENÚ AL HACER CLIC EN UN ITEM
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    sideMenu.classList.remove('show');
    veil.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ELEMENTOS
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('side-menu');
const veil = document.getElementById('menu-veil');

// ABRIR / CERRAR MENÚ
hamburger.addEventListener('click', () => {
  const abierto = sideMenu.classList.toggle('show');
  veil.classList.toggle('show', abierto);

  hamburger.setAttribute('aria-expanded', abierto);
});

// CERRAR MENÚ AL HACER CLIC EN EL VELO
veil.addEventListener('click', () => {
  sideMenu.classList.remove('show');
  veil.classList.remove('show');
  hamburger.setAttribute('aria-expanded', 'false');
});

// CERRAR MENÚ AL HACER CLIC EN UN ITEM
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    sideMenu.classList.remove('show');
    veil.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});
