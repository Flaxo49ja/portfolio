(function () {
  'use strict';

  // ---- project filters ----
  var filters = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('.card');

  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      var wanted = button.getAttribute('data-filter');

      filters.forEach(function (b) {
        b.classList.toggle('is-active', b === button);
        b.setAttribute('aria-pressed', b === button ? 'true' : 'false');
      });

      cards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').split(/\s+/);
        var show = wanted === 'all' || tags.indexOf(wanted) !== -1;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  // ---- scroll reveal ----
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 45 + 'ms';
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---- footer year ----
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
