function scaleTaglineToMatchHeadline() {
  const tagline = document.querySelector('.hero-tagline');
  const lines = document.querySelectorAll('.hero-line');

  if (!tagline || lines.length === 0) return;

  // Step 1: get widest line width
  let maxWidth = 0;
  lines.forEach(line => {
    const width = line.getBoundingClientRect().width;
    if (width > maxWidth) maxWidth = width;
  });

  // Step 2: temporarily reset font-size, ensure natural flow
  tagline.style.fontSize = "1px";
  tagline.style.whiteSpace = "normal";
  tagline.style.display = "inline-block";

  const naturalWidth = tagline.getBoundingClientRect().width;

  // Avoid division by 0 or nonsense
  if (naturalWidth < 1) return;

  const scaleFactor = maxWidth / naturalWidth;
  const newSize = 1 * scaleFactor;

  // Step 3: apply scaled size
  tagline.style.fontSize = `${newSize}px`;
}
