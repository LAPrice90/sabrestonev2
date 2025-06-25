/* === APPLICATIONS carousel =========================================== */
(function () {
  if (window.__applicationsInit) return;     // stop double-runs
  window.__applicationsInit = true;
  if (typeof Swiper === 'undefined') return;

  const section   = document.querySelector('.applications-process');
  if (!section) return;

  /* DOM */
  const swiperEl  = section.querySelector('.applications-swiper');
  const nextBtn   = section.querySelector('.swiper-button-next');
  const prevBtn   = section.querySelector('.swiper-button-prev');
  const tabs      = section.querySelectorAll('.process-tabs .tab');
  const texts     = section.querySelectorAll('.process-text');

  const appSwiper = new Swiper(swiperEl, {
    loop: true,                 // lets you drag 5 ⇄ 1 seamlessly
    centeredSlides: true,
    spaceBetween: 20,
    slidesPerView: 1.35,
    breakpoints: {
      1200: { slidesPerView: 2.4 },
      900:  { slidesPerView: 2.0 },
      600:  { slidesPerView: 1.6 },
        0:  { slidesPerView: 1.2 }
    },
    navigation: { nextEl: nextBtn, prevEl: prevBtn }
  });


  /* Helpers */
  function centre(tab) {
    const box = tab.parentElement;
    const x   = tab.offsetLeft + tab.offsetWidth / 2 - box.offsetWidth / 2;
    box.scrollTo({ left: x, behavior: 'smooth' });
  }
  function updateCopy(i) {
    texts.forEach((t, idx) => t.classList.toggle('active', idx === i));
  }

  /* Pill click */
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      appSwiper.slideToLoop(i);   // picks the closest copy when looping
      centre(tab);
      updateCopy(i);
    });
  });

  /* Swipe or arrows */
  appSwiper.on('slideChangeTransitionEnd', () => {
    const i = appSwiper.realIndex;
    tabs.forEach((t, idx) => {
      t.classList.toggle('active', idx === i);
      if (idx === i) centre(t);
    });
    updateCopy(i);
  });
})();
