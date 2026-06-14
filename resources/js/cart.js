const cart = document.querySelector('.cart');
const nav = document.getElementById('mainNav');

if (cart) {
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    nav.classList.add('visible');
    document.body.style.overflow = 'auto';
  }, 200);
} else {
  nav.classList.add('visible');
}