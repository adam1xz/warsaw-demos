document.addEventListener('DOMContentLoaded', function () {

  // Fade-in on scroll
  var faders = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    faders.forEach(function (el) { io.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add('visible'); });
  }

  // Graceful fallback for any broken remote image
  var placeholder = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
    '<rect width="100%" height="100%" fill="#2c1810"/>' +
    '<rect x="20" y="20" width="760" height="560" fill="none" stroke="#c49a2a" stroke-width="2"/>' +
    '<text x="400" y="300" font-family="Georgia, serif" font-size="26" fill="#c49a2a" text-anchor="middle" font-style="italic">Zakład Kaletniczy Edward Pająk</text>' +
    '</svg>'
  );
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = '1';
      img.src = placeholder;
    });
  });

  // Lightbox
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lightboxImg = document.getElementById('lightboxImg');
    document.querySelectorAll('.masonry img').forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.dataset.full || img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });
    document.getElementById('lightboxClose').addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  // Repair request form validation
  var repairForm = document.getElementById('repairForm');
  if (repairForm) {
    repairForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      ['name', 'phone', 'item', 'date'].forEach(function (id) {
        var field = document.getElementById(id);
        var errorEl = field.parentElement.querySelector('.error-text');
        if (!field.value.trim()) {
          valid = false;
          if (errorEl) errorEl.classList.add('visible');
        } else if (errorEl) {
          errorEl.classList.remove('visible');
        }
      });

      var phoneField = document.getElementById('phone');
      var phonePattern = /^[0-9+\s()-]{7,}$/;
      if (phoneField.value.trim() && !phonePattern.test(phoneField.value.trim())) {
        valid = false;
        phoneField.parentElement.querySelector('.error-text').classList.add('visible');
      }

      if (!valid) return;

      var successMsg = document.getElementById('successMsg');
      var name = document.getElementById('name').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var date = document.getElementById('date').value;
      successMsg.textContent = 'Dziękujemy, ' + name + '! Zgłoszenie zostało przyjęte — oddzwonimy pod numer ' + phone + ', aby potwierdzić termin ' + date + '.';
      successMsg.classList.add('visible');
      repairForm.reset();
    });
  }

});
