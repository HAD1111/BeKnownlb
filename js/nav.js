/**
 * BeKnown — Navigation JS
 * Scroll state, mobile drawer, active link
 */

(function () {
  'use strict';

  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const drawer = document.querySelector('.nav__mobile-drawer');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');

  // ── Scroll state ──────────────────────────────────────────
  let lastScroll = 0;
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }

  function updateNav() {
    const scrollY = window.scrollY;

    // Add scrolled class
    if (scrollY > 60) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }

    lastScroll = scrollY;
    ticking = false;
  }

  // ── Mobile drawer ─────────────────────────────────────────
  function toggleDrawer() {
    const isOpen = drawer.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Mobile link clicks close drawer
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ── Scroll progress indicator ──────────────────────────────
  const progressBar = document.querySelector('.scroll-progress');

  function updateProgress() {
    if (!progressBar) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  }

  // ── Event listeners ───────────────────────────────────────
  if (hamburger) hamburger.addEventListener('click', toggleDrawer);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('scroll', updateProgress, { passive: true });

  // Initial call
  updateNav();
  updateProgress();
})();
