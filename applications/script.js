const categories = document.querySelectorAll('.app-category');
const heroImage = document.querySelector('#app-hero img');
const heroTitle = document.querySelector('.app-overlay h3');

const appData = {
  cladding: {
    image: '../images/projects-column.jpg',
    title: 'Wall Cladding',
  },
  tables: {
    image: '../images/projects-column.jpg',
    title: 'Tables',
  },
  worktops: {
    image: '../images/projects-column.jpg',
    title: 'Worktops',
  },
};

categories.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Category clicked: ' + btn.dataset.target);
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
