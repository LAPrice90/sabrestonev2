const header     = document.getElementById("main-header");
const logo       = document.getElementById("header-logo");
const hamburger  = document.querySelector(".hamburger");
const navWrapper = document.querySelector(".nav-wrapper");

// Determine relative path from current page to project root
const basePath = (() => {
  const segments = window.location.pathname.split('/').filter(Boolean);
  return segments.length <= 1 ? '' : '../'.repeat(segments.length - 1);
})();

function isHomePage() {
  const p = window.location.pathname;
  return p === '/' || p.endsWith('index.html');
}

function isMobile() {
  return window.innerWidth < 1200;
}

function getCorrectLogo() {
  const isMenuOpen = navWrapper.classList.contains("open");
  const isMobileView = window.innerWidth < 1200;
  const scrolled = window.scrollY > 10;

  const whiteLogo = basePath + "images/symbol-white.svg";
  const blueLogo  = basePath + "images/symbol-blue.svg";

  if (isMenuOpen && isMobileView) return whiteLogo;
  if (scrolled) return whiteLogo;
  return blueLogo;
}




function updateHeaderState() {
  const scrolled = window.scrollY > 10;
  const mobileMenuOpen = navWrapper.classList.contains("open");

  // Only add .scrolled if user has scrolled or the menu is open
  if (scrolled || mobileMenuOpen) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Determine correct logo
  const logoSrc = getCorrectLogo();
  if (!logo.src.includes(logoSrc)) {
    logo.src = logoSrc;
  }
}

// 🟡 Toggle Mobile Menu
hamburger.addEventListener("click", () => {
  navWrapper.classList.toggle("open");
  hamburger.classList.toggle("active");
  header.classList.toggle("menu-open", navWrapper.classList.contains("open"));
  hamburger.setAttribute("aria-expanded", navWrapper.classList.contains("open"));
  updateHeaderState();
});

// 🟦 Scroll behavior
window.addEventListener("scroll", updateHeaderState);
window.addEventListener("resize", updateHeaderState);
updateHeaderState();

// 🟡 Close menu when any nav link is clicked (mobile only)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (isMobile() && navWrapper.classList.contains('open')) {
      navWrapper.classList.remove('open');
      hamburger.classList.remove('active');
      header.classList.remove('menu-open');
      hamburger.setAttribute("aria-expanded", "false");
      updateHeaderState();
    }
  });
});

// 🔑 Close menu on ESC key
document.addEventListener('keydown', (e) => {
  const escPressed = e.key === "Escape" || e.key === "Esc";
  if (escPressed && navWrapper.classList.contains("open")) {
    navWrapper.classList.remove("open");
    hamburger.classList.remove("active");
    header.classList.remove("menu-open");
    hamburger.setAttribute("aria-expanded", "false");
    updateHeaderState();
  }
});
