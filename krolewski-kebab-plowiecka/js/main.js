document.addEventListener('DOMContentLoaded', function () {

  var nav = document.querySelector('.nav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  var reveals = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  reveals.forEach(function (el) { io.observe(el); });

  var tabs = document.querySelectorAll('.menu-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('.menu-panel').forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  var form = document.getElementById('orderForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var name = form.querySelector('#name');
      var phone = form.querySelector('#phone');
      var time = form.querySelector('#pickupTime');

      if (!name.value.trim()) { showError(name, true); valid = false; } else showError(name, false);
      if (!/^[0-9+ ]{7,15}$/.test(phone.value.trim())) { showError(phone, true); valid = false; } else showError(phone, false);
      if (!time.value) { showError(time, true); valid = false; } else showError(time, false);

      if (valid) {
        form.reset();
        document.getElementById('formSuccess').classList.add('show');
        setTimeout(function () {
          document.getElementById('formSuccess').classList.remove('show');
        }, 6000);
      }
    });
  }

  function showError(field, isError) {
    var err = field.parentElement.querySelector('.form-error');
    if (!err) return;
    err.classList.toggle('show', isError);
  }

});
