/* === ROTATING GALLERY – gallery + pill carousel ===================== */
(function () {
  if (window.__rotatingGalleryInit) return;
  window.__rotatingGalleryInit = true;
  if (typeof Swiper === 'undefined') return;

  const section = document.querySelector('.rotating-gallery-process');
  if (!section) return;

  const pillsEl   = section.querySelector('.tabs-swiper');
  const texts     = [...section.querySelectorAll('.process-text')];
  const totalPills = pillsEl.querySelectorAll('.swiper-slide').length;

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

  /* --- pill carousel --- */

  const pillsSwiper = new Swiper(pillsEl, {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 16,
    loop: true,
    loopAdditionalSlides: totalPills,
  });

  function setActive(i) {
    pillsEl.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
    pillsSwiper.slides[pillsSwiper.activeIndex]
              ?.querySelector('.tab')
              ?.classList.add('active');
    texts.forEach(t => t.classList.toggle('active', +t.dataset.step === i));
  }

  pillsEl.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = +btn.dataset.slide;
      gallerySwiper.slideToLoop(i);
      pillsSwiper.slideToLoop(i);
    });
  });

  /* --- sync swipers --- */
  let syncing = false;

  function syncFromGallery() {
    if (syncing) return;
    syncing = true;
    const i = gallerySwiper.realIndex;
    pillsSwiper.slideToLoop(i);
    setActive(i);
    syncing = false;
  }

  function syncFromPills() {
    if (syncing) return;
    syncing = true;
    const i = pillsSwiper.realIndex;
    gallerySwiper.slideToLoop(i);
    // ensure the active pill is centred after dragging
    pillsSwiper.slideToLoop(i);
    setActive(i);
    syncing = false;
  }

  gallerySwiper.on('slideChangeTransitionEnd', syncFromGallery);
  pillsSwiper.on('slideChangeTransitionEnd', syncFromPills);

  updateScale();
  syncFromGallery();
})();
