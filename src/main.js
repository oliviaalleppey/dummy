import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mob-link');
  const navbar = document.getElementById('navbar');

  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

    // Animate hamburger to X
    const bars = menuToggle.querySelectorAll('.bar');
    if (menuToggle.classList.contains('active')) {
      bars[0].style.transform = 'rotate(-45deg) translate(-4px, 4px)';
      bars[1].style.transform = 'rotate(45deg) translate(-4px, -4px)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.transform = 'none';

      // Reset color if scrolled
      if (navbar.classList.contains('scrolled')) {
        bars.forEach(bar => bar.style.backgroundColor = 'var(--text-main)');
      } else {
        bars.forEach(bar => bar.style.backgroundColor = 'var(--bg-color)');
      }
    }
  };

  menuToggle.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // Sticky Navbar
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Reservation Modal Logic
  const modal = document.getElementById('reservationModal');
  const openBtns = document.querySelectorAll('.open-modal-btn');
  const closeBtn = document.getElementById('closeModal');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Form submission
  const modalForm = modal.querySelector('.modal-form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = modalForm.querySelector('.submit-btn');
      if (submitBtn) {
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
          alert('Request sent. Our concierge will contact you shortly.');
          submitBtn.textContent = 'SEND REQUEST';
          submitBtn.disabled = false;
          closeModal();
          modalForm.reset();
        }, 1000);
      }
    });
  }

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.sanctuary-item, .sanctuary-grid, .flip-card, .j-card, .wellness-grid, .ethos, .events .sanctuary-item, .split-screen-section, .split-content, .split-image');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('revealed');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // Parallax effect for hero
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
    });
  }

  // Smooth scroll with offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.style.backgroundImage = `url(${img.dataset.src})`;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('.s-img, .hero-bg, .w-img').forEach(img => {
      const bgUrl = getComputedStyle(img).backgroundImage;
      if (bgUrl && bgUrl !== 'none') {
        img.dataset.src = bgUrl.replace(/url\(['"]?(.+?)['"]?\)/, '$1');
        img.style.backgroundImage = 'none';
        imageObserver.observe(img);
      }
    });
  }

  // Add focus trap to modal for accessibility
  const focusableElements = modal.querySelectorAll('input, textarea, button');
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });

  // Packages Tab Functionality
  const tabBtns = document.querySelectorAll('.packages-tabs .tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;

        // Update button states
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update content visibility
        tabContents.forEach(content => {
          content.classList.remove('active');
          if (content.id === targetTab) {
            content.classList.add('active');
          }
        });
      });
    });
  }
});
