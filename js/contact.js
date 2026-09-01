/**
 * BRIGHTFORGE: Contact Page Scripts
 * FAQ Accordion and Project Inquiry Form Submission
 */

document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const headerBtn = item.querySelector('.faq-header-btn');
    if (!headerBtn) return;

    headerBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const btn = otherItem.querySelector('.faq-header-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
        headerBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        headerBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. Project Inquiry Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.querySelector('#project-inquiry-form');
  if (!contactForm) return;

  // Preselect package/service from URL parameter if present
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service') || urlParams.get('package');
  if (serviceParam) {
    const selectEl = document.querySelector('#contact-service');
    if (selectEl) {
      for (let option of selectEl.options) {
        if (option.value === serviceParam) {
          option.selected = true;
          break;
        }
      }
    }
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Project started. We will reach out within 1 business day.';
      submitBtn.classList.add('btn-teal');
      submitBtn.disabled = true;
    }
    contactForm.reset();
  });
}
