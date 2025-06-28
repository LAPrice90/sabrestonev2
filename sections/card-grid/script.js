// Show up to THRESHOLD cards initially and reveal more on demand
(function(){
  const THRESHOLD = 18;
  document.querySelectorAll('.card-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.card');
    if (cards.length <= THRESHOLD) return;
    cards.forEach((card, idx) => {
      if (idx >= THRESHOLD) card.classList.add('card--hidden');
    });
    const btn = document.createElement('button');
    btn.className = 'btn btn--outline card-grid__load-more';
    btn.textContent = 'Load More';
    btn.addEventListener('click', () => {
      grid.querySelectorAll('.card--hidden').forEach(c => c.classList.remove('card--hidden'));
      btn.remove();
    });
    grid.parentNode.insertBefore(btn, grid.nextSibling);
  });
})();
