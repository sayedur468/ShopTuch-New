/**
 * ==========================================================================
 * SHOPTUCH — WISHLIST SYSTEM
 * LocalStorage Persistence, Toggle, Badges & Page UI
 * ==========================================================================
 */

const Wishlist = {
  storageKey: 'shoptuch_wishlist',

  getItems: function() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading wishlist:', e);
      return [];
    }
  },

  saveItems: function(items) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
      this.updateBadges();
      this.updateButtons();
      window.dispatchEvent(new CustomEvent('wishlist-updated', { detail: { items: items } }));
    } catch (e) {
      console.warn('Error saving wishlist:', e);
    }
  },

  has: function(productId) {
    return this.getItems().some(id => id === productId);
  },

  toggle: function(productId) {
    if (!productId) return;
    const product = ProductService.getById(productId);
    if (!product) return;

    let items = this.getItems();
    const exists = items.includes(productId);

    if (exists) {
      items = items.filter(id => id !== productId);
      if (typeof window.showToast === 'function') {
        window.showToast(`Removed "${product.title}" from your wishlist`, 'info');
      }
    } else {
      items.push(productId);
      if (typeof window.showToast === 'function') {
        window.showToast(
          `Saved "${product.title}" to your wishlist`,
          'success',
          'View Wishlist',
          () => window.location.href = 'wishlist.html'
        );
      }
    }

    this.saveItems(items);
  },

  remove: function(productId) {
    const items = this.getItems().filter(id => id !== productId);
    this.saveItems(items);
    if (typeof window.showToast === 'function') {
      window.showToast('Item removed from wishlist', 'info');
    }
    this.renderPage();
  },

  moveToCart: function(productId, size = null, color = null) {
    Cart.addItem(productId, size, color, 1);
    this.remove(productId);
  },

  addAllToCart: function() {
    const items = this.getItems();
    if (items.length === 0) return;
    items.forEach(id => {
      Cart.addItem(id, null, null, 1);
    });
    this.saveItems([]);
    if (typeof window.showToast === 'function') {
      window.showToast('All wishlist items moved to your bag!', 'success');
    }
    this.renderPage();
  },

  getCount: function() {
    return this.getItems().length;
  },

  updateBadges: function() {
    const count = this.getCount();
    document.querySelectorAll('.wishlist-badge-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
      el.classList.add('pulse');
      setTimeout(() => el.classList.remove('pulse'), 300);
    });
  },

  updateButtons: function() {
    const items = this.getItems();
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const id = btn.getAttribute('data-wishlist-id');
      if (items.includes(id)) {
        btn.classList.add('active');
        btn.setAttribute('aria-label', 'Remove from wishlist');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-label', 'Add to wishlist');
      }
    });
  },

  renderPage: function() {
    const container = document.getElementById('wishlistGridContainer');
    const emptyState = document.getElementById('wishlistEmptyState');
    const headerCount = document.getElementById('wishlistPageCount');
    if (!container) return;

    const itemIds = this.getItems();
    const count = itemIds.length;

    if (headerCount) {
      headerCount.textContent = `${count} item${count === 1 ? '' : 's'}`;
    }

    if (count === 0) {
      container.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    container.style.display = 'grid';

    const products = itemIds
      .map(id => ProductService.getById(id))
      .filter(p => p !== null);

    container.innerHTML = products.map(product => `
      <div class="product-card">
        <div class="product-image-container">
          <img src="${product.images[0]}" alt="${product.title}" loading="lazy" onerror="this.src='assets/images/logo/shoptuch-logo.svg'"/>
          <button class="wishlist-toggle-btn active" onclick="Wishlist.remove('${product.id}')" title="Remove from Wishlist" aria-label="Remove">
            <svg width="18" height="18" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
        </div>
        <div class="product-details">
          <span class="product-brand">${product.brand}</span>
          <a href="product.html?id=${product.id}" class="product-title">${product.title}</a>
          <div class="product-price-row">
            <span class="current-price">${ProductService.formatPrice(product.price)}</span>
            ${product.comparePrice ? `<span class="compare-price">${ProductService.formatPrice(product.comparePrice)}</span>` : ''}
          </div>
          <div class="product-card-footer" style="margin-top: 12px;">
            <button class="btn btn-primary btn-sm btn-block" onclick="Wishlist.moveToCart('${product.id}')">
              Move to Bag
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
};

// Global export
if (typeof window !== 'undefined') {
  window.Wishlist = Wishlist;
}
