const header     = document.getElementById("main-header");
const logo       = document.getElementById("header-logo");
const hamburger  = document.querySelector(".hamburger");
const navWrapper = document.querySelector(".nav-wrapper");

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

  if (isMenuOpen && isMobileView) return "../images/symbol-white.svg";
  if (scrolled) return "../images/symbol-white.svg";
  return "../images/symbol-blue.svg";
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
