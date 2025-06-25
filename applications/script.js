/* === APPLICATIONS – gallery + pill carousel ========================= */
(function () {
  if (window.__applicationsInit) return;
  window.__applicationsInit = true;
  if (typeof Swiper === 'undefined') return;

  const section = document.querySelector('.applications-process');
  if (!section) return;

  /* ── main image swiper ───────────────────────────────────────────── */
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

  /* ── pill swiper ─────────────────────────────────────────────────── */
  const pillSwiper = new Swiper(section.querySelector('.tabs-swiper'), {
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 16,
    slideToClickedSlide: true
  });

  /* show clones on the left from the start */
  pillSwiper.slideToLoop(0, 0, false);

  const allTabs  = [...section.querySelectorAll('.tabs-swiper .tab')];
  const allTexts = [...section.querySelectorAll('.process-text')];

  /* helper to toggle active pill + copy */
  function setActive(i) {
    allTabs.forEach(btn => btn.classList.toggle('active', +btn.dataset.slide === i));
    allTexts.forEach(p   => p.classList.toggle('active', +p.dataset.step  === i));
  }

  /* initial highlight */
  setActive(0);

  /* click / tap on a pill */
  pillSwiper.on('tap', () => {
    const slide = pillSwiper.clickedSlide;
    if (!slide) return;
    const i = +slide.querySelector('.tab').dataset.slide;
    appSwiper.slideToLoop(i);              // sync images with pills
  });

  /* images finished sliding → centre matching pill */
  appSwiper.on('slideChangeTransitionEnd', () => {
    const i = appSwiper.realIndex;
    pillSwiper.slideToLoop(i);
    setActive(i);
  });

  /* pills dragged → update highlight / copy */
  pillSwiper.on('slideChangeTransitionEnd', () => {
    setActive(pillSwiper.realIndex);
  });
})();
