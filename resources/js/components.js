function loadComponent(id, file) {
    return fetch(file)
      .then(res => res.text())
      .then(html => document.getElementById(id).innerHTML = html)
      .catch(err => console.error('Failed to load component:', file, err));
  }
  
  loadComponent('header', '/views/projects/comps/header.html').then(() => {
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
  });
  
  //loadComponent('footer', '/views/projects/comps/footer.html');