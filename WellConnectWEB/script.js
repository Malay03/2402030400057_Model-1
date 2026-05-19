// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      }
    });
  }

  // ===== Smooth scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Navbar shadow on scroll =====
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // ===== Pricing Toggle =====
  const toggleMonthly = document.getElementById('toggleMonthly');
  const toggleYearly = document.getElementById('toggleYearly');
  const toggleSlider = document.getElementById('toggleSlider');
  const paidPrice = document.getElementById('paidPrice');
  const paidBilling = document.getElementById('paidBilling');

  if (toggleMonthly && toggleYearly && toggleSlider) {
    toggleMonthly.addEventListener('click', () => {
      toggleSlider.classList.remove('yearly');
      toggleMonthly.classList.add('active');
      toggleYearly.classList.remove('active');
      if (paidPrice) paidPrice.textContent = '$12/mo';
      if (paidBilling) paidBilling.textContent = 'Billed Monthly';
    });

    toggleYearly.addEventListener('click', () => {
      toggleSlider.classList.add('yearly');
      toggleYearly.classList.add('active');
      toggleMonthly.classList.remove('active');
      if (paidPrice) paidPrice.textContent = '$10/yr';
      if (paidBilling) paidBilling.textContent = 'Billed Yearly — Save 31%';
    });
  }

  // ===== Animate elements on scroll =====
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
});
