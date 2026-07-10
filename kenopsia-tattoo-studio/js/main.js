/* KENOPSIA — Studio Tatuażu i Piercingu — main.js */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Fixed nav: transparent -> solid on scroll ---------- */
  var nav = document.querySelector('.nav');
  function onScroll () {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
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

  /* ---------- Reveal-on-scroll fade-ins ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Gallery lightbox (studio motif artworks) ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxInner = lightbox ? lightbox.querySelector('.lightbox-content') : null;
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      if (!lightbox) return;
      var art = item.querySelector('.art').innerHTML;
      var tag = item.querySelector('.tag') ? item.querySelector('.tag').textContent : '';
      lightboxInner.innerHTML = art + '<p class="lightbox-caption">' + tag + '</p>';
      lightbox.classList.add('open');
    });
  });
  var lbClose = document.querySelector('.lightbox-close');
  if (lbClose) lbClose.addEventListener('click', function () { lightbox.classList.remove('open'); });
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  /* ---------- Floating action button (Instagram DM / phone) ---------- */
  var fab = document.querySelector('.fab-wrap');
  var fabMain = document.querySelector('.fab-main');
  if (fab && fabMain) {
    fabMain.addEventListener('click', function () { fab.classList.toggle('open'); });
  }

  /* ---------- Appointment inquiry form: client-side validation ---------- */
  var form = document.querySelector('.appt');
  if (form) {
    var success = document.querySelector('.form-success');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var fields = form.querySelectorAll('[data-required]');
      fields.forEach(function (input) {
        var wrap = input.closest('.field');
        var value = input.value.trim();
        var ok = value.length > 0;

        if (input.type === 'email' && ok) {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
        if (input.type === 'tel' && ok) {
          ok = /^[0-9+\s-]{6,}$/.test(value);
        }

        if (!ok) {
          wrap.classList.add('error');
          valid = false;
        } else {
          wrap.classList.remove('error');
        }
      });

      if (!valid) {
        if (success) success.classList.remove('show');
        return;
      }

      form.reset();
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    form.querySelectorAll('[data-required]').forEach(function (input) {
      input.addEventListener('input', function () {
        input.closest('.field').classList.remove('error');
      });
    });
  }

});
