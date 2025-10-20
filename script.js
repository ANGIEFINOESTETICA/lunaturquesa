document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const sideMenu = document.getElementById("side-menu");
  const veil = document.getElementById("menu-veil");

  function closeMenu() {
    sideMenu.classList.remove("active");
    veil.classList.remove("active");
  }

  hamburger.addEventListener("click", () => {
    sideMenu.classList.toggle("active");
    veil.classList.toggle("active");
  });

  veil.addEventListener("click", closeMenu);

  document.querySelectorAll(".menu-item").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
});
