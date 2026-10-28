/* ─────────────────────────────────────────────────────────────
   Paws on the Rock – site script (vanilla JS, no dependencies)
   Menu · header · reveals · services explorer · before/after ·
   lightbox · form · mobile bar
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Year in footer ───────────────────────────────────────── */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ── Header shadow on scroll + hide mobile bar near the form ─ */
  var header = $('.site-header');
  var bar = $('[data-mobile-bar]');
  var contact = $('#contact');
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 10);
    if (bar && contact) {
      var r = contact.getBoundingClientRect();
      bar.classList.toggle('hide', r.top < window.innerHeight * 0.6 && r.bottom > 0);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ──────────────────────────────────────────── */
  var burger = $('.burger');
  var menu = $('#menu');
  function setMenu(open) {
    if (!burger || !menu) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('open', open);
    if (open && header) header.classList.add('scrolled');
    else onScroll();
  }
  if (burger) {
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    document.addEventListener('click', function (e) {
      if (menu.classList.contains('open') && !menu.contains(e.target) && !burger.contains(e.target)) setMenu(false);
    });
  }

  /* ── Reveal on scroll (and paw trails) ────────────────────── */
  var revealEls = $$('.reveal, .paw-trail');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── Services explorer (ARIA tabs) ────────────────────────── */
  $$('[data-explorer]').forEach(function (root) {
    var tabs = $$('[role="tab"]', root);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (!panel) return;
        panel.hidden = !on;
        panel.classList.remove('show');
        if (on) { void panel.offsetWidth; panel.classList.add('show'); }
      });
      if (focus) tab.focus();
      // keep the chosen tab in view on the horizontal phone scroller
      var list = tab.parentElement;
      if (list && list.scrollWidth > list.clientWidth) {
        list.scrollTo({ left: tab.offsetLeft - 20, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') next = tabs[0];
        if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
  });

  /* "Book this groom" buttons pre-fill the form */
  var serviceSelect = $('#f-service');
  $$('[data-pick]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!serviceSelect) return;
      var want = btn.getAttribute('data-pick');
      $$('option', serviceSelect).forEach(function (o) { if (o.textContent === want) serviceSelect.value = o.value || o.textContent; });
      serviceSelect.closest('.field').classList.remove('invalid');
    });
  });

  /* ── Before / after slider ────────────────────────────────── */
  $$('[data-ba]').forEach(function (ba) {
    var range = $('input[type="range"]', ba);
    function set(v) { ba.style.setProperty('--pos', v + '%'); }
    range.addEventListener('input', function () { set(range.value); });
    // pointer drag anywhere on the image (range input covers it, this smooths touch)
    var dragging = false;
    function fromEvent(e) {
      var r = ba.getBoundingClientRect();
      var pct = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
      range.value = pct; set(pct);
    }
    ba.addEventListener('pointerdown', function (e) { dragging = true; fromEvent(e); });
    window.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e); });
    window.addEventListener('pointerup', function () { dragging = false; });
    set(range.value);

    // a gentle nudge the first time it scrolls into view, so people know it moves
    if ('IntersectionObserver' in window && !reduceMotion) {
      var nudged = false;
      new IntersectionObserver(function (en, obs) {
        if (en[0].isIntersecting && !nudged) {
          nudged = true; obs.disconnect();
          var start = null;
          var step = function (t) {
            if (!start) start = t;
            var p = (t - start) / 1400;
            if (p >= 1 || dragging) { if (!dragging) { range.value = 50; set(50); } return; }
            var v = 50 + Math.sin(p * Math.PI * 2) * 16;
            range.value = v; set(v);
            requestAnimationFrame(step);
          };
          setTimeout(function () { requestAnimationFrame(step); }, 500);
        }
      }, { threshold: 0.6 }).observe(ba);
    }
  });

  /* ── Lightbox (gallery) ───────────────────────────────────── */
  var lb = $('[data-lightbox]');
  var links = $$('[data-gallery] a');
  if (lb && links.length) {
    var img = $('img', lb);
    var cap = $('[data-lb-caption]', lb);
    var idx = 0;
    var lastFocus = null;

    function show(i) {
      idx = (i + links.length) % links.length;
      var a = links[idx];
      var thumb = $('img', a);
      img.classList.add('swap');
      var next = new Image();
      next.onload = next.onerror = function () {
        img.src = a.getAttribute('href');
        img.alt = thumb ? thumb.alt : '';
        cap.textContent = a.getAttribute('data-caption') || '';
        requestAnimationFrame(function () { img.classList.remove('swap'); });
      };
      next.src = a.getAttribute('href');
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      $('[data-lb-close]', lb).focus();
    }
    function close() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }
    links.forEach(function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); open(i); });
    });
    $('[data-lb-close]', lb).addEventListener('click', close);
    $('[data-lb-prev]', lb).addEventListener('click', function () { show(idx - 1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'Tab') { // keep focus inside
        var f = $$('button', lb);
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // swipe
    var sx = null, sy = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      var dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(idx + (dx < 0 ? 1 : -1));
      sx = sy = null;
    });
  }

  /* ── Booking form: inline validation + sending state ──────── */
  $$('[data-form]').forEach(function (form) {
    var checks = {
      name: function (v) { return v.trim().length > 1; },
      phone: function (v) { return /^[0-9+()\s-]{7,}$/.test(v.trim()); },
      email: function (v) { return v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      service: function (v) { return v !== ''; }
    };
    function validate(field) {
      var fn = checks[field.name];
      if (!fn) return true;
      var ok = fn(field.value);
      var wrap = field.closest('.field');
      wrap.classList.toggle('invalid', !ok);
      field.setAttribute('aria-invalid', String(!ok));
      var err = $('.err', wrap);
      if (err) field.setAttribute('aria-describedby', err.id);
      return ok;
    }
    Object.keys(checks).forEach(function (name) {
      var f = form.elements[name];
      if (!f) return;
      f.addEventListener('blur', function () { if (f.value !== '' || f.closest('.field').classList.contains('invalid')) validate(f); });
      f.addEventListener('input', function () { if (f.closest('.field').classList.contains('invalid')) validate(f); });
      f.addEventListener('change', function () { if (f.closest('.field').classList.contains('invalid')) validate(f); });
    });
    form.addEventListener('submit', function (e) {
      var firstBad = null;
      Object.keys(checks).forEach(function (name) {
        var f = form.elements[name];
        if (f && !validate(f) && !firstBad) firstBad = f;
      });
      if (firstBad) { e.preventDefault(); firstBad.focus(); return; }
      var btn = $('button[type="submit"]', form);
      btn.classList.add('sending');
      btn.disabled = true;
    });
  });
})();
