document.body.style.overflow = 'hidden';

const nav = document.getElementById('mainNav');

setTimeout(() => {
  nav.classList.add('visible');
  // re-enable scrolling after nav appears
  document.body.style.overflow = 'auto';
}, 800);