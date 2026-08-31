/**
 * CELWORKS: Global Scripts
 * Theme Toggle, Header Scroll Elevation, and Mobile Navigation Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeader();
  initMobileNav();
});

/* --------------------------------------------------------------------------
   1. Theme Switcher (Default: Light Theme Priority)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('celworks-theme');

  // Default to light theme if not stored
  const initialTheme = storedTheme || 'light';
  applyTheme(initialTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('celworks-theme', newTheme);
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
