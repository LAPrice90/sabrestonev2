const categories = document.querySelectorAll('.app-category');
const heroImage = document.querySelector('#app-hero img');
const heroTitle = document.querySelector('.app-overlay h3');

// Determine absolute path to the project root using this script's location
const basePath = (() => {
  const src = document.currentScript?.src || '';
  return new URL('../', src).href; // e.g. https://user.github.io/repo/
})();

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
  console.log('basePath resolves to →', basePath);
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
