/**
 * E2 Software Factory – Navigation
 * Smooth scroll + mobile menu
 */
(function () {
  'use strict';

  const menuBtn    = document.getElementById('menu-toggle');
  const mobileNav  = document.getElementById('mobile-nav');
  const closeBtn   = document.getElementById('mobile-nav-close');
  const allLinks   = document.querySelectorAll('[data-scroll]');

  /* --- Mobile menu --- */
  function openMenu() {
    mobileNav.classList.add('mobile-nav--open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileNav.classList.remove('mobile-nav--open');
    document.body.style.overflow = '';
  }

  if (menuBtn)  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  /* --- Smooth scroll (all [data-scroll] links) --- */
  allLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        closeMenu();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Active link highlight on scroll --- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.site-header__nav-link');

  function updateActiveLink() {
    var scrollY = window.scrollY + 100;
    sections.forEach(function (sec) {
      var top    = sec.offsetTop;
      var height = sec.offsetHeight;
      var id     = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (l) {
          l.classList.remove('site-header__nav-link--active');
          if (l.getAttribute('href') === '#' + id) {
            l.classList.add('site-header__nav-link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();
