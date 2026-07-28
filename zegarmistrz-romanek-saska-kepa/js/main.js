document.addEventListener('DOMContentLoaded', function () {

  // Nav scroll state
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Dial gallery lightbox
  var overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    var modalTitle = overlay.querySelector('h3');
    var modalDesc = overlay.querySelector('p');
    var modalClose = overlay.querySelector('.modal-close');
    document.querySelectorAll('.dial-card').forEach(function (card) {
      card.addEventListener('click', function () {
        modalTitle.textContent = card.getAttribute('data-name') || '';
        modalDesc.textContent = card.getAttribute('data-desc') || '';
        overlay.classList.add('open');
      });
    });
    modalClose.addEventListener('click', function () { overlay.classList.remove('open'); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  }

  // Generic form validation + success message
  document.querySelectorAll('form[novalidate]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll('.form-group').forEach(function (group) {
        var field = group.querySelector('input, select, textarea');
        if (!field) return;
        var ok = field.checkValidity() && field.value.trim() !== '';
        if (field.type === 'tel' && field.value.trim() !== '') {
          ok = /^[0-9+\s-]{7,}$/.test(field.value.trim());
        }
        group.classList.toggle('error', !ok);
        if (!ok) valid = false;
      });
      var successMsg = form.querySelector('.form-success');
      if (valid) {
        if (successMsg) successMsg.classList.add('show');
        form.reset();
      } else if (successMsg) {
        successMsg.classList.remove('show');
      }
    });
  });

  // Min date = today for date pickers
  var today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(function (input) {
    input.setAttribute('min', today);
  });
});
