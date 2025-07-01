// =========================================================
//  SABRE STONE — HEADER / NAVIGATION JS
//  ---------------------------------------------------------
//  Desktop (≥1200px)
//    • Top‑level "Porcelain Finishes" opens dropdown on HOVER
//    • Header stays navy while dropdown visible
//    • Logo + links turn white, active toggle turns gold
//  Mobile (<1200px)
//    • Behaviour unchanged (tap to reveal stacked sub‑menu)
// =========================================================

const header            = document.getElementById("main-header");
const logo              = document.getElementById("header-logo");
const hamburger         = document.querySelector(".hamburger");
const navWrapper        = document.querySelector(".nav-wrapper");
const porcelainToggle   = document.querySelector('[data-target="porcelain-nav"]');
const porcelainDropdown = document.getElementById("porcelainDropdown");

// Determine absolute path to the project root based on this script's location
const basePath = (() => {
  const src = document.currentScript?.src || "";
  return new URL("../", src).href; // e.g. https://user.github.io/repo/
})();

// ---------------------------------------------------------
//  Favicon color swap for dark mode
// ---------------------------------------------------------
const faviconLink = document.getElementById("favicon");
const faviconPath = faviconLink?.dataset.icon || "images/favicon.svg";

let whiteFaviconData = null;

async function generateWhiteIcon() {
  if (!faviconLink || whiteFaviconData) return;
  try {
    const res = await fetch(basePath + faviconPath);
    let svgText = await res.text();
    svgText = svgText.replace(/fill="#000000"/gi, 'fill="#ffffff"');
    whiteFaviconData = `data:image/svg+xml;base64,${btoa(svgText)}`;
  } catch (_) {
    whiteFaviconData = null;
  }
}

function applyFaviconColor(isDark) {
  if (!faviconLink) return;
  if (isDark && whiteFaviconData) {
    faviconLink.href = whiteFaviconData;
  } else {
    faviconLink.href = basePath + faviconPath;
  }
}

const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');

(async () => {
  await generateWhiteIcon();
  applyFaviconColor(colorScheme.matches);
  colorScheme.addEventListener('change', () => {
    applyFaviconColor(colorScheme.matches);
  });
})();

// ---------------------------------------------------------
//  Helpers
// ---------------------------------------------------------
const isMobile   = () => window.innerWidth < 1200;
const isScrolled = () => window.scrollY > 10;

function getCorrectLogo() {
  const isMenuOpen    = navWrapper.classList.contains("open");
  const shouldBeWhite = (isMenuOpen && isMobile()) || isScrolled() || header.classList.contains("dropdown-active");
  return shouldBeWhite ? basePath + "images/symbol-white.svg"
                       : basePath + "images/symbol-blue.svg";
}

function updateHeaderState() {
  const scrolled       = isScrolled();
  const mobileMenuOpen = navWrapper.classList.contains("open");
  const desktopDrop    = header.classList.contains("dropdown-active");

  if (scrolled || mobileMenuOpen || desktopDrop) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // swap logo if required
  const newSrc = getCorrectLogo();
  if (!logo.src.includes(newSrc)) logo.src = newSrc;
}

// ---------------------------------------------------------
//  Mobile hamburger
// ---------------------------------------------------------
hamburger.addEventListener("click", () => {
  navWrapper.classList.toggle("open");
  hamburger.classList.toggle("active");
  header.classList.toggle("menu-open", navWrapper.classList.contains("open"));
  hamburger.setAttribute("aria-expanded", navWrapper.classList.contains("open"));
  updateHeaderState();
  if (!navWrapper.classList.contains("open")) closeMobileSubmenu();
});

// Close mobile menu when link tapped
navWrapper.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    if (isMobile() && navWrapper.classList.contains("open")) {
      navWrapper.classList.remove("open");
      hamburger.classList.remove("active");
      header.classList.remove("menu-open");
      hamburger.setAttribute("aria-expanded", "false");
      updateHeaderState();
      closeMobileSubmenu();
    }
  });
});

// ---------------------------------------------------------
//  Close mobile on ESC
// ---------------------------------------------------------
document.addEventListener("keydown", e => {
  const esc = e.key === "Escape" || e.key === "Esc";
  if (esc && navWrapper.classList.contains("open")) {
    navWrapper.classList.remove("open");
    hamburger.classList.remove("active");
    header.classList.remove("menu-open");
    hamburger.setAttribute("aria-expanded", "false");
    updateHeaderState();
    closeMobileSubmenu();
  }
});

// ---------------------------------------------------------
//  MOBILE sub‑menu swap (unchanged)
// ---------------------------------------------------------
const mainNav      = document.querySelector(".main-nav");
const porcelainNav = document.getElementById("porcelainNav");

function closeMobileSubmenu() {
  porcelainNav.style.display = "none";
  mainNav.style.display      = "flex";
  porcelainDropdown.classList.remove("active");
}

// On mobile, tapping the toggle slides to sub‑nav
navWrapper.querySelectorAll(".menu-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    if (isMobile()) btn.parentElement.classList.toggle("open");
  });
});

porcelainToggle.addEventListener("click", () => {
  if (isMobile()) {
    mainNav.style.display      = "none";
    porcelainNav.style.display = "flex";
    porcelainDropdown.classList.add("active");
  }
});

document.querySelector(".submenu-back").addEventListener("click", closeMobileSubmenu);

// ---------------------------------------------------------
//  DESKTOP — Hover‑triggered dropdown
// ---------------------------------------------------------



function openDropdown() {
  header.classList.add('dropdown-active');
  porcelainDropdown.classList.add('active');
}

function closeDropdown() {
  header.classList.remove('dropdown-active');
  porcelainDropdown.classList.remove('active');
}

porcelainToggle.addEventListener('click', e => {
  if (window.innerWidth >= 1200) {
    e.preventDefault();                                 // keep it non-navigable
    header.classList.contains('dropdown-active') ? closeDropdown() : openDropdown();
  }
});

/* click anywhere outside to close */
document.addEventListener('click', e => {
  if (
    window.innerWidth >= 1200 &&
    header.classList.contains('dropdown-active') &&
    !porcelainDropdown.contains(e.target) &&
    !porcelainToggle.contains(e.target)
  ) {
    closeDropdown();
  }
});


// ---------------------------------------------------------
//  Fallback click for mobile (safe‑guard)
// ---------------------------------------------------------
porcelainToggle.addEventListener("click", e => {
  if (!isMobile()) {
    // Prevent page‑jump when clicked on desktop
    e.preventDefault();
  }
});

// ---------------------------------------------------------
//  Scroll / resize housekeeping
// ---------------------------------------------------------
window.addEventListener("scroll",  updateHeaderState);
window.addEventListener("resize", () => {
  updateHeaderState();
  // close dropdown if window resized to mobile
  if (isMobile()) closeDropdown();
});

// Initial paint
updateHeaderState();
