/* === ROTATING GALLERY – gallery + pill carousel ===================== */
(function () {
  if (window.__rotatingGalleryInit) return;
  window.__rotatingGalleryInit = true;
  if (typeof Swiper === 'undefined') return;

  const section = document.querySelector('.rotating-gallery-process');
  if (!section) return;

  const pillsEl   = section.querySelector('.tabs-swiper');
  const trackEl   = pillsEl.querySelector('.swiper-wrapper');
  const originals = [...trackEl.querySelectorAll('.swiper-slide')];
  const texts     = [...section.querySelectorAll('.process-text')];
  const total     = originals.length;
  let activeIndex = 0;

  /* --- image carousel --- */
  const gallerySwiper = new Swiper(
    section.querySelector('.rotating-gallery-swiper'),
    {
      loop: true,
      centeredSlides: true,
      spaceBetween: 20,
      watchSlidesProgress: true,
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
    }
  );

  /* --- dynamic scaling based on slide progress --- */
  function updateScale() {
    gallerySwiper.slides.forEach(slide => {
      const progress = Math.min(Math.abs(slide.progress), 1);
      const scale = 0.9 + (1 - progress) * 0.13; // 0.9 -> 1.03
      const img = slide.querySelector('img');
      if (img) img.style.transform = `scale(${scale})`;
    });
  }

  gallerySwiper.on('progress', updateScale);
  gallerySwiper.on('setTransition', duration => {
    gallerySwiper.slides.forEach(slide => {
      const img = slide.querySelector('img');
      if (img) img.style.transitionDuration = `${duration}ms`;
    });
  });

  /* --- helpers --- */
  function setActive(i) {
    activeIndex = i;
    trackEl.querySelectorAll('.tab')
           .forEach(btn => btn.classList.toggle('active', +btn.dataset.slide === i));
    texts.forEach(t => t.classList.toggle('active', +t.dataset.step === i));
  }

  function addTabClick(tab) {
    tab.addEventListener('click', () => {
      const i = +tab.dataset.slide;
      gallerySwiper.slideToLoop(i);
      buildPills(i);
      setActive(i);
    });
  }

  function buildPills(center) {
    trackEl.innerHTML = '';
    const visible = 20;
    const half    = Math.floor(visible / 2);
    for (let off = -half; off <= half; off++) {
      const i = (center + off + total) % total;
      const clone = originals[i].cloneNode(true);
      addTabClick(clone.querySelector('.tab'));
      trackEl.appendChild(clone);
    }
    updateScale();
  }

  function move(dir) {
    let next = dir === 'next' ? activeIndex + 1 : activeIndex - 1;
    next = (next + total) % total;
    buildPills(next);
    setActive(next);
  }

  /* --- bindings --- */
  gallerySwiper.on('slideChangeTransitionEnd', () => {
    const i = gallerySwiper.realIndex;
    buildPills(i);
    setActive(i);
  });

  section.querySelector('.swiper-button-next')?.addEventListener('click', () => move('next'));
  section.querySelector('.swiper-button-prev')?.addEventListener('click', () => move('prev'));

  buildPills(0);          /* initialise */
  setActive(0);
  updateScale();
})();

