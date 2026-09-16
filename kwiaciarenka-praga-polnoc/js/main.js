document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  var toggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('.nav ul');
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      navList.classList.toggle('open');
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Lightbox ---------- */
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
    var idx = 0;

    function openLb(i) {
      idx = i;
      lbImg.src = items[idx].getAttribute('href') || items[idx].getAttribute('data-full');
      lb.classList.add('open');
    }
    function closeLb() { lb.classList.remove('open'); }
    function nextLb(dir) {
      idx = (idx + dir + items.length) % items.length;
      lbImg.src = items[idx].getAttribute('href') || items[idx].getAttribute('data-full');
    }

    items.forEach(function (item, i) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        openLb(i);
      });
    });
    var closeBtn = lb.querySelector('.lightbox-close');
    var prevBtn = lb.querySelector('.lightbox-prev');
    var nextBtn = lb.querySelector('.lightbox-next');
    if (closeBtn) closeBtn.addEventListener('click', closeLb);
    if (prevBtn) prevBtn.addEventListener('click', function () { nextLb(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { nextLb(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') nextLb(-1);
      if (e.key === 'ArrowRight') nextLb(1);
    });
  }

  /* ---------- Gallery filter ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.grid-gallery figure');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-filter');
      galleryItems.forEach(function (fig) {
        var show = cat === 'all' || fig.getAttribute('data-cat') === cat;
        fig.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Form validation ---------- */
  var form = document.querySelector('.inquiry');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var fields = form.querySelectorAll('[required]');
      fields.forEach(function (field) {
        var wrap = field.closest('.field');
        var isEmpty = !field.value || !field.value.trim();
        var isBadEmail = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        var isBadPhone = field.type === 'tel' && field.value && !/^[0-9+\s-]{7,}$/.test(field.value);
        if (isEmpty || isBadEmail || isBadPhone) {
          wrap.classList.add('invalid');
          valid = false;
        } else {
          wrap.classList.remove('invalid');
        }
      });
      if (!valid) return;
      form.style.display = 'none';
      var success = document.querySelector('.form-success');
      if (success) success.classList.add('show');
    });

    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        el.closest('.field').classList.remove('invalid');
      });
    });
  }
});
