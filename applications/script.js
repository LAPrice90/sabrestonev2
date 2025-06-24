const categories = document.querySelectorAll('.app-category');
const heroImage = document.querySelector('#app-hero img');
const heroTitle = document.querySelector('.app-overlay h3');

// Get absolute base path from site root
const basePath = window.location.origin + '/sabrestonev2/';

const appData = {
  cladding: {
    image: basePath + 'images/projects-column.jpg',
    title: 'Wall Cladding',
  },
  tables: {
    image: basePath + 'images/projects-column.jpg',
    title: 'Tables',
  },
  worktops: {
    image: basePath + 'images/projects-column.jpg',
    title: 'Worktops',
  },
};

categories.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.app-category.active')?.classList.remove('active');
    btn.classList.add('active');

    const target = btn.dataset.target;
    heroImage.style.opacity = 0;

    setTimeout(() => {
      heroImage.src = appData[target].image;
      heroTitle.textContent = appData[target].title;
      heroImage.style.opacity = 1;
    }, 300);
  });
});

// ----- Applications Swiper setup -----
window.addEventListener('DOMContentLoaded', () => {
  const sliderEl = document.querySelector('.applications-slider');
  if (!sliderEl || typeof Swiper === 'undefined') return;

  const slider = new Swiper(sliderEl, {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
  });

  function updateActive() {
    sliderEl.querySelectorAll('.swiper-slide').forEach(slide => {
      slide.classList.toggle('is-current', slide.classList.contains('swiper-slide-active'));
    });
  }

  slider.on('slideChangeTransitionEnd', updateActive);
  updateActive();
});
