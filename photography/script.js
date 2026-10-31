// Smooth scrolling for in-page links.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Contact sheet lightbox: click a frame to enlarge. Arrow keys move, Esc closes.
(() => {
  const frames = [...document.querySelectorAll('.sheet .frame')];
  const box = document.querySelector('.lightbox');
  if (!frames.length || !box || !box.showModal) return;
  const img = box.querySelector('img');
  const title = box.querySelector('.lb-title');
  const count = box.querySelector('.lb-count');
  let i = 0, opener = null;

  const show = n => {
    i = (n + frames.length) % frames.length;
    const f = frames[i];
    img.src = f.dataset.full;
    img.alt = f.querySelector('img').alt;
    title.textContent = f.dataset.title;
    count.textContent = `${i + 1} / ${frames.length}`;
  };

  frames.forEach((f, n) => f.addEventListener('click', () => {
    opener = f; show(n); box.showModal();
  }));
  box.querySelector('.lb-prev').addEventListener('click', () => show(i - 1));
  box.querySelector('.lb-next').addEventListener('click', () => show(i + 1));
  box.querySelector('.lb-close').addEventListener('click', () => box.close());
  box.addEventListener('click', e => { if (e.target === box) box.close(); });
  box.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
  box.addEventListener('close', () => opener && opener.focus());
})();
