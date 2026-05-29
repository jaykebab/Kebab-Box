/*
  Kebab Box - Core Application Coordinator & Canvas Particle Engine
*/

document.addEventListener('DOMContentLoaded', () => {
  initSplashTransitions();
  initEmberEngine();
  initScrollEffects();
  initContactForm();
  initNewsletterForm();
  
  // Render modules
  if (window.renderMenu) renderMenu('all');
  if (window.renderLocations) renderLocations();
});

/* --- 1. SPLASH INTRO TRANSITIONS --- */
function initSplashTransitions() {
  const splash = document.getElementById('splash-overlay');
  const skipBtn = document.getElementById('skip-splash-btn');
  
  // Lock scrolling initially
  document.body.classList.add('no-scroll');
  
  const endSplash = () => {
    if (!splash.classList.contains('anim-slide-up')) {
      splash.classList.add('anim-slide-up');
      document.body.classList.remove('no-scroll');
      
      // Stop particle loop after slide-up to save performance
      setTimeout(() => {
        isEmberEngineRunning = false;
        splash.style.display = 'none';
      }, 500);
    }
  };
  
  // Auto-skip after 2.0 seconds
  const autoTimer = setTimeout(endSplash, 2000);
  
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      clearTimeout(autoTimer);
      endSplash();
    });
  }
}

/* --- MOBILE DRAWER TOGGLE --- */
function toggleMobileNav(open) {
  const drawer = document.getElementById('mobile-nav-drawer');
  if (!drawer) return;
  
  if (open) {
    drawer.classList.add('active');
    document.body.classList.add('no-scroll');
  } else {
    drawer.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
}
window.toggleMobileNav = toggleMobileNav;

/* --- 2. EMBER DYNAMIC PARTICLE ENGINE --- */
let isEmberEngineRunning = true;

function initEmberEngine() {
  const canvas = document.getElementById('splash-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  const particles = [];
  const maxParticles = 60;
  
  class Ember {
    constructor() {
      this.reset(true);
    }
    
    reset(init = false) {
      this.x = Math.random() * width;
      this.y = init ? Math.random() * height : height + 10;
      this.size = Math.random() * 3 + 1;
      this.speedY = -(Math.random() * 2 + 1);
      this.speedX = Math.random() * 1.5 - 0.75;
      this.life = Math.random() * 100 + 50;
      this.maxLife = this.life;
      
      // Color selector (Flame shades)
      const colors = [
        'rgba(240, 90, 34, ',   // Brand Orange
        'rgba(209, 38, 38, ',   // Brand Red
        'rgba(255, 162, 31, ',  // Brand Yellow
        'rgba(255, 230, 100, '  // Bright Gold
      ];
      this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3; // subtle wave drift
      this.life--;
      
      if (this.life <= 0 || this.y < -10) {
        this.reset();
      }
    }
    
    draw() {
      const alpha = (this.life / this.maxLife) * 0.7;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.colorPrefix + alpha + ')';
      
      // Add particle glow
      ctx.shadowBlur = this.size * 2;
      ctx.shadowColor = 'rgba(240, 90, 34, 0.5)';
      ctx.fill();
    }
  }
  
  // Initialize particles
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Ember());
  }
  
  function loop() {
    if (!isEmberEngineRunning) return;
    
    // Clear canvas with trace tail
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(11, 11, 13, 0.15)';
    ctx.fillRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    requestAnimationFrame(loop);
  }
  
  loop();
}

/* --- 3. SCROLL EFFECTS & DYNAMIC NAVIGATION --- */
function initScrollEffects() {
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    // Header background blur add
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Active Link Highlighting on Scroll
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

/* --- 4. GENERAL CONTACT INQUIRY --- */
function initContactForm() {
  // Handled natively by HTML5 form targeting hidden_iframe with handleContactSubmit callback
}

/* --- 5. FOOTER NEWSLETTER SUBSCRIPTION --- */
function initNewsletterForm() {
  const newsForm = document.getElementById('footer-newsletter-form');
  if (!newsForm) return;
  
  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsForm.querySelector('.newsletter-input');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    if (!email) {
      showToast("Please enter a valid email address.");
      return;
    }
    
    showToast("Successfully subscribed to Kebab Box news!");
    newsForm.reset();
  });
}

/* --- 6. FLOATING WHATSAPP REDIRECT --- */
function redirectToWhatsApp() {
  const phoneNumber = '919901219116'; // Official Kebab Box WhatsApp Business number
  const message = encodeURIComponent("Hi Kebab Box! I am visiting your website and want to check if fresh, hygienic kebabs are ready for order.");
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  
  window.open(url, '_blank');
}

// Global exposure
window.redirectToWhatsApp = redirectToWhatsApp;
