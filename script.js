/* script.js – logo swap + mobile menu */
(function () {
  const header   = document.getElementById('main-header');
  const logo     = document.getElementById('header-logo');
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (!header || !logo) return;

  let isHovered = false;

  /* MOBILE MENU */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');

        // Force header blue and white logo when the menu is open
        if (navLinks.classList.contains('open')) {
            header.classList.add('scrolled');
            logo.src = 'images/symbol-white.svg'; // force white logo immediately
        } else {
            updateHeaderState();
        }
    });
  }

  /* LOGO LOGIC */
  function isHomePage() {
    const p = window.location.pathname;
    return p === '/' || p.endsWith('index.html');
  }

    function getCorrectLogo() {
    const mobile = window.innerWidth <= 767;     // always blue symbol on phones
    if (mobile) return 'images/symbol-blue.svg';

    const scrolled = window.scrollY > 10;
    const home     = isHomePage();

    // header blue (hover / scroll / other pages) → white symbol
    if (scrolled || isHovered || !home) {
        return 'images/symbol-white.svg';
    }
    // top of home page → blue symbol
    return 'images/symbol-blue.svg';
    }


  function updateHeaderState() {
    // If the mobile menu is open, force blue header and white logo
    if (navLinks && navLinks.classList.contains('open')) {
        header.classList.add('scrolled');
        if (!logo.src.includes('symbol-white.svg')) {
            logo.src = 'images/symbol-white.svg';
        }
        return;
    }

    // Otherwise, update based on scroll/hover state
    const next = getCorrectLogo();
    if (!logo.src.includes(next)) {
        logo.src = next;
    }
    
    const scrolled = window.scrollY > 10;
    const home     = isHomePage();
    if (scrolled || isHovered || !home) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

  header.addEventListener('mouseenter', () => {
    if (navLinks && navLinks.classList.contains('open')) return;
    isHovered = true;
    updateHeaderState();
});
  header.addEventListener('mouseleave', () => {
    if (navLinks && navLinks.classList.contains('open')) return;
    isHovered = false;
    updateHeaderState();
});
  window.addEventListener('scroll', updateHeaderState);
  window.addEventListener('resize', updateHeaderState);
  updateHeaderState();
})();
