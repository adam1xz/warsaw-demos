// Nav scroll state
const siteNav = document.getElementById('siteNav');
if (siteNav && !siteNav.classList.contains('scrolled-fixed')) {
  const onScroll = () => {
    if (window.scrollY > 60) siteNav.classList.add('scrolled');
    else if (!siteNav.dataset.forceScrolled) siteNav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinksMobile = document.getElementById('navLinksMobile');
if (navToggle && navLinksMobile) {
  navToggle.addEventListener('click', () => navLinksMobile.classList.toggle('open'));
  navLinksMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinksMobile.classList.remove('open')));
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

// Menu tabs
const menuTabs = document.querySelectorAll('.menu-tab');
menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
  });
});

// Gallery filter
const filterBtns = document.querySelectorAll('.filter-btn');
const tiles = document.querySelectorAll('.masonry .g-tile');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    tiles.forEach(t => {
      t.style.display = (f === 'all' || t.dataset.cat === f) ? '' : 'none';
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lbImg = document.getElementById('lightboxImg');
  const lbCap = document.getElementById('lightboxCap');
  const lbClose = document.getElementById('lightboxClose');
  document.querySelectorAll('.masonry .g-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const ph = tile.querySelector('.ph');
      lbImg.style.background = ph.style.background;
      lbImg.textContent = tile.dataset.title || '';
      lbCap.textContent = tile.dataset.desc || '';
      lightbox.classList.add('open');
    });
  });
  const closeLb = () => lightbox.classList.remove('open');
  lbClose.addEventListener('click', closeLb);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
}

// Generic form validator
function setupForm(formId, fields, successId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    fields.forEach(f => {
      const el = document.getElementById(f.id);
      const wrap = document.getElementById(f.wrap);
      const ok = f.test(el.value.trim());
      if (wrap) wrap.classList.toggle('error', !ok);
      if (!ok) valid = false;
    });
    const successEl = document.getElementById(successId);
    if (valid) {
      successEl.classList.add('show');
      form.reset();
      document.querySelectorAll('#' + formId + ' .field').forEach(f => f.classList.remove('error'));
      setTimeout(() => successEl.classList.remove('show'), 6000);
    } else {
      document.getElementById(successId).classList.remove('show');
    }
  });
}

const emailTest = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const phoneTest = (v) => /^[+0-9 ()-]{7,}$/.test(v);
const nonEmpty = (v) => v.length > 0;

setupForm('reserveForm', [
  { id: 'r-name', wrap: 'f-name', test: nonEmpty },
  { id: 'r-phone', wrap: 'f-phone', test: phoneTest },
  { id: 'r-date', wrap: 'f-date', test: nonEmpty },
  { id: 'r-time', wrap: 'f-time', test: nonEmpty },
  { id: 'r-guests', wrap: 'f-guests', test: nonEmpty },
  { id: 'r-email', wrap: 'f-email', test: emailTest },
], 'formSuccess');

setupForm('contactForm', [
  { id: 'c-name', wrap: 'c-f-name', test: nonEmpty },
  { id: 'c-email', wrap: 'c-f-email', test: emailTest },
  { id: 'c-subject', wrap: 'c-f-subject', test: nonEmpty },
  { id: 'c-message', wrap: 'c-f-message', test: nonEmpty },
], 'contactSuccess');

// Min date = today for reservation date field
const dateInput = document.getElementById('r-date');
if (dateInput) {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}
