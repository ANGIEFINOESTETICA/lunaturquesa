// ===== Menu hamburguesa =====
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('show');
  });
});

// ===== Bilingual toggle =====
const langBtn = document.getElementById('lang-toggle');
let currentLang = 'en';

const texts = {
  en: {
    about: "About Me",
    aboutText:
      "I’m Angie Fino, a specialist in facial and body aesthetics with more than 10 years of experience in skin care and comprehensive wellness. My goal is to highlight your natural beauty and enhance your confidence through personalized treatments.",
    services: "Our Services",
    facials: "Facials",
    facialsText:
      "Deep cleansing, microdermabrasion, and personalized skincare to restore radiance and vitality.",
    body: "Body Treatments",
    bodyText:
      "Reductive, shaping, and firming therapies designed to rejuvenate your figure and improve your well-being.",
    lashes: "Lashes & Brows",
    lashesText:
      "Lifting, extensions, and brow design to highlight your eyes with elegance and precision.",
    contact: "Contact",
    reserve: "💬 Reserve your appointment",
    footer: "All rights reserved.",
  },
  es: {
    about: "Sobre mí",
    aboutText:
      "Soy Angie Fino, especialista en estética facial y corporal con más de 10 años de experiencia en el cuidado integral de la piel y el bienestar. Mi objetivo es resaltar tu belleza natural y fortalecer tu confianza a través de tratamientos personalizados.",
    services: "Nuestros Servicios",
    facials: "Faciales",
    facialsText:
      "Limpieza profunda, microdermoabrasión y cuidado de la piel personalizado para devolver luminosidad y vitalidad.",
    body: "Tratamientos Corporales",
    bodyText:
      "Terapias reductoras, moldeadoras y reafirmantes diseñadas para rejuvenecer tu figura y mejorar tu bienestar.",
    lashes: "Pestañas y Cejas",
    lashesText:
      "Lifting, extensiones y diseño de cejas para resaltar tu mirada con elegancia y precisión.",
    contact: "Contacto",
    reserve: "💬 Reserva tu cita",
    footer: "Todos los derechos reservados.",
  },
};

function switchLanguage() {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  const lang = texts[currentLang];

  // Actualizar textos
  document.querySelector('#about h2').textContent = lang.about;
  document.querySelector('#about p').textContent = lang.aboutText;
  document.querySelector('#services h2').textContent = lang.services;
  document.querySelector('#facials h2').textContent = lang.facials;
  document.querySelector('#facials p').textContent = lang.facialsText;
  document.querySelector('#body h2').textContent = lang.body;
  document.querySelector('#body p').textContent = lang.bodyText;
  document.querySelector('#lashes h2').textContent = lang.lashes;
  document.querySelector('#lashes p').textContent = lang.lashesText;
  document.querySelector('#contact h2').textContent = lang.contact;
  document.querySelector('.whatsapp-float').textContent = lang.reserve;
  document.querySelector('footer p').textContent =
    `© 2025 Luna Turquesa. ${lang.footer}`;

  // Cambiar texto del botón
  langBtn.textContent = currentLang === 'en' ? 'ES' : 'EN';
}

langBtn.addEventListener('click', switchLanguage);
