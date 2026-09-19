/**
 * BeKnown — Sections JS
 * IntersectionObserver-based reveal for all mid-page sections
 */

(function () {
  'use strict';

  // ── Generic reveal observer ─────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── Stagger groups ───────────────────────────────────────────
  const staggerEls = document.querySelectorAll('[data-stagger]');

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  staggerEls.forEach(el => staggerObserver.observe(el));

  // ── Process steps — activate on scroll ───────────────────────
  const steps = document.querySelectorAll('.process-step');

  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-active', entry.isIntersecting);
    });
  }, { threshold: 0.6 });

  steps.forEach(step => stepObserver.observe(step));

  // ── Stage items — add reveal class on scroll ─────────────────
  const stages = document.querySelectorAll('.stage');

  const stageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        stageObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  stages.forEach((stage, i) => {
    const dir = i % 2 === 0 ? '-24px' : '24px';
    stage.style.opacity = '0';
    stage.style.transform = `translateX(${dir})`;
    stage.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`;
    stageObserver.observe(stage);
  });

  // ── Service items hover — no JS needed, handled by CSS ───────

  // ── Platform screen iframe — lazy load ────────────────────────
  const platformIframe = document.querySelector('.platform__screen-iframe');
  if (platformIframe) {
    const platformSection = document.querySelector('.platform');
    const iframeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const src = platformIframe.getAttribute('data-src');
          if (src) platformIframe.src = src;
          iframeObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px 0px' });

    if (platformSection) iframeObserver.observe(platformSection);
  }

  // ── Project iframes — lazy load ──────────────────────────────
  const projectIframes = document.querySelectorAll('.project__iframe-wrap iframe');
  projectIframes.forEach(iframe => {
    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const src = iframe.getAttribute('data-src');
          if (src) iframe.src = src;
          projectObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '150px 0px' });
    projectObserver.observe(iframe);
  });
})();
