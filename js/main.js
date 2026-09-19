/**
 * BeKnown — Main JS
 * Entry point — wires everything together
 */

(function () {
  'use strict';

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Contact form (if exists)
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Placeholder — wire to backend when ready
      const btn = form.querySelector('[type="submit"]');
      if (btn) {
        btn.textContent = 'Sent ✓';
        btn.disabled = true;
      }
    });
  }
})();
