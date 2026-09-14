// Fade-in on scroll
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.fade-in, .gallery-item');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(t => io.observe(t));
  } else {
    targets.forEach(t => t.classList.add('in-view'));
  }

  // Lightbox for gallery
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbBox = lightbox.querySelector('.lightbox-box');
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const svg = item.querySelector('svg').cloneNode(true);
        const caption = item.querySelector('.cap')?.textContent || '';
        lbBox.innerHTML = '';
        lbBox.appendChild(svg);
        const p = document.createElement('p');
        p.textContent = caption;
        p.style.fontStyle = 'italic';
        p.style.color = '#d4af37';
        lbBox.appendChild(p);
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('open');
      }
    });
  }

  // Generic form validation + success message
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        const wrap = field.closest('.field');
        const value = field.value.trim();
        let ok = value.length > 0;
        if (field.type === 'email' && ok) {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
        if (field.type === 'tel' && ok) {
          ok = /^[0-9+ ()-]{6,}$/.test(value);
        }
        if (!ok) {
          valid = false;
          wrap.classList.add('error');
        } else {
          wrap.classList.remove('error');
        }
      });
      const msg = form.parentElement.querySelector('.form-msg');
      if (valid) {
        form.reset();
        form.style.display = 'none';
        if (msg) {
          msg.textContent = form.dataset.success || 'Dziękujemy! Odezwiemy się wkrótce.';
          msg.classList.add('show');
        }
      }
    });
  });

  // Nav active link highlight
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
