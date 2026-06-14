/* =====================================================
   JANECZKA SALON - Main JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -- Navigation scroll effect -- */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* -- Hamburger menu -- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }

  /* -- Active nav link -- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  /* -- Fade-in on scroll (Intersection Observer) -- */
  const fadeEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  }

  /* -- Lightbox -- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const items = document.querySelectorAll('.gallery-item');
    let currentIdx = 0;

    const openLightbox = (idx) => {
      currentIdx = idx;
      lbImg.src = items[idx].querySelector('img').src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    items.forEach((item, idx) => {
      item.addEventListener('click', () => openLightbox(idx));
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIdx = (currentIdx - 1 + items.length) % items.length;
        lbImg.src = items[currentIdx].querySelector('img').src;
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIdx = (currentIdx + 1) % items.length;
        lbImg.src = items[currentIdx].querySelector('img').src;
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
      if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    });
  }

  /* -- Booking form validation -- */
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    const showError = (input, msg) => {
      let err = input.nextElementSibling;
      if (!err || !err.classList.contains('form-error')) {
        err = document.createElement('div');
        err.className = 'form-error';
        input.parentNode.insertBefore(err, input.nextSibling);
      }
      err.textContent = msg;
    };
    const clearError = (input) => {
      const err = input.nextElementSibling;
      if (err && err.classList.contains('form-error')) err.textContent = '';
    };

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = bookingForm.querySelector('#name');
      const phone = bookingForm.querySelector('#phone');
      const service = bookingForm.querySelector('#service');
      const date = bookingForm.querySelector('#date');

      if (!name.value.trim()) { showError(name, 'Proszę podać imię i nazwisko.'); valid = false; }
      else clearError(name);

      if (!phone.value.trim() || !/^[\d\s\+\-]{9,15}$/.test(phone.value.trim())) {
        showError(phone, 'Proszę podać prawidłowy numer telefonu.'); valid = false;
      } else clearError(phone);

      if (!service.value) { showError(service, 'Proszę wybrać usługę.'); valid = false; }
      else clearError(service);

      if (!date.value) { showError(date, 'Proszę wybrać datę.'); valid = false; }
      else clearError(date);

      if (valid) {
        bookingForm.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
      }
    });
  }

  /* -- Gallery filter (gallery page) -- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* -- Set min date on date picker -- */
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    dateInput.min = today.toISOString().split('T')[0];
  }

  /* -- Smooth counter animation for stats -- */
  const statNums = document.querySelectorAll('.stat-num[data-count]');
  if (statNums.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          let start = 0;
          const duration = 1500;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(ease * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => countObserver.observe(el));
  }

});
