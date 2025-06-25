/* === APPLICATIONS – gallery + pill carousel ================================= */
(function () {
  if (window.__applicationsInit) return;      // stop double-runs
  window.__applicationsInit = true;
  if (typeof Swiper === 'undefined') return;

  const section = document.querySelector('.applications-process');
  if (!section) return;

  /* -------------------------------------------------------------------------
     IMAGE CAROUSEL
  ------------------------------------------------------------------------- */
  const appSwiper = new Swiper(section.querySelector('.applications-swiper'), {
    loop: true,
    centeredSlides: true,
    spaceBetween: 20,
    slidesPerView: 1.35,
    breakpoints: {
      1200: { slidesPerView: 2.4 },
      900:  { slidesPerView: 2.0 },
      600:  { slidesPerView: 1.6 },
        0:  { slidesPerView: 1.2 }
    },
    navigation: {
      nextEl: section.querySelector('.swiper-button-next'),
      prevEl: section.querySelector('.swiper-button-prev')
    }
  });

  /* -------------------------------------------------------------------------
     PILL CAROUSEL
  ------------------------------------------------------------------------- */
  const pillSwiper = new Swiper(section.querySelector('.tabs-swiper'), {
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 16,
    slideToClickedSlide: true
  });

  const tabs  = section.querySelectorAll('.tabs-swiper .tab');
  const texts = section.querySelectorAll('.process-text');

  /* -------------------------------------------------------------------------
     SYNC HELPERS
  ------------------------------------------------------------------------- */
  function setActive(i) {
    tabs.forEach((t, idx) => t.classList.toggle('active', idx === i));
    texts.forEach((t, idx) => t.classList.toggle('active', idx === i));
  }

  /* -------------------------------------------------------------------------
     EVENTS – click pill → slide images
  ------------------------------------------------------------------------- */
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      appSwiper.slideToLoop(i);
      pillSwiper.slideToLoop(i);
      setActive(i);
    });
  });

  /* -------------------------------------------------------------------------
     EVENTS – swipe images → move pills
  ------------------------------------------------------------------------- */
  appSwiper.on('slideChangeTransitionEnd', () => {
    const i = appSwiper.realIndex;
    pillSwiper.slideToLoop(i);
    setActive(i);
  });
})();
