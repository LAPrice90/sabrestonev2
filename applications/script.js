/* === SWIPER INITIALISATION ============================================= */
document.addEventListener('DOMContentLoaded', () => {

  const init = () => {
    const swiper = new Swiper('.applications-slider', {
      loop: true,
      centeredSlides: true,
      spaceBetween: 0,
      slidesPerView: 3,          // default desktop view
      breakpoints: {             // responsive slide counts
        0:   { slidesPerView: 1.2 },
        768: { slidesPerView: 2.2 },
        1020:{ slidesPerView: 3   }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });

    /* === PILLS <-> SLIDER SYNC ======================================= */
    const pills = document.querySelectorAll('.app-category');

    pills.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        swiper.slideToLoop(i);                 // jump to matched slide
      });
    });

    swiper.on('slideChange', () => {           // keep active pill highlighted
      const current = swiper.realIndex;
      pills.forEach((b, i) => {
        b.classList.toggle('active', i === current);
      });
    });
  };

  // Load Swiper library dynamically if not already present
  if (typeof Swiper === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/swiper/swiper-bundle.min.js';
    script.onload = init;
    document.head.appendChild(script);
  } else {
    init();
  }
});
