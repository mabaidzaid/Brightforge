/**
 * BRIGHTFORGE Studio Scripts
 * Interactive Timeline, Theme Switcher, Navigation, FAQ, and Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeader();
  initMobileNav();
  initTimelineScrubber();
  initVideoModal();
  initFaqAccordion();
  initBlogFilter();
  initFormHandling();
});

/* --------------------------------------------------------------------------
   1. Theme Switcher (Default: Light Theme Priority)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('brightforge-theme');

  // Default to light theme if not stored
  const initialTheme = storedTheme || 'light';
  applyTheme(initialTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('brightforge-theme', newTheme);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  themeToggleBtns.forEach(btn => {
    btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    btn.setAttribute('title', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  });
}

/* --------------------------------------------------------------------------
   2. Sticky Header Elevation
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  if (!hamburgerBtn || !mobileDrawer) return;

  const toggleDrawer = () => {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      mobileDrawer.classList.add('open');
      hamburgerBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  hamburgerBtn.addEventListener('click', toggleDrawer);

  // Close drawer when clicking an anchor or link
  const drawerLinks = mobileDrawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* --------------------------------------------------------------------------
   4. Timeline Scrubber & Live Timecode (JetBrains Mono)
   -------------------------------------------------------------------------- */
function initTimelineScrubber() {
  const scrubber = document.querySelector('.hero-timeline-scrubber');
  const progressBar = document.querySelector('.timeline-progress-bar');
  const playhead = document.querySelector('.timeline-playhead');
  const timecodeEl = document.querySelector('.timeline-timecode');
  const track = document.querySelector('.timeline-track');

  if (!scrubber || !progressBar || !playhead || !timecodeEl) return;

  let baseSeconds = 84; // 00:01:24
  let frames = 12;
  const fps = 24;

  // Real-time timecode ticker
  setInterval(() => {
    frames++;
    if (frames >= fps) {
      frames = 0;
      baseSeconds++;
    }
    const hrs = String(Math.floor(baseSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((baseSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(baseSeconds % 60).padStart(2, '0');
    const frms = String(frames).padStart(2, '0');
    timecodeEl.textContent = `${hrs}:${mins}:${secs}:${frms}`;
  }, 1000 / fps);

  // Sync scrubber with window scroll
  const updateScrubberOnScroll = () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollTotal <= 0) return;
    const progress = Math.min(Math.max((window.scrollY / scrollTotal) * 100, 0), 100);
    progressBar.style.width = `${progress}%`;
    playhead.style.left = `${progress}%`;
  };

  window.addEventListener('scroll', updateScrubberOnScroll, { passive: true });

  // Interactive scrubbing click
  if (track) {
    track.addEventListener('click', (e) => {
      const rect = track.getBoundingClientRect();
      const clickPos = (e.clientX - rect.left) / rect.width;
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: scrollTotal * clickPos,
        behavior: 'smooth'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. Video Reel Modal
   -------------------------------------------------------------------------- */
function initVideoModal() {
  const watchButtons = document.querySelectorAll('[data-action="watch-reel"]');
  const modal = document.querySelector('.video-modal');
  const closeBtn = document.querySelector('.modal-close-btn');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  watchButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. FAQ Accordion (Contact Page)
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
   7. Blog Filter
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
   8. Form Handling (Active Voice Feedback)
   -------------------------------------------------------------------------- */
function initFormHandling() {
  const contactForm = document.querySelector('#project-inquiry-form');
  const newsletterForm = document.querySelector('#newsletter-form');

  if (contactForm) {
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

  if (newsletterForm) {
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
}
