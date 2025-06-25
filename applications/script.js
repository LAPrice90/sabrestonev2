/* === APPLICATIONS – gallery + pill carousel ========================= */
(function () {
  if (window.__applicationsInit) return;
  window.__applicationsInit = true;
  if (typeof Swiper === 'undefined') return;

  const section = document.querySelector('.applications-process');
  if (!section) return;

  const pillsEl = section.querySelector('.tabs-swiper');
  const pillCount = pillsEl.querySelectorAll('.swiper-slide').length;

  const pills = [...pillsEl.querySelectorAll('.tab')];
  const texts = [...section.querySelectorAll('.process-text')];

  const setActive = i => {
    pills.forEach(b => b.classList.toggle('active', +b.dataset.slide === i));
    texts.forEach(t => t.classList.toggle('active', +t.dataset.step === i));
  };

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

  const pillSwiper = new Swiper(pillsEl, {
    loop: true,
    loopAdditionalSlides: pillCount,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 16,
    touchRatio: 1,
    slideToClickedSlide: true,
    on: {
      init(swiper) {
        swiper.slideToLoop(0, 0, false);
        setActive(0);
      }
    }
  });
  pillSwiper.init();

  pillSwiper.on('tap', () => {
    const clicked = pillSwiper.clickedSlide;
    if (!clicked) return;
    const i = +clicked.querySelector('.tab')?.dataset.slide;
    if (!isNaN(i)) {
      appSwiper.slideToLoop(i);
      pillSwiper.slideToLoop(i);
      setActive(i);
    }
  });

  appSwiper.on('slideChangeTransitionEnd', () => {
    const i = appSwiper.realIndex;
    pillSwiper.slideToLoop(i);
    setActive(i);
  });

  pillSwiper.on('slideChangeTransitionEnd', () => {
    const i = pillSwiper.realIndex % pillCount;
    appSwiper.slideToLoop(i);
    setActive(i);
  });
})();
