document.addEventListener('DOMContentLoaded', function () {
  // header scroll state
  var header = document.getElementById('site-header');
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else if (!header.classList.contains('force-scrolled')) {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // menu tabs
  var tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.menu-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById('panel-' + target).classList.add('active');
    });
  });

  // gallery lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxTitle = document.getElementById('lightboxTitle');
  var lightboxDesc = document.getElementById('lightboxDesc');
  var lightboxClose = document.getElementById('lightboxClose');
  document.querySelectorAll('.gallery-grid figure').forEach(function (fig) {
    fig.addEventListener('click', function () {
      if (!lightbox) return;
      var caption = fig.getAttribute('data-caption') || '';
      if (lightboxTitle) lightboxTitle.textContent = caption;
      if (lightboxDesc) lightboxDesc.textContent = 'Zdjęcie z Thai Hung Bistro — ' + caption + '.';
      lightbox.classList.add('open');
    });
  });
  if (lightboxClose) {
    lightboxClose.addEventListener('click', function () { lightbox.classList.remove('open'); });
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  // reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // form validation helper
  function validateForm(form, msgEl) {
    var valid = true;
    form.querySelectorAll('[required]').forEach(function (input) {
      var errorEl = input.parentElement.querySelector('.field-error');
      var fieldValid = true;
      if (input.type === 'email') {
        fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      } else {
        fieldValid = input.value.trim().length > 0;
      }
      if (!fieldValid) {
        valid = false;
        if (errorEl) errorEl.classList.add('show');
        input.style.borderColor = '#e0857a';
      } else {
        if (errorEl) errorEl.classList.remove('show');
        input.style.borderColor = '';
      }
    });
    return valid;
  }

  // booking form
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('bookingMsg');
      if (validateForm(bookingForm, msg)) {
        msg.classList.add('show');
        bookingForm.reset();
        setTimeout(function () { msg.classList.remove('show'); }, 6000);
      }
    });
  }

  // contact form
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('contactMsg');
      if (validateForm(contactForm, msg)) {
        msg.classList.add('show');
        contactForm.reset();
        setTimeout(function () { msg.classList.remove('show'); }, 6000);
      }
    });
  }

  // whatsapp floating button
  var waFloat = document.getElementById('waFloat');
  if (waFloat) {
    waFloat.addEventListener('click', function () {
      window.open('https://wa.me/48600529791?text=' + encodeURIComponent('Dzień dobry, chciałbym zarezerwować stolik w Thai Hung Bistro.'), '_blank');
    });
  }
});
