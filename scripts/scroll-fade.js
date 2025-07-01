function initFadeAnimations() {
  const targets = document.querySelectorAll(
    'img, picture img, h1, h2, h3, h4, h5, h6, p, li'
  );

  targets.forEach(el => el.classList.add('fade-init'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });

  targets.forEach(el => observer.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFadeAnimations);
} else {
  initFadeAnimations();
}
