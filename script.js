// ═══════════════════════════════════════════════════
//  Jiglu Valley – script.js
//  GSAP animations, navbar, mobile menu, interactions
// ═══════════════════════════════════════════════════

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/* ─── Navbar Scroll Effect ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ─── Mobile Menu ─── */
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  const isHidden = mobileMenu.classList.contains('hidden');
  if (isHidden) {
    mobileMenu.classList.remove('hidden');
    gsap.fromTo(mobileMenu,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
    menuBtn.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    gsap.to(mobileMenu, {
      opacity: 0, y: -10, duration: 0.2, ease: 'power2.in',
      onComplete: () => mobileMenu.classList.add('hidden')
    });
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

function closeMobile() {
  mobileMenu.classList.add('hidden');
  menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
}

/* ─── Hero GSAP Intro Animation ─── */
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTl
  .fromTo('#hero-tag',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6 }, 0.2)
  .fromTo('#hero-title',
    { opacity: 0, y: 60, skewY: 3 },
    { opacity: 1, y: 0, skewY: 0, duration: 0.8 }, 0.4)
  .fromTo('#hero-sub',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.6 }, 0.7)
  .fromTo('#hero-desc',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6 }, 0.9)
  .fromTo('#hero-btns',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6 }, 1.1);

/* ─── Scroll Reveal for .reveal elements ─── */
gsap.utils.toArray('.reveal').forEach((el) => {
  gsap.fromTo(el,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        toggleActions: 'play none none none',
      }
    }
  );
});

/* ─── Gallery Stagger Reveal ─── */
gsap.utils.toArray('#gallery .gallery-img').forEach((img, i) => {
  gsap.fromTo(img,
    { opacity: 0, scale: 0.92 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
      delay: i * 0.05,
      scrollTrigger: {
        trigger: img,
        start: 'top 90%',
        toggleActions: 'play none none none',
      }
    }
  );
});

/* ─── Activities Stagger ─── */
gsap.utils.toArray('.activity-card').forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: i * 0.07,
      scrollTrigger: {
        trigger: card,
        start: 'top 92%',
        toggleActions: 'play none none none',
      }
    }
  );
});

/* ─── Stay Card Stagger ─── */
gsap.utils.toArray('#stay .card-lift').forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      delay: i * 0.12,
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none none',
      }
    }
  );
});

/* ─── Parallax Depth Effect ─── */
gsap.utils.toArray('.parallax-bg').forEach((section) => {
  gsap.to(section, {
    backgroundPositionY: '30%',
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  });
});

/* ─── Smooth Scroll for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─── Floating WhatsApp Tooltip ─── */
const waFloat = document.getElementById('wa-float');
if (waFloat) {
  // Show tooltip on hover
  waFloat.setAttribute('title', 'Chat on WhatsApp!');

  // Subtle bounce on page load after delay
  gsap.fromTo('#wa-float',
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 2.5 }
  );
}

/* ─── Counter Animation for location stats ─── */
function animateCounter(el, target, suffix = '') {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: 'power2.out',
    snap: { val: 1 },
    onUpdate: () => {
      el.textContent = Math.ceil(obj.val) + suffix;
    },
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
    }
  });
}

// Find counter elements and animate them
document.querySelectorAll('.text-4xl.font-bold.font-serif.text-green-400').forEach(el => {
  const text = el.textContent.trim();
  if (text.includes('20')) {
    // Save children (span with 'km')
    const span = el.querySelector('span');
    el.innerHTML = '<span id="cnt-20">20</span>' + (span ? span.outerHTML : '');
    animateCounter(document.getElementById('cnt-20'), 20);
  }
});

/* ─── Intersection Observer fallback for older browsers ─── */
// Ensures reveal elements show even if GSAP ScrollTrigger misses them
window.addEventListener('load', () => {
  // Refresh ScrollTrigger after all content loads
  ScrollTrigger.refresh();
});
