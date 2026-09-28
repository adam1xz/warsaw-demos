// Smak Indii — main.js
(function () {
  "use strict";

  /* ---------- Nav scroll state + mobile toggle ---------- */
  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---------- Broken image fallback ----------
     If a hotlinked stock photo fails to load, swap in a warm
     gradient so the layout still looks intentional. */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    img.addEventListener("error", function () {
      img.style.background =
        "linear-gradient(135deg, #e07a5f, #0077b6)";
      img.style.minHeight = "100%";
      img.style.minWidth = "100%";
      img.removeAttribute("src");
    });
  });

  /* ---------- Gallery lightbox ---------- */
  var galleryItems = Array.prototype.slice.call(
    document.querySelectorAll("[data-lightbox]")
  );
  if (galleryItems.length) {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML =
      '<button class="lb-close" aria-label="Zamknij">&times;</button>' +
      '<button class="lb-prev" aria-label="Poprzednie">&#10094;</button>' +
      '<div style="max-width:90vw;">' +
      '<img alt="" />' +
      '<div class="lb-caption"></div>' +
      "</div>" +
      '<button class="lb-next" aria-label="Następne">&#10095;</button>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector("img");
    var lbCaption = lb.querySelector(".lb-caption");
    var current = 0;

    function show(i) {
      current = (i + galleryItems.length) % galleryItems.length;
      var el = galleryItems[current];
      var full = el.getAttribute("data-lightbox") || el.querySelector("img").src;
      lbImg.src = full;
      lbCaption.textContent = el.getAttribute("data-caption") || "";
    }
    function open(i) {
      show(i);
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
    }

    galleryItems.forEach(function (el, i) {
      el.addEventListener("click", function () {
        open(i);
      });
    });
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", function () {
      show(current - 1);
    });
    lb.querySelector(".lb-next").addEventListener("click", function () {
      show(current + 1);
    });
    lb.addEventListener("click", function (e) {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(current + 1);
      if (e.key === "ArrowLeft") show(current - 1);
    });
  }

  /* ---------- Reservation form validation ---------- */
  var form = document.querySelector("#reservation-form");
  if (form) {
    var successBox = document.querySelector("#reservation-success");

    function setError(field, message) {
      var wrap = field.closest(".field");
      if (!wrap) return;
      wrap.classList.add("invalid");
      var err = wrap.querySelector(".field-error");
      if (err && message) err.textContent = message;
    }
    function clearError(field) {
      var wrap = field.closest(".field");
      if (wrap) wrap.classList.remove("invalid");
    }

    function validatePhone(value) {
      var digits = value.replace(/[\s\-()]/g, "");
      return /^(\+?\d{7,15})$/.test(digits);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      var name = form.querySelector("#res-name");
      var phone = form.querySelector("#res-phone");
      var date = form.querySelector("#res-date");
      var time = form.querySelector("#res-time");
      var guests = form.querySelector("#res-guests");

      [name, phone, date, time, guests].forEach(clearError);

      if (!name.value.trim() || name.value.trim().length < 2) {
        setError(name, "Podaj imię i nazwisko.");
        valid = false;
      }
      if (!phone.value.trim() || !validatePhone(phone.value.trim())) {
        setError(phone, "Podaj poprawny numer telefonu.");
        valid = false;
      }
      if (!date.value) {
        setError(date, "Wybierz datę rezerwacji.");
        valid = false;
      } else {
        var chosen = new Date(date.value + "T00:00:00");
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (chosen < today) {
          setError(date, "Data nie może być z przeszłości.");
          valid = false;
        }
      }
      if (!time.value) {
        setError(time, "Wybierz godzinę.");
        valid = false;
      }
      if (!guests.value || Number(guests.value) < 1 || Number(guests.value) > 20) {
        setError(guests, "Podaj liczbę osób (1–20).");
        valid = false;
      }

      if (!valid) {
        if (successBox) successBox.classList.remove("show");
        return;
      }

      // No backend — simulate a successful booking request.
      if (successBox) {
        successBox.textContent =
          "Dziękujemy, " +
          name.value.trim().split(" ")[0] +
          "! Twoja prośba o rezerwację na " +
          date.value +
          " o godz. " +
          time.value +
          " (" +
          guests.value +
          " os.) została zapisana. Zadzwonimy, aby potwierdzić stolik.";
        successBox.classList.add("show");
        successBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  }

  /* ---------- Simple contact form (fallback / general enquiry) ---------- */
  var contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    var contactSuccess = document.querySelector("#contact-success");
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      var cname = contactForm.querySelector("#c-name");
      var cemail = contactForm.querySelector("#c-email");
      var cmsg = contactForm.querySelector("#c-message");
      [cname, cemail, cmsg].forEach(function (f) {
        var wrap = f.closest(".field");
        if (wrap) wrap.classList.remove("invalid");
      });
      if (!cname.value.trim()) {
        cname.closest(".field").classList.add("invalid");
        valid = false;
      }
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cemail.value.trim());
      if (!emailOk) {
        cemail.closest(".field").classList.add("invalid");
        valid = false;
      }
      if (!cmsg.value.trim() || cmsg.value.trim().length < 5) {
        cmsg.closest(".field").classList.add("invalid");
        valid = false;
      }
      if (!valid) {
        if (contactSuccess) contactSuccess.classList.remove("show");
        return;
      }
      if (contactSuccess) {
        contactSuccess.textContent =
          "Dziękujemy za wiadomość! Odpiszemy najszybciej, jak to możliwe.";
        contactSuccess.classList.add("show");
      }
      contactForm.reset();
    });
  }
})();
