document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Lightbox (gallery page)
  var lightbox = document.getElementById('lightbox');
  var lightboxBox = document.getElementById('lightboxBox');
  var lightboxCap = document.getElementById('lightboxCap');
  var lightboxClose = document.getElementById('lightboxClose');
  var tiles = document.querySelectorAll('#galleryGrid .tile');

  tiles.forEach(function (tile) {
    tile.addEventListener('click', function () {
      var img = tile.querySelector('.tile-img');
      var cap = tile.getAttribute('data-cap') || '';
      lightboxBox.className = 'lightbox-box ' + (img ? img.className.replace('tile-img', '').trim() : '');
      lightboxCap.textContent = cap;
      lightbox.classList.add('is-open');
    });
  });
  if (lightboxClose) {
    lightboxClose.addEventListener('click', function () { lightbox.classList.remove('is-open'); });
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('is-open');
    });
  }

  // Booking form validation (contact page)
  var form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      function setError(id, show) {
        var el = document.getElementById('err-' + id);
        if (el) el.classList.toggle('show', show);
      }

      var ownerName = document.getElementById('ownerName').value.trim();
      var petName = document.getElementById('petName').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var service = document.getElementById('service').value;
      var date = document.getElementById('date').value;
      var time = document.getElementById('time').value;

      var phonePattern = /^[+0-9\s-]{7,15}$/;

      if (!ownerName) { setError('ownerName', true); valid = false; } else { setError('ownerName', false); }
      if (!petName) { setError('petName', true); valid = false; } else { setError('petName', false); }
      if (!phone || !phonePattern.test(phone)) { setError('phone', true); valid = false; } else { setError('phone', false); }
      if (!service) { setError('service', true); valid = false; } else { setError('service', false); }
      if (!date) { setError('date', true); valid = false; } else { setError('date', false); }
      if (!time) { setError('time', true); valid = false; } else { setError('time', false); }

      var successMsg = document.getElementById('successMsg');
      if (valid) {
        successMsg.classList.add('show');
        form.reset();
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        successMsg.classList.remove('show');
      }
    });
  }
});
