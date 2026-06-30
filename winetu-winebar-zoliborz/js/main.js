(function(){
  // header scroll state
  var header = document.getElementById('site-header');
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if(navToggle && navLinks){
    navToggle.addEventListener('click', function(){
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ navLinks.classList.remove('open'); });
    });
  }

  // menu tabs
  var tabBtns = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('.menu-panel');
  tabBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var target = btn.getAttribute('data-tab');
      tabBtns.forEach(function(b){ b.classList.remove('active'); });
      panels.forEach(function(p){ p.classList.remove('active'); });
      btn.classList.add('active');
      var panel = document.getElementById('panel-' + target);
      if(panel) panel.classList.add('active');
    });
  });

  // scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.12});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  // lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxTitle = document.getElementById('lightboxTitle');
  document.querySelectorAll('.gallery-grid figure').forEach(function(fig){
    fig.addEventListener('click', function(){
      if(!lightbox) return;
      var caption = fig.getAttribute('data-caption') || '';
      if(lightboxTitle) lightboxTitle.textContent = caption;
      lightbox.classList.add('open');
    });
  });
  if(lightboxClose){
    lightboxClose.addEventListener('click', function(){
      lightbox.classList.remove('open');
    });
  }
  if(lightbox){
    lightbox.addEventListener('click', function(e){
      if(e.target === lightbox) lightbox.classList.remove('open');
    });
  }
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && lightbox) lightbox.classList.remove('open');
  });

  // generic form validation + success handling
  function validateField(field){
    var input = field.querySelector('input, select, textarea');
    if(!input) return true;
    var valid = true;
    if(input.hasAttribute('required') && !input.value.trim()){
      valid = false;
    }
    if(valid && input.type === 'email' && input.value.trim()){
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRe.test(input.value.trim())) valid = false;
    }
    if(valid && input.type === 'tel' && input.value.trim()){
      var telRe = /^[0-9+\s()-]{6,}$/;
      if(!telRe.test(input.value.trim())) valid = false;
    }
    field.classList.toggle('invalid', !valid);
    return valid;
  }

  function wireForm(formId, msgId){
    var form = document.getElementById(formId);
    var msg = document.getElementById(msgId);
    if(!form) return;
    var fields = form.querySelectorAll('.field');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var allValid = true;
      fields.forEach(function(field){
        if(!validateField(field)) allValid = false;
      });
      if(!allValid) return;
      form.classList.add('submitted-ok');
      if(msg) msg.classList.add('show');
    });
    fields.forEach(function(field){
      var input = field.querySelector('input, select, textarea');
      if(input){
        input.addEventListener('blur', function(){ validateField(field); });
        input.addEventListener('input', function(){
          if(field.classList.contains('invalid')) validateField(field);
        });
      }
    });
  }

  wireForm('bookingForm', 'bookingMsg');
  wireForm('contactForm', 'contactMsg');
})();
