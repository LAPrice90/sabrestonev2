/* === APPLICATIONS – gallery + pill carousel ========================= */
(function () {
  if (window.__applicationsInit) return;
  window.__applicationsInit = true;
  if (typeof Swiper === 'undefined') return;

  const section = document.querySelector('.applications-process');
  if (!section) return;

  /* ─────────── IMAGE SWIPER ─────────── */
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

  /* ─────────── PILL SWIPER ─────────── */
  const pillsEl   = section.querySelector('.tabs-swiper');
  const pillCount = pillsEl.querySelectorAll('.swiper-slide').length;   // 11

  const pillSwiper = new Swiper(pillsEl, {
    loop: true,
    initialSlide: pillCount,                 // start on the first clone
    loopAdditionalSlides: pillCount,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 16,
    mousewheel: { forceToAxis: true },
    touchRatio: 1,
    slideToClickedSlide: true
  });

  /* centre “Wall Cladding” on load */
  pillSwiper.slideToLoop(0, 0, false);

  /* ─────────── DOM refs ─────────── */
  const pills = [...pillsEl.querySelectorAll('.tab')];
  const texts = [...section.querySelectorAll('.process-text')];

  const setActive = i => {
    pills.forEach(b => b.classList.toggle('active', +b.dataset.slide === i));
    texts.forEach(t => t.classList.toggle('active', +t.dataset.step  === i));
  };
  setActive(0);                              // highlight first pill

  /* pill click → move images (pill row moves by itself) */
  pills.forEach((btn, i) =>
    btn.addEventListener('click', () => {
      appSwiper.slideToLoop(i);
      setActive(i);
    })
  );

  /* images finished → centre matching pill */
  appSwiper.on('slideChangeTransitionEnd', () => {
    const i = appSwiper.realIndex;
    pillSwiper.slideToLoop(i);
    setActive(i);
  });

  /* pill row dragged → update active state + images */
  pillSwiper.on('slideChangeTransitionEnd', () => {
    const i = pillSwiper.realIndex % pillCount;
    appSwiper.slideToLoop(i);
    setActive(i);
  });
})();
