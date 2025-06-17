/* === NAVIGATION SCRIPT ===================== */
(function () {
  const header     = document.getElementById('main-header');
  const logo       = document.getElementById('header-logo');
  const hamburger  = document.querySelector('.hamburger');
  const navWrapper = document.querySelector('.nav-wrapper');
  const navLinks   = document.querySelector('.nav-links');

  let isHovered = false;

  function isHomePage() {
    const p = window.location.pathname;
    return p === '/' || p.endsWith('index.html');
  }

  function isMobile() {
    return window.innerWidth < 1200;
  }

  function getCorrectLogo() {
    if (isMobile()) return 'images/symbol-blue.svg';
    if (isHovered || window.scrollY > 10 || !isHomePage()) {
      return 'images/symbol-white.svg';
    }
    return 'images/symbol-blue.svg';
  }

  function updateHeaderState() {
    const scrolled = window.scrollY > 10;
    const mobileMenuOpen = navWrapper && navWrapper.classList.contains('open');

    // When on mobile with the menu closed: if at the top and not hovered, remove the background
    if (mobileMenuOpen) {
        header.classList.add('scrolled');
    } else if (!isHomePage() || isHovered || scrolled) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    const logoSrc = getCorrectLogo();
    if (!logo.src.includes(logoSrc)) {
      logo.src = logoSrc;
    }
  }

  /* MOBILE MENU TOGGLE */
  if (hamburger && navWrapper) {
    hamburger.addEventListener('click', () => {
      navWrapper.classList.toggle('open');
      hamburger.classList.toggle('active');
      header.classList.toggle('menu-open', navWrapper.classList.contains('open'));
      hamburger.setAttribute('aria-expanded', navWrapper.classList.contains('open'));
      updateHeaderState();
    });
  }

  /* DESKTOP HOVER LOGIC */
  if (header) {
    header.addEventListener('mouseenter', () => {
      if (isMobile() || (navWrapper && navWrapper.classList.contains('open'))) return;
      isHovered = true;
      updateHeaderState();
    });

    header.addEventListener('mouseleave', () => {
      if (isMobile() || (navWrapper && navWrapper.classList.contains('open'))) return;
      isHovered = false;
      updateHeaderState();
    });
  }

  window.addEventListener('scroll', updateHeaderState);
  window.addEventListener('resize', updateHeaderState);

  updateHeaderState();
})();


/* === HERO TAGLINE WIDTH MATCH ===================== */
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const heading = hero.querySelector('h1');
  const tagline = hero.querySelector('.tagline');
  if (!heading || !tagline) return;

  function updateTaglineScale() {
    const scale = heading.offsetWidth / tagline.offsetWidth;
    tagline.style.setProperty('--tagline-scale', scale);
  }

  window.addEventListener('load', updateTaglineScale);
  window.addEventListener('resize', updateTaglineScale);
  updateTaglineScale();
})();


/* === INSTALL PROCESS CAROUSEL ===================== */
(function () {
  const sliderEl = document.querySelector('.process-swiper');
  const tabs = document.querySelectorAll('.process-tabs .tab');
  if (!sliderEl || tabs.length === 0 || typeof Swiper === 'undefined') return;

  const swiper = new Swiper(sliderEl, {
    loop: true,
    speed: 3000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      swiper.slideToLoop(index);
    });
  });

  swiper.on('slideChange', () => {
    tabs.forEach(t => t.classList.remove('active'));
    const idx = swiper.realIndex;
    if (tabs[idx]) tabs[idx].classList.add('active');
  });
})();