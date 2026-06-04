/**
 * E2 Software Factory – FAQ Accordion
 */
(function () {
  'use strict';

  var faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq__question');
    var wrapper = item.querySelector('.faq__answer-wrapper');

    if (!question || !wrapper) return;

    question.addEventListener('click', function () {
      var isActive = item.classList.contains('is-active');

      // Close all
      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove('is-active');
        var otherWrapper = otherItem.querySelector('.faq__answer-wrapper');
        if (otherWrapper) {
          otherWrapper.style.maxHeight = null;
        }
        var otherBtn = otherItem.querySelector('.faq__question');
        if (otherBtn) {
          otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add('is-active');
        wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
