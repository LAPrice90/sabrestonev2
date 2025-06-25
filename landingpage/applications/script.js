/* === APPLICATIONS – gallery + pill carousel ========================= */
(function () {
  if (window.__applicationsInit) return;
  window.__applicationsInit = true;
  if (typeof Swiper === 'undefined') return;

  const section = document.querySelector('.applications-process');
  if (!section) return;

  const pillsEl = section.querySelector('.tabs-swiper');
  const trackEl = pillsEl.querySelector('.swiper-wrapper');
  const originalPills = [...trackEl.querySelectorAll('.swiper-slide')];
  const texts = [...section.querySelectorAll('.process-text')];
  const total = originalPills.length;
  let activeIndex = 0;

  const appSwiper = new Swiper(section.querySelector('.applications-swiper'), {
    loop: true,
    centeredSlides: true,
    spaceBetween: 20,
    slidesPerView: 1.35,
    breakpoints: {
      1200: { slidesPerView: 2.4 },
      900:  { slidesPerView: 2.0 },
      600:  { slidesPerView: 1.6 },
        0:  { slidesPerView: 1.4 }
    },
    navigation: {
      nextEl: section.querySelector('.swiper-button-next'),
      prevEl: section.querySelector('.swiper-button-prev')
    }
  });

  function setActive(i) {
    activeIndex = i;
    const tabs = trackEl.querySelectorAll('.tab');
    tabs.forEach(btn => btn.classList.toggle('active', +btn.dataset.slide === i));
    texts.forEach(t => t.classList.toggle('active', +t.dataset.step === i));
  }

  function addTabClick(tab) {
    tab.addEventListener('click', () => {
      const i = +tab.dataset.slide;
      appSwiper.slideToLoop(i);
      buildInitialPills(i);
      setActive(i);
    });
  }

  function buildInitialPills(centerIndex) {
    trackEl.innerHTML = '';
    const visible = 20;
    const half = Math.floor(visible / 2);
    for (let offset = -half; offset <= half; offset++) {
      const i = (centerIndex + offset + total) % total;
      const clone = originalPills[i].cloneNode(true);
      const tab = clone.querySelector('.tab');
      if (tab) addTabClick(tab);
      trackEl.appendChild(clone);
    }
  }

  function movePill(direction) {
    let next = direction === 'next' ? activeIndex + 1 : activeIndex - 1;
    if (next >= total) next = 0;
    if (next < 0) next = total - 1;
    buildInitialPills(next);
    setActive(next);
  }

  // image swipes
  appSwiper.on('slideChangeTransitionEnd', () => {
    const i = appSwiper.realIndex;
    buildInitialPills(i);
    setActive(i);
  });

  section.querySelector('.swiper-button-next')?.addEventListener('click', () => movePill('next'));
  section.querySelector('.swiper-button-prev')?.addEventListener('click', () => movePill('prev'));

  buildInitialPills(0);
  setActive(0);
})();
