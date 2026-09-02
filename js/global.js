/**
 * BRIGHTFORGE: Global Scripts
 * Theme Toggle, Header Scroll Elevation, Mobile Navigation Drawer,
 * Scroll Reveal Engine, Dynamic Stats Counter, and Interactive Background Parallax
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeader();
  initMobileNav();
  initScrollReveal();
  initStatsCounter();
  initParallaxAccents();
  initPortfolioShowcase();
  initApproachAccordion();
  initCultureSlider();
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
   2. Sticky Header Elevation with Smooth Hysteresis Threshold
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let isScrolled = false;
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (!isScrolled && scrollY > 60) {
      isScrolled = true;
      header.classList.add('scrolled');
    } else if (isScrolled && scrollY <= 20) {
      isScrolled = false;
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
   4. Bidirectional Scroll Reveal Engine (Works Forward & Reverse)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.service-card, .bento-card-primary, .bento-card-grey, .bento-card-stats, ' +
    '.stat-bento-item, .ticket-stub-card, .clapperboard-slate, .contact-sheet-tile, ' +
    '.process-step-card, .blog-card, .section-header, .direct-info-card, .faq-item, .reveal'
  );

  if (!revealElements.length) return;

  // Add base reveal class
  revealElements.forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -20px 0px',
    threshold: [0, 0.15]
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      } else {
        // Reverse scrolling: Remove class when element exits the viewport
        const rect = entry.boundingClientRect;
        if (rect.top > window.innerHeight || rect.bottom < 0) {
          entry.target.classList.remove('revealed');
        }
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   5. Dynamic Bidirectional Stats Counter Animation
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number-display, .stats-count');
  if (!statNumbers.length) return;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        if (el.dataset.animating === 'true') return;
        el.dataset.animating = 'true';

        // Store original text
        if (!el.dataset.originalText) {
          el.dataset.originalText = el.innerText.trim();
        }
        const text = el.dataset.originalText;

        let targetNum = 0;
        let suffix = '';
        let prefix = '';

        if (text.includes('8,000+')) {
          targetNum = 8000;
          suffix = '+';
        } else if (text.includes('8K+')) {
          targetNum = 8;
          suffix = 'K+';
        } else if (text.includes('98%')) {
          targetNum = 98;
          suffix = '%';
        } else if (text.includes('4+')) {
          targetNum = 4;
          suffix = '+';
        } else if (text.includes('15+')) {
          targetNum = 15;
          suffix = '+';
        } else if (text.includes('250+')) {
          targetNum = 250;
          suffix = '+';
        } else {
          const match = text.match(/([^\d]*)([\d,]+)(.*)/);
          if (match) {
            prefix = match[1] || '';
            targetNum = parseInt(match[2].replace(/,/g, ''), 10) || 0;
            suffix = match[3] || '';
          }
        }

        if (targetNum > 0) {
          animateValue(el, 0, targetNum, 1200, prefix, suffix, () => {
            el.dataset.animating = 'false';
          });
        }
      } else {
        // Reset when scrolled far away for reverse animation
        const rect = entry.boundingClientRect;
        if (rect.top > window.innerHeight + 100 || rect.bottom < -100) {
          el.dataset.animating = 'false';
        }
      }
    });
  }, { threshold: 0.15 });

  statNumbers.forEach(el => countObserver.observe(el));
}

function animateValue(el, start, end, duration, prefix, suffix, onComplete) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth ease-out exponential curve
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(start + (end - start) * easeProgress);

    const formattedVal = end >= 1000 ? currentVal.toLocaleString() : currentVal;
    el.innerText = `${prefix}${formattedVal}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      const finalFormatted = end >= 1000 ? end.toLocaleString() : end;
      el.innerText = `${prefix}${finalFormatted}${suffix}`;
      if (typeof onComplete === 'function') onComplete();
    }
  }

  requestAnimationFrame(update);
}

/* --------------------------------------------------------------------------
   6. 3D Card Perspective Tilt & Spotlight Glare Engine (Zero-Lag)
   -------------------------------------------------------------------------- */
function initParallaxAccents() {
  // Check if device supports fine hover (desktop/laptop)
  const isHoverDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // 1. Hero floating accent subtle parallax
  const heroSection = document.querySelector('.hero-section');
  if (heroSection && isHoverDevice) {
    const accents = heroSection.querySelectorAll('.floating-accent, .hero-ambient-glow');
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 28;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 28;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    function renderParallax() {
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      accents.forEach((el, i) => {
        const factor = (i % 3 + 1) * 0.4;
        el.style.transform = `translate3d(${mouseX * factor}px, ${mouseY * factor}px, 0)`;
      });

      requestAnimationFrame(renderParallax);
    }

    renderParallax();
  }

  // 2. High-Performance 3D Perspective Tilt for Cards
  if (!isHoverDevice) return;

  const tiltCards = document.querySelectorAll(
    '.service-card, .bento-card-primary, .bento-card-grey, .bento-card-stats, ' +
    '.ticket-stub-card, .contact-sheet-tile, .process-step-card, .blog-card, .hero-showcase-card'
  );

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate percentage for spotlight gradient
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${percentX.toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${percentY.toFixed(1)}%`);

      // Gentle 3D perspective rotation (max 4.5 deg for subtle luxury tech feel)
      const rotateY = ((x / rect.width) - 0.5) * 9;
      const rotateX = -((y / rect.height) - 0.5) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });
  });
}

/* --------------------------------------------------------------------------
   7. Next-Gen Portfolio Filter Engine & Interactive Lightbox Carousel
   -------------------------------------------------------------------------- */
function initPortfolioShowcase() {
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const portfolioCards = Array.from(document.querySelectorAll('.portfolio-showcase-card'));
  const modal = document.getElementById('portfolioLightboxModal');
  if (!portfolioCards.length) return;

  // 1. Tab Filtering - Instant Clean Grid Re-flow & Staggered Reveal
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      let visibleIdx = 0;

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const matches = (filter === 'all' || category === filter);

        if (matches) {
          // Immediately show in DOM at the correct grid position
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px) scale(0.97)';
          card.style.transition = 'none';

          // Force reflow
          void card.offsetWidth;

          // Staggered entrance animation
          const delay = visibleIdx * 45;
          visibleIdx++;

          setTimeout(() => {
            card.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, delay);
        } else {
          // Instantly remove from layout flow so matching cards populate the grid cleanly
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px) scale(0.97)';
          card.style.transition = 'none';
        }
      });
    });
  });

  // 2. Interactive Lightbox Carousel Modal Engine
  if (!modal) return;

  const modalImg = document.getElementById('lightboxModalImg');
  const currentIdxEl = document.getElementById('lightboxCurrentIdx');
  const totalCountEl = document.getElementById('lightboxTotalCount');
  const projectTitle = document.getElementById('lightboxProjectTitle');
  const projectDesc = document.getElementById('lightboxProjectDesc');
  const categoryTag = document.getElementById('lightboxCategoryTag');
  const metricBadge = document.getElementById('lightboxMetricBadge');
  const urlText = document.getElementById('lightboxUrlText');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const backdrop = document.getElementById('lightboxBackdrop');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');
  const zoomBtn = document.getElementById('lightboxZoomToggleBtn');
  const fullscreenBtn = document.getElementById('lightboxFullscreenBtn');
  const thumbsStrip = document.getElementById('lightboxThumbsStrip');
  const imgViewport = document.getElementById('lightboxImgViewport');

  let currentProjectIndex = 0;
  const totalProjects = portfolioCards.length;

  if (totalCountEl) totalCountEl.textContent = totalProjects;

  // Build bottom thumbnails once
  if (thumbsStrip && !thumbsStrip.children.length) {
    portfolioCards.forEach((card, idx) => {
      const thumbSrc = card.getAttribute('data-img');
      const thumbTitle = card.getAttribute('data-title') || `Project ${idx + 1}`;
      const btn = document.createElement('button');
      btn.className = `lightbox-thumb-btn ${idx === 0 ? 'active' : ''}`;
      btn.setAttribute('aria-label', `Jump to ${thumbTitle}`);
      btn.innerHTML = `<img src="${thumbSrc}" alt="${thumbTitle}" loading="lazy">`;
      btn.addEventListener('click', () => {
        showProject(idx);
      });
      thumbsStrip.appendChild(btn);
    });
  }

  function showProject(index) {
    if (index < 0) index = totalProjects - 1;
    if (index >= totalProjects) index = 0;
    currentProjectIndex = index;

    const card = portfolioCards[currentProjectIndex];
    const imgSrc = card.getAttribute('data-img');
    const title = card.getAttribute('data-title') || 'Client Project';
    const desc = card.getAttribute('data-desc') || 'Custom digital solution delivered by Brightforge.';
    const cat = card.getAttribute('data-category-name') || '#Web & Digital';
    const metric = card.getAttribute('data-metric') || '';

    // Reset Zoom and scroll position
    if (modalImg) {
      modalImg.classList.remove('zoomed');
      modalImg.style.opacity = '0.3';
      modalImg.src = imgSrc;
      modalImg.alt = title;
      setTimeout(() => {
        modalImg.style.opacity = '1';
      }, 150);
    }
    if (imgViewport) imgViewport.scrollTop = 0;

    if (currentIdxEl) currentIdxEl.textContent = currentProjectIndex + 1;
    if (projectTitle) projectTitle.textContent = title;
    if (projectDesc) projectDesc.textContent = desc;
    if (categoryTag) categoryTag.textContent = cat;
    if (urlText) {
      const cleanSlug = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      urlText.textContent = `brightforge.agency/case-study/${cleanSlug}`;
    }

    if (metricBadge) {
      if (metric) {
        metricBadge.textContent = metric;
        metricBadge.style.display = '';
      } else {
        metricBadge.style.display = 'none';
      }
    }

    // Sync Thumbnails Active State
    if (thumbsStrip) {
      const thumbBtns = thumbsStrip.querySelectorAll('.lightbox-thumb-btn');
      thumbBtns.forEach((tb, i) => {
        if (i === currentProjectIndex) {
          tb.classList.add('active');
          tb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          tb.classList.remove('active');
        }
      });
    }
  }

  function openLightbox(index) {
    showProject(index);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }

  portfolioCards.forEach((card, idx) => {
    card.addEventListener('click', () => openLightbox(idx));
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showProject(currentProjectIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showProject(currentProjectIndex + 1);
    });
  }

  if (zoomBtn && modalImg) {
    zoomBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      modalImg.classList.toggle('zoomed');
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showProject(currentProjectIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showProject(currentProjectIndex + 1);
    }
  });
}

/* --------------------------------------------------------------------------
   8. Interactive Approach Showcase Accordion
   -------------------------------------------------------------------------- */
function initApproachAccordion() {
  const accordion = document.getElementById('approachAccordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.approach-item');
  items.forEach(item => {
    const header = item.querySelector('.approach-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items
      items.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherHeader = otherItem.querySelector('.approach-header');
        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Interactive Culture / Process Slider
   -------------------------------------------------------------------------- */
function initCultureSlider() {
  const prevBtn = document.getElementById('cultureNavPrev');
  const nextBtn = document.getElementById('cultureNavNext');
  const activeImg = document.getElementById('cultureActiveImg');
  const prevImg = document.getElementById('culturePrevImg');
  const nextImg = document.getElementById('cultureNextImg');
  const activeTitle = document.getElementById('cultureActiveTitle');
  const bottomCaption = document.getElementById('cultureBottomCaption');

  if (!prevBtn || !nextBtn || !activeImg) return;

  const slides = [
    {
      img: 'img/about_culture_discussion.jpg',
      title: 'Discussion of the idea',
      caption: 'We strive to develop real-world web solutions that are ideal for small to large projects with bespoke requirements.'
    },
    {
      img: 'img/about_culture_dev.jpg',
      title: 'Precision code architecture',
      caption: 'Clean semantic engineering and sub-second performance benchmarks tested across all device viewports.'
    },
    {
      img: 'img/about_culture_studio.jpg',
      title: 'Full-funnel execution & launch',
      caption: 'Collaborative strategy sprints and continuous performance iterations to scale your brand online.'
    }
  ];

  let currentIndex = 0;

  function updateSlides(index) {
    currentIndex = (index + slides.length) % slides.length;
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    const nextIndex = (currentIndex + 1) % slides.length;

    if (activeImg) {
      activeImg.style.opacity = '0';
      setTimeout(() => {
        activeImg.src = slides[currentIndex].img;
        activeImg.alt = slides[currentIndex].title;
        activeImg.style.opacity = '1';
      }, 200);
    }

    if (prevImg) prevImg.src = slides[prevIndex].img;
    if (nextImg) nextImg.src = slides[nextIndex].img;

    if (activeTitle) {
      activeTitle.style.opacity = '0';
      setTimeout(() => {
        activeTitle.textContent = slides[currentIndex].title;
        activeTitle.style.opacity = '1';
      }, 200);
    }

    if (bottomCaption) {
      bottomCaption.style.opacity = '0';
      setTimeout(() => {
        bottomCaption.textContent = slides[currentIndex].caption;
        bottomCaption.style.opacity = '1';
      }, 200);
    }
  }

  prevBtn.addEventListener('click', () => updateSlides(currentIndex - 1));
  nextBtn.addEventListener('click', () => updateSlides(currentIndex + 1));
}

