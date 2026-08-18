/**
 * ==========================================================================
 * SHOPTUCH — SHOPPING CART SYSTEM
 * LocalStorage Persistence, Calculations, Promo Codes, Drawer & Page UI
 * ==========================================================================
 */

const Cart = {
  storageKey: 'shoptuch_cart',
  promoKey: 'shoptuch_applied_promo',
  freeShippingGoal: 75.00,
  standardShippingFee: 9.95,
  expressShippingFee: 15.00,
  taxRate: 0.085, // 8.5%

  // Valid Promotional Coupons
  validCoupons: {
    'WELCOME10': { type: 'percent', value: 10, minOrder: 0, description: '10% Off First Order' },
    'LUXE20': { type: 'percent', value: 20, minOrder: 100, description: '20% Off Orders Over $100' },
    'TUCH15': { type: 'percent', value: 15, minOrder: 50, description: '15% Off Orders Over $50' },
    'FREESHIP': { type: 'freeship', value: 0, minOrder: 0, description: 'Complimentary Free Express Shipping' },
    'BFFBOGO': { type: 'percent', value: 50, minOrder: 0, description: 'Forever BFF Special Deal: 50% Off (Buy 1 Get 1)' },
    'ELLASHIP': { type: 'freeship', value: 0, minOrder: 0, description: 'Winter Ready Free Express Shipping (Code: ELLASHIP)' }
  },

  // Load items from localStorage
  getItems: function() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading cart from localStorage:', e);
      return [];
    }
  },

  // Save items
  saveItems: function(items) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
      this.updateBadges();
      this.renderDrawer();
      
      // Dispatch custom cart-updated event for real-time reactivity
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: { items: items } }));
    } catch (e) {
      console.warn('Error saving cart to localStorage:', e);
    }
  },

  // Add Item to Cart
  addItem: function(productId, size = null, color = null, quantity = 1) {
    if (!productId) return;
    const product = ProductService.getById(productId);
    if (!product) {
      if (typeof window.showToast === 'function') {
        window.showToast('Product not found', 'danger');
      }
      return;
    }

    const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'One Size');
    const chosenColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : 'Default');
    const qty = parseInt(quantity, 10) || 1;

    const items = this.getItems();
    const existingIndex = items.findIndex(
      item => item.productId === productId && item.size === chosenSize && item.color === chosenColor
    );

    if (existingIndex > -1) {
      items[existingIndex].quantity += qty;
    } else {
      items.push({
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.images && product.images.length > 0 ? product.images[0] : 'assets/images/logo/shoptuch-logo.svg',
        size: chosenSize,
        color: chosenColor,
        quantity: qty
      });
    }

    this.saveItems(items);

    if (typeof window.showToast === 'function') {
      window.showToast(`Added "${product.title}" to your bag`, 'success', 'View Bag', () => Cart.openDrawer());
    }

    this.openDrawer();
  },

  // Remove Item
  removeItem: function(itemId) {
    const items = this.getItems().filter(item => item.id !== itemId);
    this.saveItems(items);
    if (typeof window.showToast === 'function') {
      window.showToast('Item removed from your bag', 'info');
    }
  },

  // Update Item Quantity
  updateQuantity: function(itemId, qty) {
    const items = this.getItems();
    const target = items.find(item => item.id === itemId);
    if (target) {
      const newQty = parseInt(qty, 10);
      if (newQty <= 0) {
        this.removeItem(itemId);
        return;
      }
      target.quantity = newQty;
      this.saveItems(items);
    }
  },

  // Clear Entire Cart
  clearCart: function() {
    this.saveItems([]);
  },

  // Total Item Count
  getItemCount: function() {
    return this.getItems().reduce((sum, item) => sum + (item.quantity || 0), 0);
  },

  // Subtotal Calculation
  getSubtotal: function() {
    return this.getItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  // Promo Code Handling
  getAppliedPromo: function() {
    try {
      const stored = localStorage.getItem(this.promoKey);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  },

  applyPromoCode: function(code) {
    if (!code) return { success: false, message: 'Please enter a promo code.' };
    const cleanCode = code.trim().toUpperCase();
    const coupon = this.validCoupons[cleanCode];

    if (!coupon) {
      return { success: false, message: 'Invalid promotional code.' };
    }

    const subtotal = this.getSubtotal();
    if (coupon.minOrder && subtotal < coupon.minOrder) {
      return {
        success: false,
        message: `This coupon requires a minimum subtotal of ${ProductService.formatPrice(coupon.minOrder)}.`
      };
    }

    const promoData = { code: cleanCode, ...coupon };
    localStorage.setItem(this.promoKey, JSON.stringify(promoData));
    this.renderDrawer();
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { items: this.getItems() } }));
    return { success: true, message: `Promo code "${cleanCode}" applied! ${coupon.description}` };
  },

  removePromoCode: function() {
    localStorage.removeItem(this.promoKey);
    this.renderDrawer();
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { items: this.getItems() } }));
  },

  // Calculated Discount
  getDiscount: function() {
    const promo = this.getAppliedPromo();
    if (!promo) return 0;
    const subtotal = this.getSubtotal();

    if (promo.minOrder && subtotal < promo.minOrder) {
      return 0;
    }

    if (promo.type === 'percent') {
      return (subtotal * (promo.value / 100));
    }
    return 0;
  },

  // Calculated Shipping Fee
  getShippingFee: function(shippingMethod = 'standard') {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;

    const promo = this.getAppliedPromo();
    if (promo && promo.type === 'freeship') return 0;

    if (shippingMethod === 'express') {
      return this.expressShippingFee;
    }

    return subtotal >= this.freeShippingGoal ? 0 : this.standardShippingFee;
  },

  // Estimated Tax
  getTax: function() {
    const taxableAmount = Math.max(0, this.getSubtotal() - this.getDiscount());
    return taxableAmount * this.taxRate;
  },

  // Grand Total
  getTotal: function(shippingMethod = 'standard') {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    const discount = this.getDiscount();
    const shipping = this.getShippingFee(shippingMethod);
    const tax = this.getTax();
    return Math.max(0, subtotal - discount + shipping + tax);
  },

  // Update Cart Counter Badges across site
  updateBadges: function() {
    const count = this.getItemCount();
    document.querySelectorAll('.cart-badge-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
      el.classList.add('pulse');
      setTimeout(() => el.classList.remove('pulse'), 300);
    });
  },

  // Open & Close Drawer UI
  openDrawer: function() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.renderDrawer();
    }
  },

  closeDrawer: function() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  // Render Cart Drawer Contents
  renderDrawer: function() {
    const drawerBody = document.getElementById('cartDrawerBody');
    const drawerFooter = document.getElementById('cartDrawerFooter');
    const shippingBar = document.getElementById('drawerShippingProgress');
    if (!drawerBody) return;

    const items = this.getItems();
    const subtotal = this.getSubtotal();
    const count = this.getItemCount();

    // Render Free Shipping Progress Bar
    if (shippingBar) {
      if (count === 0) {
        shippingBar.innerHTML = `
          <div class="flex justify-between items-center text-xs">
            <span>Free Express Shipping on orders over ${ProductService.formatPrice(this.freeShippingGoal)}</span>
          </div>
          <div class="progress-track"><div class="progress-bar-fill" style="width: 0%"></div></div>
        `;
      } else if (subtotal >= this.freeShippingGoal) {
        shippingBar.innerHTML = `
          <div class="flex justify-between items-center text-xs text-accent font-semibold">
            <span>✓ You have unlocked FREE Express Shipping!</span>
          </div>
          <div class="progress-track"><div class="progress-bar-fill" style="width: 100%"></div></div>
        `;
      } else {
        const remaining = this.freeShippingGoal - subtotal;
        const pct = Math.min(100, (subtotal / this.freeShippingGoal) * 100);
        shippingBar.innerHTML = `
          <div class="flex justify-between items-center text-xs">
            <span>Add <strong class="text-accent">${ProductService.formatPrice(remaining)}</strong> more for <strong>FREE Shipping</strong></span>
            <span>${Math.round(pct)}%</span>
          </div>
          <div class="progress-track"><div class="progress-bar-fill" style="width: ${pct}%"></div></div>
        `;
      }
    }

    // Render Empty State
    if (items.length === 0) {
      drawerBody.innerHTML = `
        <div class="text-center" style="padding: 48px 16px;">
          <svg style="margin: 0 auto 16px auto; opacity: 0.3; width: 48px; height: 48px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <h4 class="font-serif" style="font-size: 1.25rem; margin-bottom: 8px;">Your Bag is Empty</h4>
          <p class="text-sm text-muted" style="margin-bottom: 24px;">Discover timeless luxury pieces crafted for refined living.</p>
          <a href="shop.html" class="btn btn-primary btn-sm" onclick="Cart.closeDrawer()">Explore New Arrivals</a>
        </div>
      `;
      if (drawerFooter) drawerFooter.style.display = 'none';
      return;
    }

    if (drawerFooter) drawerFooter.style.display = 'block';

    // Render List of Items
    drawerBody.innerHTML = items.map(item => `
      <div class="cart-item-row" id="drawer-item-${item.id}">
        <img src="${item.image}" alt="${item.title}" class="cart-item-thumb" onerror="this.src='assets/images/logo/shoptuch-logo.svg'"/>
        <div class="cart-item-details">
          <div>
            <a href="product.html?id=${item.productId}" class="cart-item-title" onclick="Cart.closeDrawer()">${item.title}</a>
            <div class="cart-item-meta">Size: <strong>${item.size}</strong> | Color: <strong>${item.color}</strong></div>
          </div>
          <div class="flex items-center justify-between" style="margin-top: 8px;">
            <div class="cart-item-qty-stepper">
              <button class="stepper-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1})" aria-label="Decrease quantity">−</button>
              <span class="stepper-value">${item.quantity}</span>
              <button class="stepper-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1})" aria-label="Increase quantity">+</button>
            </div>
            <div class="cart-item-price">${ProductService.formatPrice(item.price * item.quantity)}</div>
          </div>
        </div>
        <button class="cart-item-remove" onclick="Cart.removeItem('${item.id}')" title="Remove Item">✕</button>
      </div>
    `).join('');

    // Render Footer with Subtotal & CTAs
    const discount = this.getDiscount();
    const appliedPromo = this.getAppliedPromo();

    if (drawerFooter) {
      drawerFooter.innerHTML = `
        <div class="cart-summary-line">
          <span>Subtotal (${count} item${count > 1 ? 's' : ''})</span>
          <span class="font-semibold">${ProductService.formatPrice(subtotal)}</span>
        </div>
        ${discount > 0 ? `
          <div class="cart-summary-line" style="color: var(--success);">
            <span>Promo Discount (${appliedPromo.code})</span>
            <span>-${ProductService.formatPrice(discount)}</span>
          </div>
        ` : ''}
        <div class="cart-summary-line text-xs text-muted">
          <span>Shipping & Taxes calculated at checkout</span>
        </div>
        <div class="cart-summary-line cart-summary-total">
          <span>Estimated Total</span>
          <span>${ProductService.formatPrice(Math.max(0, subtotal - discount))}</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 16px;">
          <a href="checkout.html" class="btn btn-primary btn-block" onclick="Cart.closeDrawer()">Proceed to Checkout</a>
          <a href="cart.html" class="btn btn-secondary btn-block" onclick="Cart.closeDrawer()">View Full Shopping Bag</a>
        </div>
      `;
    }
  },

  // Render Full Cart Page
  renderCartPage: function() {
    const tableBody = document.getElementById('cartPageTableBody');
    const emptyState = document.getElementById('cartPageEmptyState');
    const layout = document.getElementById('cartPageMainLayout');
    const summaryCard = document.getElementById('cartPageSummaryCard');
    const itemsCountEl = document.getElementById('cartPageItemCount');
    if (!tableBody && !layout) return;

    const items = this.getItems();
    const count = this.getItemCount();
    const subtotal = this.getSubtotal();
    const appliedPromo = this.getAppliedPromo();
    const discount = this.getDiscount();
    const shipping = this.getShippingFee('standard');
    const tax = this.getTax();
    const total = this.getTotal('standard');

    if (itemsCountEl) itemsCountEl.textContent = `${count} item${count === 1 ? '' : 's'}`;

    if (items.length === 0) {
      if (layout) layout.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (layout) layout.style.display = 'grid';

    if (tableBody) {
      tableBody.innerHTML = items.map(item => `
        <tr style="border-bottom: 1px solid var(--border);">
          <td style="padding: 16px 8px;">
            <div class="flex items-center gap-4">
              <img src="${item.image}" alt="${item.title}" style="width: 64px; height: 80px; object-fit: cover; border-radius: 4px; background: var(--surface-2);" onerror="this.src='/assets/images/logo/shoptuch-logo.svg'"/>
              <div>
                <a href="product.html?id=${item.productId}" class="font-serif font-semibold" style="font-size: 1.05rem; display: block;">${item.title}</a>
                <span class="text-xs text-muted">Size: <strong>${item.size}</strong> | Color: <strong>${item.color}</strong></span>
                <div class="md:hidden" style="margin-top: 6px; font-weight: bold;">${ProductService.formatPrice(item.price * item.quantity)}</div>
              </div>
            </div>
          </td>
          <td class="hidden md:table-cell" style="padding: 16px 8px; font-weight: 500;">
            ${ProductService.formatPrice(item.price)}
          </td>
          <td style="padding: 16px 8px;">
            <div class="cart-item-qty-stepper" style="display: inline-flex;">
              <button class="stepper-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1}); Cart.renderCartPage();" aria-label="Decrease quantity">−</button>
              <span class="stepper-value">${item.quantity}</span>
              <button class="stepper-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1}); Cart.renderCartPage();" aria-label="Increase quantity">+</button>
            </div>
          </td>
          <td class="hidden md:table-cell" style="padding: 16px 8px; font-weight: bold;">
            ${ProductService.formatPrice(item.price * item.quantity)}
          </td>
          <td style="padding: 16px 8px; text-align: right;">
            <button class="text-xs text-muted" onclick="Cart.removeItem('${item.id}'); Cart.renderCartPage();" style="background: none; border: none; cursor: pointer; text-decoration: underline;">Remove</button>
          </td>
        </tr>
      `).join('');
    }

    if (summaryCard) {
      summaryCard.innerHTML = `
        <h3 class="font-serif" style="font-size: 1.4rem; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 12px;">Order Summary</h3>
        
        <div class="cart-summary-line" style="margin-bottom: 10px;">
          <span class="text-muted">Subtotal</span>
          <span class="font-semibold">${ProductService.formatPrice(subtotal)}</span>
        </div>

        ${discount > 0 ? `
          <div class="cart-summary-line" style="color: var(--success); margin-bottom: 10px;">
            <span>Promo Discount (${appliedPromo.code})</span>
            <span>-${ProductService.formatPrice(discount)}</span>
          </div>
        ` : ''}

        <div class="cart-summary-line" style="margin-bottom: 10px;">
          <span class="text-muted">Standard Courier</span>
          <span>${shipping === 0 ? '<strong style="color: var(--accent);">FREE</strong>' : ProductService.formatPrice(shipping)}</span>
        </div>

        <div class="cart-summary-line" style="margin-bottom: 16px;">
          <span class="text-muted">Estimated Tax (8.5%)</span>
          <span>${ProductService.formatPrice(tax)}</span>
        </div>

        <div class="cart-summary-line cart-summary-total" style="border-top: 1px solid var(--border); padding-top: 16px; margin-bottom: 24px;">
          <span class="font-serif" style="font-size: 1.25rem;">Estimated Total</span>
          <span class="font-serif" style="font-size: 1.35rem; font-weight: bold;">${ProductService.formatPrice(total)}</span>
        </div>

        <!-- Promo Code Input Form -->
        <div style="margin-bottom: 24px;">
          <label class="form-label text-xs uppercase font-bold">Promotional Code</label>
          <div class="flex gap-2">
            <input type="text" id="cartPromoInput" class="form-input" placeholder="e.g. WELCOME10" value="${appliedPromo ? appliedPromo.code : ''}" style="text-transform: uppercase;" />
            <button class="btn btn-secondary btn-sm" onclick="handleCartPromoSubmit()">Apply</button>
          </div>
          ${appliedPromo ? `
            <div class="flex items-center justify-between text-xs" style="margin-top: 6px; color: var(--success);">
              <span>Code <strong>${appliedPromo.code}</strong> active</span>
              <button onclick="Cart.removePromoCode(); Cart.renderCartPage();" style="background: none; border: none; text-decoration: underline; cursor: pointer; color: var(--danger);">Remove</button>
            </div>
          ` : `
            <span class="text-xs text-muted" style="margin-top: 4px; display: block;">Try codes: <strong>WELCOME10</strong> (10% off) or <strong>LUXE20</strong> ($100+)</span>
          `}
        </div>

        <a href="checkout.html" class="btn btn-primary btn-block btn-lg" style="margin-bottom: 12px;">Proceed to Secure Checkout</a>
        <a href="shop.html" class="btn btn-secondary btn-block btn-sm">Continue Shopping</a>
      `;
    }
  }
};

// Global export
if (typeof window !== 'undefined') {
  window.Cart = Cart;
}
