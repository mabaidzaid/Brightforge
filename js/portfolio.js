/**
 * BRIGHTFORGE: Portfolio Interactive Script
 * High-Speed Category Filtering, Interactive Lightbox, Zoom, Fullscreen & Keyboard Nav
 */

document.addEventListener('DOMContentLoaded', () => {
  initPortfolioFilter();
  initPortfolioLightbox();
});

/* --------------------------------------------------------------------------
   1. Portfolio Category Filter
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-bar .filter-pill-btn');
  const cards = document.querySelectorAll('.portfolio-showcase-grid .portfolio-showcase-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;

      const targetCategory = btn.getAttribute('data-filter');

      // Update button active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      let visibleIdx = 0;

      // Filter cards with instant clean grid re-flow and staggered reveal
      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const matches = (targetCategory === 'all' || cardCategory === targetCategory);

        if (matches) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px) scale(0.97)';
          card.style.transition = 'none';

          void card.offsetWidth;

          const delay = visibleIdx * 45;
          visibleIdx++;

          setTimeout(() => {
            card.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, delay);
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px) scale(0.97)';
          card.style.transition = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   2. Next-Gen Portfolio Lightbox Modal
   -------------------------------------------------------------------------- */
function initPortfolioLightbox() {
  const modal = document.getElementById('portfolioLightboxModal');
  const backdrop = document.getElementById('lightboxBackdrop');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');
  const zoomBtn = document.getElementById('lightboxZoomToggleBtn');
  const fullscreenBtn = document.getElementById('lightboxFullscreenBtn');

  const imgEl = document.getElementById('lightboxModalImg');
  const titleEl = document.getElementById('lightboxProjectTitle');
  const descEl = document.getElementById('lightboxProjectDesc');
  const catEl = document.getElementById('lightboxCategoryTag');
  const metricEl = document.getElementById('lightboxMetricBadge');
  const urlEl = document.getElementById('lightboxUrlText');
  const counterCurrent = document.getElementById('lightboxCurrentIdx');
  const counterTotal = document.getElementById('lightboxTotalCount');
  const thumbsStrip = document.getElementById('lightboxThumbsStrip');

  const cards = Array.from(document.querySelectorAll('.portfolio-showcase-card'));
  if (!modal || !cards.length) return;

  let currentIndex = 0;
  let isZoomed = false;

  // Build projects dataset
  const projects = cards.map(card => ({
    title: card.getAttribute('data-title') || 'Project Case Study',
    categoryName: card.getAttribute('data-category-name') || '#Featured Project',
    desc: card.getAttribute('data-desc') || '',
    metric: card.getAttribute('data-metric') || 'Verified Metric',
    img: card.getAttribute('data-img') || '',
    domain: card.getAttribute('data-title') ? card.getAttribute('data-title').toLowerCase().replace(/[^a-z0-9]/g, '') + '.com' : 'brightforge.agency'
  }));

  if (counterTotal) {
    counterTotal.textContent = projects.length;
  }

  // Populate thumbnails
  if (thumbsStrip) {
    thumbsStrip.innerHTML = '';
    projects.forEach((proj, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `lightbox-thumb-item ${idx === 0 ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${proj.img}" alt="${proj.title}">`;
      thumb.addEventListener('click', () => {
        showProject(idx);
      });
      thumbsStrip.appendChild(thumb);
    });
  }

  function showProject(index) {
    if (index < 0) index = projects.length - 1;
    if (index >= projects.length) index = 0;
    currentIndex = index;

    const proj = projects[currentIndex];
    if (imgEl) imgEl.src = proj.img;
    if (titleEl) titleEl.textContent = proj.title;
    if (descEl) descEl.textContent = proj.desc;
    if (catEl) catEl.textContent = proj.categoryName;
    if (metricEl) metricEl.textContent = proj.metric;
    if (urlEl) urlEl.textContent = proj.domain;
    if (counterCurrent) counterCurrent.textContent = currentIndex + 1;

    // Update active thumb
    if (thumbsStrip) {
      const thumbs = thumbsStrip.querySelectorAll('.lightbox-thumb-item');
      thumbs.forEach((t, i) => {
        t.classList.toggle('active', i === currentIndex);
      });
    }

    // Reset zoom
    isZoomed = false;
    if (imgEl) {
      imgEl.style.transform = 'scale(1)';
      imgEl.style.cursor = 'zoom-in';
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
  }

  // Attach card click handlers
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showProject(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showProject(currentIndex + 1));

  // Zoom toggle
  if (zoomBtn && imgEl) {
    zoomBtn.addEventListener('click', () => {
      isZoomed = !isZoomed;
      imgEl.style.transform = isZoomed ? 'scale(1.5)' : 'scale(1)';
      imgEl.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';
    });

    imgEl.addEventListener('click', () => {
      isZoomed = !isZoomed;
      imgEl.style.transform = isZoomed ? 'scale(1.5)' : 'scale(1)';
      imgEl.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';
    });
  }

  // Fullscreen toggle
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showProject(currentIndex - 1);
    if (e.key === 'ArrowRight') showProject(currentIndex + 1);
  });
}
