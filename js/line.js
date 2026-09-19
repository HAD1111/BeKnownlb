/**
 * BeKnown — SVG Flowing Line
 * Draws a continuous organic path across the page
 * Uses IntersectionObserver to animate progressively
 */

(function () {
  'use strict';

  // Draw an SVG path progressively as a section enters the viewport
  function animatePath(pathEl) {
    if (!pathEl) return;

    const length = pathEl.getTotalLength ? pathEl.getTotalLength() : 800;
    pathEl.style.strokeDasharray  = length;
    pathEl.style.strokeDashoffset = length;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pathEl.style.transition = 'stroke-dashoffset 2.5s cubic-bezier(0.16, 1, 0.3, 1)';
          pathEl.style.strokeDashoffset = '0';
          observer.unobserve(pathEl);
        }
      });
    }, { threshold: 0.1 });

    const container = pathEl.closest('svg') || pathEl;
    observer.observe(container);
  }

  // Initialise all path elements
  function init() {
    const paths = document.querySelectorAll('[data-line-path]');
    paths.forEach(animatePath);

    // Hero line (immediate trigger after hero reveal)
    const heroPath = document.getElementById('hero-line-path');
    if (heroPath) animatePath(heroPath);
  }

  // Also wire up the "why" word highlights
  function initWhyWords() {
    const words = document.querySelectorAll('.why__word');
    if (!words.length) return;

    let index = 0;
    function lightNext() {
      words.forEach(w => w.classList.remove('is-lit'));
      words[index].classList.add('is-lit');
      index = (index + 1) % words.length;
    }

    // Only run when section is visible
    const whySection = document.querySelector('.why');
    if (!whySection) return;

    let interval = null;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !interval) {
          lightNext();
          interval = setInterval(lightNext, 1800);
        } else if (!entry.isIntersecting && interval) {
          clearInterval(interval);
          interval = null;
        }
      });
    }, { threshold: 0.3 });

    obs.observe(whySection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { init(); initWhyWords(); });
  } else {
    init();
    initWhyWords();
  }
})();
