/**
 * BeKnown — Hero JS
 * Editorial reveal sequence on page load
 */

(function () {
  'use strict';

  const lines = document.querySelectorAll('.hero__line');
  const body  = document.querySelector('.hero__body');
  const actions = document.querySelector('.hero__actions');
  const label = document.querySelector('.hero__label');

  // Stagger delays for each headline line
  const lineDelays = [0.1, 0.28, 0.46, 0.64];

  function revealHero() {
    // Label
    if (label) {
      setTimeout(() => {
        label.style.opacity = '1';
        label.style.transition = 'opacity 0.6s ease';
      }, 100);
    }

    // Each headline line
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add('is-visible');
      }, lineDelays[i] * 1000);
    });

    // Body text
    if (body) {
      body.classList.add('is-visible');
    }

    // Actions
    if (actions) {
      actions.classList.add('is-visible');
    }

    // Start drawing hero line after headlines appear
    setTimeout(startHeroLine, 900);
  }

  function startHeroLine() {
    const path = document.getElementById('hero-line-path');
    if (!path) return;

    path.classList.add('is-drawn');
  }

  // Trigger on DOMContentLoaded (fonts may still be loading, that's ok)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealHero);
  } else {
    // Small delay to ensure first paint happened
    setTimeout(revealHero, 50);
  }
})();
