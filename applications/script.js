/* === APPLICATIONS carousel (matches old Installation logic) =========== */
(function () {
  if (typeof Swiper === 'undefined') return;              // Swiper must already be loaded

  const section = document.querySelector('.applications-process');
  if (!section) return;                                   // defensive

  /* DOM references scoped to THIS section only */
  const swiperEl = section.querySelector('.applications-swiper');
  const nextBtn  = section.querySelector('.swiper-button-next');
  const prevBtn  = section.querySelector('.swiper-button-prev');
  const tabs     = section.querySelectorAll('.process-tabs .tab');
  const texts    = section.querySelectorAll('.process-text');

  /* Initialise Swiper */
  const appSwiper = new Swiper(swiperEl, {
    loop: true,
    centeredSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 20,
    slidesPerView: 1.35,
    breakpoints: {
      1200: { slidesPerView: 2.6 },
      900:  { slidesPerView: 2.0 },
      600:  { slidesPerView: 1.6 },
        0:  { slidesPerView: 1.2 }
    },
    navigation: { nextEl: nextBtn, prevEl: prevBtn }
  });

  /* Safety: extra click listeners */
  if (nextBtn) nextBtn.addEventListener('click', () => appSwiper.slideNext());
  if (prevBtn) prevBtn.addEventListener('click', () => appSwiper.slidePrev());

  /* Helper: centre a pill inside its scroll box */
  function centre(tab) {
    const box = tab.parentElement;
    const x = tab.offsetLeft + tab.offsetWidth / 2 - box.offsetWidth / 2;
    box.scrollTo({ left: x, behavior: 'smooth' });
  }

  /* Copy/text toggle */
  function updateCopy(index) {
    texts.forEach((t, i) => t.classList.toggle('active', i === index));
  }

  /* Pill click → slide + copy */
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      appSwiper.slideToLoop(i);
      centre(tab);
      updateCopy(i);
    });
  });

  /* Swipe → update pills + copy */
  appSwiper.on('slideChange', () => {
    const idx = appSwiper.realIndex;
    tabs.forEach((t, i) => {
      t.classList.toggle('active', i === idx);
      if (i === idx) centre(t);
    });
    updateCopy(idx);
  });
})();
