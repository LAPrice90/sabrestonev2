document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll(
    'section img, section picture img, section h1, section h2, section h3, section h4, section h5, section h6, section p, section li'
  );
  targets.forEach(el => el.classList.add('fade-init'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
});
