/**
 * CELWORKS: Blog Page Scripts
 * Category Filter and Newsletter Subscription
 */

document.addEventListener('DOMContentLoaded', () => {
  initBlogFilter();
  initNewsletterForm();
});

/* --------------------------------------------------------------------------
   1. Blog Category Filter
   -------------------------------------------------------------------------- */
function initBlogFilter() {
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  if (!filterBtns.length || !blogCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   2. Newsletter Form Handling
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const newsletterForm = document.querySelector('#newsletter-form');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Subscribed';
      submitBtn.disabled = true;
    }
    newsletterForm.reset();
  });
}
