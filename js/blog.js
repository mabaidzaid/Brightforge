/**
 * BRIGHTFORGE: Blog & Single Article JavaScript Logic
 * Category Filter, TOC Scrollspy, Share Copy, and Newsletter
 */

document.addEventListener('DOMContentLoaded', () => {
  initBlogFilter();
  initNewsletterForm();
  initTocScrollspy();
  initShareCopy();
});

/* --------------------------------------------------------------------------
   1. Blog Category Filter (blog.html)
   -------------------------------------------------------------------------- */
function initBlogFilter() {
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const blogCards = document.querySelectorAll('.blog-article-card');
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
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
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
    const inputField = newsletterForm.querySelector('input[type="email"]');
    
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '✓ Subscribed!';
      submitBtn.style.background = '#10B981';
      submitBtn.style.borderColor = '#10B981';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        submitBtn.disabled = false;
        newsletterForm.reset();
      }, 3500);
    }
  });
}

/* --------------------------------------------------------------------------
   3. Table of Contents Scrollspy (blog-single.html)
   -------------------------------------------------------------------------- */
function initTocScrollspy() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const headings = document.querySelectorAll('.article-prose h2[id]');
  if (!tocLinks.length || !headings.length) return;

  // Smooth scroll click
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scrollspy observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tocLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  headings.forEach(heading => observer.observe(heading));
}

/* --------------------------------------------------------------------------
   4. Share Copy Link Toast
   -------------------------------------------------------------------------- */
function initShareCopy() {
  const shareBtn = document.getElementById('shareCopyBtn');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const originalHtml = shareBtn.innerHTML;
      shareBtn.innerHTML = '✓';
      shareBtn.style.background = '#10B981';
      shareBtn.style.color = '#FFFFFF';
      
      setTimeout(() => {
        shareBtn.innerHTML = originalHtml;
        shareBtn.style.background = '';
        shareBtn.style.color = '';
      }, 2000);
    } catch (err) {
      console.warn('Could not copy link', err);
    }
  });
}
