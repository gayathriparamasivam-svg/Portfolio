// ==========================================================================
// Gayathri P — Portfolio scripts
// Sections: mobile nav, active-link highlighting, scroll progress,
// scroll-reveal animations, back-to-top, contact form validation.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     Footer year
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     Mobile navigation toggle
  --------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    // Close mobile menu after a link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
      });
    });

    // Close mobile menu on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------------------
     Active navigation highlighting (scroll spy)
  --------------------------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('active', isActive);
    });
  };

  /* ---------------------------------------------------------------------
     Signal bar — scroll progress indicator
  --------------------------------------------------------------------- */
  const signalSpan = document.querySelector('.signal-bar span');

  const updateSignalBar = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (signalSpan) signalSpan.style.width = `${pct}%`;
  };

  /* ---------------------------------------------------------------------
     Back-to-top button
  --------------------------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');

  const toggleBackToTop = () => {
    if (!backToTop) return;
    backToTop.classList.toggle('show', window.scrollY > 480);
  };

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------------------
     Scroll listeners (throttled via requestAnimationFrame)
  --------------------------------------------------------------------- */
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setActiveLink();
        updateSignalBar();
        toggleBackToTop();
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ---------------------------------------------------------------------
     Scroll-reveal animation (IntersectionObserver)
  --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show everything immediately
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------------------------
     Contact form validation
     Note: no backend is connected — this validates input in the browser
     only. Wiring real delivery needs a service like Formspree/EmailJS
     or a custom server endpoint.
  --------------------------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  const validators = {
    name: (value) => value.trim().length >= 2 ? '' : 'Please enter your full name.',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Please enter a valid email address.',
    subject: (value) => value.trim().length >= 3 ? '' : 'Please enter a subject.',
    message: (value) => value.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'
  };

  const showFieldError = (fieldName, message) => {
    const input = document.getElementById(fieldName);
    const errorEl = document.getElementById(`${fieldName}Error`);
    if (!input || !errorEl) return;

    const field = input.closest('.field');
    if (message) {
      field.classList.add('has-error');
      errorEl.textContent = message;
      input.setAttribute('aria-invalid', 'true');
    } else {
      field.classList.remove('has-error');
      errorEl.textContent = '';
      input.removeAttribute('aria-invalid');
    }
  };

  if (form) {
    // Live validation as the user types (after first blur)
    Object.keys(validators).forEach(fieldName => {
      const input = document.getElementById(fieldName);
      if (!input) return;
      input.addEventListener('blur', () => {
        showFieldError(fieldName, validators[fieldName](input.value));
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;
      Object.keys(validators).forEach(fieldName => {
        const input = document.getElementById(fieldName);
        if (!input) return;
        const message = validators[fieldName](input.value);
        showFieldError(fieldName, message);
        if (message) hasError = true;
      });

      if (hasError) {
        if (formStatus) {
          formStatus.textContent = 'Please fix the highlighted fields before sending.';
          formStatus.style.color = '#E0607A';
        }
        return;
      }

      // No backend connected yet — see form-note in the markup.
      if (formStatus) {
        formStatus.textContent = 'This form isn\u2019t connected to a backend yet, so nothing was sent. Please email or call directly for now.';
        formStatus.style.color = '';
      }
    });
  }

});
