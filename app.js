/**
 * ==========================================================================
 * SHOPTUCH — GLOBAL APPLICATION RUNTIME & CONTROLLER
 * Theme Switcher, Currency Conversion, Quick View Modal, Toasts, Sticky Nav
 * ==========================================================================
 */

const App = {
  themeKey: 'shoptuch_theme',

  init: function() {
    this.initTheme();
    this.initCurrency();
    this.initStickyHeader();
    this.initMobileNav();
    this.initModals();
    this.initNewsletter();
    this.initBackToTop();
    this.initHeroSlider();
    this.bindGlobalEvents();

    // Update cart and wishlist counter badges on load
    if (typeof Cart !== 'undefined') Cart.updateBadges();
    if (typeof Wishlist !== 'undefined') Wishlist.updateBadges();
    if (typeof SearchManager !== 'undefined') SearchManager.init();

    // Listen to storage sync across browser tabs
    window.addEventListener('storage', (e) => {
      if (typeof Cart !== 'undefined' && e.key === Cart.storageKey) Cart.updateBadges();
      if (typeof Wishlist !== 'undefined' && e.key === Wishlist.storageKey) Wishlist.updateBadges();
    });
  },

  /* ------------------------------------------------------------------------
   * 1. THEME TOGGLING & PERSISTENCE
   * ------------------------------------------------------------------------ */
  initTheme: function() {
    const savedTheme = localStorage.getItem(this.themeKey);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    this.setTheme(activeTheme);

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        App.setTheme(next);
      });
    });
  },

  setTheme: function(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.themeKey, theme);
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
    });
  },

  /* ------------------------------------------------------------------------
   * 2. MULTI-CURRENCY CONVERTER
   * ------------------------------------------------------------------------ */
  initCurrency: function() {
    const select = document.getElementById('currencySelector');
    const mobileSelect = document.getElementById('mobileCurrencySelector');
    const current = ProductService.getCurrency();

    const updateLabel = (curr) => {
      const label = document.getElementById('currentCurrencyLabel');
      if (label) {
        const flagMap = { USD: '🇺🇸 USD ($)', EUR: '🇪🇺 EUR (€)', GBP: '🇬🇧 GBP (£)', CAD: '🇨🇦 CAD ($)', AUD: '🇦🇺 AUD ($)', JPY: '🇯🇵 JPY (¥)' };
        label.textContent = flagMap[curr] || `${curr} ($)`;
      }
    };

    if (select) {
      select.value = current;
      updateLabel(current);
      select.addEventListener('change', (e) => {
        updateLabel(e.target.value);
        this.handleCurrencyChange(e.target.value);
      });
    }
    if (mobileSelect) {
      mobileSelect.value = current;
      mobileSelect.addEventListener('change', (e) => {
        updateLabel(e.target.value);
        this.handleCurrencyChange(e.target.value);
      });
    }
  },

  handleCurrencyChange: function(curr) {
    ProductService.setCurrency(curr);
    // Re-render components that have prices
    if (typeof FilterManager !== 'undefined') FilterManager.render();
    if (typeof ProductPage !== 'undefined' && ProductPage.currentProduct) ProductPage.render();
    if (typeof Cart !== 'undefined') Cart.renderDrawer();
    if (typeof Wishlist !== 'undefined') Wishlist.renderPage();

    // Re-render home carousels if on homepage
    if (typeof renderHomePageSections === 'function') renderHomePageSections();

    this.showToast(`Currency updated to ${curr}`, 'info');
  },

  /* ------------------------------------------------------------------------
   * 3. STICKY HEADER & SCROLL BEHAVIOR
   * ------------------------------------------------------------------------ */
  initStickyHeader: function() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScrollY = currentScrollY;
    }, { passive: true });
  },

  /* ------------------------------------------------------------------------
   * 4. MOBILE NAVIGATION DRAWER
   * ------------------------------------------------------------------------ */
  initMobileNav: function() {
    const openBtn = document.getElementById('mobileMenuTrigger');
    const closeBtn = document.getElementById('mobileMenuClose');
    const drawer = document.getElementById('mobileNavDrawer');
    const backdrop = document.getElementById('drawerBackdrop');

    if (!openBtn || !drawer) return;

    const openMenu = () => {
      drawer.classList.add('open');
      if (backdrop) backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
    };

    openBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        closeMenu();
        if (typeof Cart !== 'undefined') Cart.closeDrawer();
      });
    }
  },

  /* ------------------------------------------------------------------------
   * 5. MODAL SYSTEM (Quick View & Size Guide)
   * ------------------------------------------------------------------------ */
  initModals: function() {
    // Backdrop click for quick view modal
    const qvModal = document.getElementById('quickViewModal');
    if (qvModal) {
      qvModal.addEventListener('click', (e) => {
        if (e.target === qvModal) closeQuickView();
      });
    }

    const sgModal = document.getElementById('sizeGuideModal');
    if (sgModal) {
      sgModal.addEventListener('click', (e) => {
        if (e.target === sgModal) closeSizeGuideModal();
      });
    }
  },

  /* ------------------------------------------------------------------------
   * 6. NEWSLETTER SUBSCRIPTION ENGINE
   * ------------------------------------------------------------------------ */
  initNewsletter: function() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input || !input.value.includes('@')) {
          App.showToast('Please enter a valid email address.', 'danger');
          return;
        }

        const email = input.value.trim();
        input.value = '';
        App.showToast('Thank you! Welcome promo code WELCOME10 has been copied to your bag.', 'success');
        Cart.applyPromoCode('WELCOME10');
      });
    });
  },

  /* ------------------------------------------------------------------------
   * 7. BACK TO TOP BUTTON
   * ------------------------------------------------------------------------ */
  initBackToTop: function() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
        btn.style.transform = 'translateY(0)';
      } else {
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
        btn.style.transform = 'translateY(16px)';
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  /* ------------------------------------------------------------------------
   * 8. TOAST NOTIFICATION ENGINE
   * ------------------------------------------------------------------------ */
  showToast: function(message, type = 'info', actionText = null, actionCallback = null) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<span style="color: var(--success); font-weight: bold;">✓</span>';
    } else if (type === 'danger') {
      iconSvg = '<span style="color: var(--danger); font-weight: bold;">✕</span>';
    } else {
      iconSvg = '<span style="color: var(--accent); font-weight: bold;">●</span>';
    }

    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
        ${iconSvg}
        <span class="text-sm font-medium">${message}</span>
      </div>
      ${actionText ? `<button class="btn btn-sm btn-secondary" style="padding: 4px 10px; font-size: 0.75rem; margin-left: 12px;">${actionText}</button>` : ''}
      <button class="toast-close" style="background: none; border: none; font-size: 1rem; cursor: pointer; color: var(--text-light); margin-left: 8px;">✕</button>
    `;

    if (actionText && actionCallback) {
      const actBtn = toast.querySelector('.btn-sm');
      if (actBtn) {
        actBtn.addEventListener('click', () => {
          actionCallback();
          toast.remove();
        });
      }
    }

    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => toast.remove());
    }

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(12px)';
        setTimeout(() => toast.remove(), 250);
      }
    }, 4000);
  },

  /* ------------------------------------------------------------------------
   * 9. HERO BANNER SLIDER CONTROLLER
   * ------------------------------------------------------------------------ */
  initHeroSlider: function() {
    const slider = document.getElementById('heroBannerSlider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero-slide');
    const dots = slider.querySelectorAll('.hero-slider-dot');
    const prevBtn = slider.querySelector('.hero-nav-arrow.prev');
    const nextBtn = slider.querySelector('.hero-nav-arrow.next');

    if (!slides.length) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    const intervalTime = 6000;

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      slides.forEach((slide, i) => {
        if (i === currentIndex) {
          slide.classList.add('active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      dots.forEach((dot, i) => {
        if (i === currentIndex) {
          dot.classList.add('active');
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.classList.remove('active');
          dot.removeAttribute('aria-current');
        }
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(nextSlide, intervalTime);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        startAutoPlay();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const slideIdx = parseInt(dot.getAttribute('data-slide-to'), 10);
        if (!isNaN(slideIdx)) {
          goToSlide(slideIdx);
          startAutoPlay();
        }
      });
    });

    // Pause on hover / focus
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
    slider.addEventListener('focusin', stopAutoPlay);
    slider.addEventListener('focusout', startAutoPlay);

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchStartX = e.changedTouches[0].screenX;
      }
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 45) {
          if (diff > 0) {
            nextSlide(); // swipe left -> next
          } else {
            prevSlide(); // swipe right -> prev
          }
          startAutoPlay();
        }
      }
    }, { passive: true });

    // Keyboard navigation when slider is in viewport
    document.addEventListener('keydown', (e) => {
      const rect = slider.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
          startAutoPlay();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
          startAutoPlay();
        }
      }
    });

    // Start automated cycle
    startAutoPlay();
  },

  bindGlobalEvents: function() {
    // Escape key closes open drawers and modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (typeof Cart !== 'undefined') Cart.closeDrawer();
        if (typeof SearchManager !== 'undefined') SearchManager.close();
        closeQuickView();
        closeSizeGuideModal();
      }
    });
  }
};

/* --------------------------------------------------------------------------
 * GLOBAL HELPER FUNCTIONS
 * -------------------------------------------------------------------------- */

// Global toast helper
window.showToast = function(msg, type, actionText, actionFn) {
  App.showToast(msg, type, actionText, actionFn);
};

// Quick View Modal Handlers
window.openQuickView = function(productId) {
  const p = ProductService.getById(productId);
  if (!p) return;

  const modal = document.getElementById('quickViewModal');
  const body = document.getElementById('quickViewModalBody');
  if (!modal || !body) return;

  let selectedSize = p.sizes && p.sizes.length > 0 ? p.sizes[0] : 'One Size';
  let selectedColor = p.colors && p.colors.length > 0 ? p.colors[0].name : 'Default';

  body.innerHTML = `
    <div class="grid grid-2 gap-6 items-center">
      <div style="background: var(--surface-2); border-radius: var(--radius-sm); overflow: hidden; height: 380px;">
        <img id="qvMainImg" src="${p.images[0]}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/images/logo/shoptuch-logo.svg'"/>
      </div>
      <div>
        <span class="text-xs uppercase tracking-widest text-muted font-bold">${p.brand}</span>
        <h3 class="font-serif" style="font-size: 1.5rem; margin: 4px 0 10px 0;">${p.title}</h3>
        <div class="flex items-center gap-2" style="margin-bottom: 12px;">
          <span class="font-bold text-lg">${ProductService.formatPrice(p.price)}</span>
          ${p.comparePrice ? `<span class="text-sm text-light text-decoration-line-through">${ProductService.formatPrice(p.comparePrice)}</span>` : ''}
          ${p.discount ? `<span class="badge badge-sale">${p.discount}% OFF</span>` : ''}
        </div>
        <p class="text-sm text-muted" style="margin-bottom: 16px;">${p.description}</p>
        
        <!-- Size Selector -->
        <div style="margin-bottom: 16px;">
          <label class="form-label text-xs uppercase">Size</label>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;" id="qvSizes">
            ${p.sizes ? p.sizes.map((s, i) => `
              <button type="button" class="btn btn-sm ${i === 0 ? 'btn-primary' : 'btn-secondary'}" onclick="selectQuickViewSize('${s}', this)">${s}</button>
            `).join('') : ''}
          </div>
        </div>

        <!-- Color Selector -->
        <div style="margin-bottom: 20px;">
          <label class="form-label text-xs uppercase">Color: <span id="qvColorName">${selectedColor}</span></label>
          <div style="display: flex; gap: 8px;" id="qvColors">
            ${p.colors ? p.colors.map((c, i) => `
              <button type="button" class="swatch-btn ${i === 0 ? 'active' : ''}" style="background-color: ${c.hex};" title="${c.name}" onclick="selectQuickViewColor('${c.name}', this)"></button>
            `).join('') : ''}
          </div>
        </div>

        <div style="display: flex; gap: 10px;">
          <button class="btn btn-primary btn-block" onclick="Cart.addItem('${p.id}', window._qvSize || '${selectedSize}', window._qvColor || '${selectedColor}', 1); closeQuickView();">
            Add to Shopping Bag
          </button>
          <a href="product.html?id=${p.id}" class="btn btn-secondary">
            Full Details
          </a>
        </div>
      </div>
    </div>
  `;

  window._qvSize = selectedSize;
  window._qvColor = selectedColor;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.selectQuickViewSize = function(size, el) {
  window._qvSize = size;
  document.querySelectorAll('#qvSizes button').forEach(b => {
    b.className = 'btn btn-sm btn-secondary';
  });
  if (el) el.className = 'btn btn-sm btn-primary';
};

window.selectQuickViewColor = function(color, el) {
  window._qvColor = color;
  const label = document.getElementById('qvColorName');
  if (label) label.textContent = color;
  document.querySelectorAll('#qvColors button').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
};

window.closeQuickView = function() {
  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// Size Guide Modal Handlers
window.openSizeGuideModal = function() {
  const modal = document.getElementById('sizeGuideModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeSizeGuideModal = function() {
  const modal = document.getElementById('sizeGuideModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// Copy Promo Code to Clipboard & Auto-Apply to Cart
window.copyPromoCode = function(code) {
  if (!code) return;
  const cleanCode = code.trim().toUpperCase();

  function onCopied() {
    if (typeof showToast === 'function') {
      showToast(`Promo code "${cleanCode}" copied! Applied to shopping bag.`, 'success');
    }
    if (typeof Cart !== 'undefined') {
      Cart.applyPromoCode(cleanCode);
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(cleanCode).then(onCopied).catch(() => {
      fallbackCopy(cleanCode);
    });
  } else {
    fallbackCopy(cleanCode);
  }

  function fallbackCopy(text) {
    try {
      const tempInput = document.createElement('input');
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      onCopied();
    } catch (e) {
      if (typeof Cart !== 'undefined') {
        Cart.applyPromoCode(text);
      }
    }
  }
};

// Announcement Bar Dismiss Handler
window.dismissAnnouncement = function() {
  const bar = document.querySelector('.announcement-bar');
  if (bar) {
    bar.classList.add('is-hidden');
    sessionStorage.setItem('shoptuch_announcement_dismissed', 'true');
  }
};

// Account Modal Handlers
window.openAccountModal = function() {
  const modal = document.getElementById('accountModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeAccountModal = function() {
  const modal = document.getElementById('accountModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.switchAccountTab = function(tabName) {
  const tabs = ['signin', 'register', 'orders'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab${t.charAt(0).toUpperCase() + t.slice(1)}Btn`);
    const view = document.getElementById(`account${t.charAt(0).toUpperCase() + t.slice(1)}View`);
    if (btn) {
      if (t === tabName) btn.classList.add('active');
      else btn.classList.remove('active');
    }
    if (view) {
      view.style.display = (t === tabName) ? 'block' : 'none';
    }
  });
};

window.handleAccountLogin = function(e) {
  if (e) e.preventDefault();
  const email = document.getElementById('loginEmail')?.value || 'patron@shoptuch.com';
  window.closeAccountModal();
  if (typeof showToast === 'function') {
    showToast(`Welcome back, ${email.split('@')[0]}! VIP Atelier perks unlocked.`, 'success');
  }
};

window.handleDemoLogin = function() {
  const emailInput = document.getElementById('loginEmail');
  const passInput = document.getElementById('loginPassword');
  if (emailInput) emailInput.value = 'vip.client@shoptuch.luxury';
  if (passInput) passInput.value = 'atelier2025';
  window.handleAccountLogin();
};

window.handleAccountRegister = function(e) {
  if (e) e.preventDefault();
  window.closeAccountModal();
  if (typeof showToast === 'function') {
    showToast('Atelier account created! Check your inbox for your 10% welcome voucher.', 'success');
  }
};

window.handleTrackOrder = function(e) {
  if (e) e.preventDefault();
  const orderNum = document.getElementById('trackOrderNumber')?.value || 'ST-84920';
  const resultBox = document.getElementById('trackResultBox');
  if (resultBox) {
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
      <div style="font-weight: 700; color: var(--success); margin-bottom: 4px;">● Package In Transit</div>
      <div style="font-size: 0.78rem; color: var(--text-secondary);">Order #${orderNum.toUpperCase()} is scheduled for delivery tomorrow by 5:00 PM via DHL Express.</div>
    `;
  }
};

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

if (typeof window !== 'undefined') {
  window.App = App;
}
