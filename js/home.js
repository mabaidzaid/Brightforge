/**
 * CELWORKS: Homepage Interactive Scripts
 * Dynamic Cinematic Animation Canvas, Viewfinder HUD, Layer Switcher, and Waveform Timeline Scrubber
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initHeroHud();
  initTimelineScrubber();
  initVideoModal();
});

/* --------------------------------------------------------------------------
   1. Interactive Cinematic Animation Canvas Engine
   -------------------------------------------------------------------------- */
let currentVisualMode = 'arcs'; // 'arcs', 'grade', 'cel'

function initHeroCanvas() {
  const canvas = document.getElementById('hero-animation-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width = 0;
  let height = 0;

  // Mouse tracking with smoothing
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false };

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    if (!mouse.isHovering) {
      mouse.x = width * 0.65;
      mouse.y = height * 0.45;
      mouse.targetX = mouse.x;
      mouse.targetY = mouse.y;
    }
  }

  window.addEventListener('resize', resize);
  resize();

  const heroFrame = document.getElementById('hero-frame');
  if (heroFrame) {
    heroFrame.addEventListener('mousemove', (e) => {
      const rect = heroFrame.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovering = true;
    });

    heroFrame.addEventListener('mouseleave', () => {
      mouse.isHovering = false;
      mouse.targetX = width * 0.65;
      mouse.targetY = height * 0.45;
    });
  }

  // Animation entities
  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * (width || 1200),
    y: Math.random() * (height || 700),
    size: Math.random() * 2 + 0.8,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.6 + 0.2,
    color: Math.random() > 0.5 ? '#E2A33D' : '#2E8F86'
  }));

  let time = 0;

  function render() {
    time += 0.016;

    // Smooth mouse interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    ctx.clearRect(0, 0, width, height);

    // Render based on active visual mode
    if (currentVisualMode === 'arcs') {
      renderMotionArcs(ctx, width, height, time, mouse);
    } else if (currentVisualMode === 'grade') {
      renderColorGradeGels(ctx, width, height, time, mouse);
    } else if (currentVisualMode === 'cel') {
      renderTraditionalCels(ctx, width, height, time, mouse);
    }

    // Render floating studio particles
    renderParticles(ctx, particles, width, height);

    animationFrameId = requestAnimationFrame(render);
  }

  render();
}

/* --- Render Mode 1: Vector Motion Arcs / 3D Camera Splines --- */
function renderMotionArcs(ctx, width, height, time, mouse) {
  // Draw primary motion curve
  ctx.save();
  ctx.lineWidth = 2.5;

  // Amber Arc with gradient
  const grad1 = ctx.createLinearGradient(width * 0.2, 0, width * 0.9, height);
  grad1.addColorStop(0, 'rgba(226, 163, 61, 0.9)');
  grad1.addColorStop(1, 'rgba(226, 163, 61, 0.1)');

  ctx.strokeStyle = grad1;
  ctx.beginPath();
  const cp1x = width * 0.35 + Math.sin(time * 0.8) * 60 + (mouse.x - width * 0.5) * 0.15;
  const cp1y = height * 0.15 + Math.cos(time * 0.6) * 40 + (mouse.y - height * 0.5) * 0.15;
  const cp2x = width * 0.75 + Math.cos(time * 0.7) * 70;
  const cp2y = height * 0.85 + Math.sin(time * 0.9) * 50;

  ctx.moveTo(width * 0.15, height * 0.7);
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width * 0.95, height * 0.25);
  ctx.stroke();

  // Secondary Teal Spline
  ctx.strokeStyle = 'rgba(46, 143, 134, 0.75)';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(width * 0.3, height * 0.9);
  ctx.bezierCurveTo(
    width * 0.55 + Math.cos(time * 0.9) * 50,
    height * 0.3 + Math.sin(time * 0.7) * 60,
    width * 0.7 + (mouse.x - width * 0.5) * 0.1,
    height * 0.6,
    width * 0.92,
    height * 0.45
  );
  ctx.stroke();

  // Keyframe Diamonds traveling on motion spline
  const tNorm = (time * 0.25) % 1;
  const kfX = (1 - tNorm) * (1 - tNorm) * (width * 0.15) + 2 * (1 - tNorm) * tNorm * cp1x + tNorm * tNorm * (width * 0.95);
  const kfY = (1 - tNorm) * (1 - tNorm) * (height * 0.7) + 2 * (1 - tNorm) * tNorm * cp1y + tNorm * tNorm * (height * 0.25);

  ctx.save();
  ctx.translate(kfX, kfY);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = '#ECEFEE';
  ctx.shadowColor = '#E2A33D';
  ctx.shadowBlur = 12;
  ctx.fillRect(-6, -6, 12, 12);
  ctx.restore();

  // Draw Kinetic Aperture / Camera Iris Shape at mouse focus
  ctx.save();
  ctx.translate(mouse.x, mouse.y);
  ctx.rotate(time * 0.5);
  ctx.strokeStyle = 'rgba(226, 163, 61, 0.4)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 6; i++) {
    ctx.rotate((Math.PI * 2) / 6);
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.lineTo(60, 60);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(0, 0, 40, 0, Math.PI * 2);
  ctx.setLineDash([4, 6]);
  ctx.strokeStyle = 'rgba(46, 143, 134, 0.5)';
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

/* --- Render Mode 2: Color Grade Gels (Volumetric Beams) --- */
function renderColorGradeGels(ctx, width, height, time, mouse) {
  ctx.save();

  // Tungsten Amber Spotlight Cone
  const amberGlow = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, width * 0.5);
  amberGlow.addColorStop(0, 'rgba(226, 163, 61, 0.45)');
  amberGlow.addColorStop(0.5, 'rgba(226, 163, 61, 0.12)');
  amberGlow.addColorStop(1, 'rgba(226, 163, 61, 0)');
  ctx.fillStyle = amberGlow;
  ctx.fillRect(0, 0, width, height);

  // Daylight Teal Rim Light
  const tealGlow = ctx.createRadialGradient(width * 0.85, height * 0.3, 20, width * 0.85, height * 0.3, width * 0.4);
  tealGlow.addColorStop(0, 'rgba(46, 143, 134, 0.5)');
  tealGlow.addColorStop(0.6, 'rgba(46, 143, 134, 0.1)');
  tealGlow.addColorStop(1, 'rgba(46, 143, 134, 0)');
  ctx.fillStyle = tealGlow;
  ctx.fillRect(0, 0, width, height);

  // Anamorphic Horizontal Lens Flare Sweep
  ctx.strokeStyle = 'rgba(226, 163, 61, 0.65)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, mouse.y);
  ctx.lineTo(width, mouse.y);
  ctx.shadowColor = '#E2A33D';
  ctx.shadowBlur = 16;
  ctx.stroke();

  ctx.restore();
}

/* --- Render Mode 3: Traditional Acetate Cels & Drafting Grid --- */
function renderTraditionalCels(ctx, width, height, time, mouse) {
  ctx.save();

  // Drafting Lightbox Grid Lines
  ctx.strokeStyle = 'rgba(216, 211, 200, 0.08)';
  ctx.lineWidth = 1;
  const gridSize = 60;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Hand-drawn Cel Orbitals
  ctx.strokeStyle = 'rgba(226, 163, 61, 0.8)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  const radius = 100 + Math.sin(time * 2) * 10;
  ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 1.5);
  ctx.stroke();

  // Registration Pegs / Sprocket Holes
  ctx.fillStyle = 'rgba(46, 143, 134, 0.6)';
  ctx.fillRect(width * 0.5 - 20, 20, 40, 10);
  ctx.fillRect(width * 0.25 - 10, 20, 20, 10);
  ctx.fillRect(width * 0.75 - 10, 20, 20, 10);

  ctx.restore();
}

/* --- Floating Studio Dust Particles --- */
function renderParticles(ctx, particles, width, height) {
  ctx.save();
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

/* --------------------------------------------------------------------------
   2. Viewfinder HUD & Layer Mode Controls
   -------------------------------------------------------------------------- */
function initHeroHud() {
  const layerButtons = document.querySelectorAll('.hud-layer-btn');
  const reticle = document.querySelector('.hud-focus-reticle');
  const heroFrame = document.getElementById('hero-frame');

  layerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      layerButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentVisualMode = btn.getAttribute('data-mode') || 'arcs';
    });
  });

  if (heroFrame && reticle) {
    heroFrame.addEventListener('mousemove', (e) => {
      const rect = heroFrame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      reticle.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      reticle.style.opacity = '0.85';
    });

    heroFrame.addEventListener('mouseleave', () => {
      reticle.style.opacity = '0.35';
    });
  }
}

/* --------------------------------------------------------------------------
   3. Timeline Scrubber & Live JetBrains Mono Timecode
   -------------------------------------------------------------------------- */
function initTimelineScrubber() {
  const progressBar = document.querySelector('.timeline-progress-bar');
  const playhead = document.querySelector('.timeline-playhead');
  const timecodeEl = document.querySelector('.timeline-timecode');
  const track = document.querySelector('.timeline-track');
  const keyframes = document.querySelectorAll('.keyframe-diamond');

  if (!progressBar || !playhead || !timecodeEl) return;

  let baseSeconds = 84; // 00:01:24
  let frames = 12;
  const fps = 24;

  // Real-time timecode ticker at 24fps
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

  // Sync scrubber progress bar with page scroll
  const updateScrubberOnScroll = () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollTotal <= 0) return;
    const progress = Math.min(Math.max((window.scrollY / scrollTotal) * 100, 0), 100);
    progressBar.style.width = `${progress}%`;
    playhead.style.left = `${progress}%`;
  };

  window.addEventListener('scroll', updateScrubberOnScroll, { passive: true });

  // Interactive scrubbing click on track
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

  // Keyframe diamond clicks
  keyframes.forEach((kf, idx) => {
    kf.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetPercent = idx === 0 ? 0.25 : idx === 1 ? 0.55 : 0.8;
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: scrollTotal * targetPercent,
        behavior: 'smooth'
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Video Reel Modal with YouTube Playback Management
   -------------------------------------------------------------------------- */
function initVideoModal() {
  const watchButtons = document.querySelectorAll('[data-action="watch-reel"]');
  const modal = document.querySelector('.video-modal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const iframe = document.getElementById('reel-youtube-iframe');
  const videoSrc = 'https://www.youtube.com/embed/T_qT_NWyPEU?autoplay=1&enablejsapi=1&rel=0';

  if (!modal) return;

  const openModal = () => {
    if (iframe) {
      iframe.src = videoSrc;
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (iframe) {
      iframe.src = '';
    }
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
