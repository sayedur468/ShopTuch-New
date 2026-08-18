/**
 * ==========================================================================
 * SHOPTUCH — PRODUCT DETAILS PAGE CONTROLLER
 * Gallery Zoom, Size/Color Selectors, Reviews, Stock Urgency & JSON-LD
 * ==========================================================================
 */

const ProductPage = {
  currentProduct: null,
  selectedSize: null,
  selectedColor: null,
  quantity: 1,

  init: function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id') || params.get('slug') || 'ST001';
    
    const product = ProductService.getById(productId);
    if (!product) {
      this.renderNotFound();
      return;
    }

    this.currentProduct = product;
    this.selectedSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'One Size';
    this.selectedColor = product.colors && product.colors.length > 0 ? product.colors[0].name : 'Default';

    this.saveRecentlyViewed(productId);
    this.render();
    this.injectSEOData();
  },

  saveRecentlyViewed: function(id) {
    try {
      let list = JSON.parse(localStorage.getItem('shoptuch_recently_viewed') || '[]');
      list = list.filter(item => item !== id);
      list.unshift(id);
      if (list.length > 8) list.pop();
      localStorage.setItem('shoptuch_recently_viewed', JSON.stringify(list));
    } catch (e) {}
  },

  renderNotFound: function() {
    const main = document.getElementById('productPageContent');
    if (main) {
      main.innerHTML = `
        <div class="container text-center" style="padding: 100px 16px;">
          <h2 class="font-serif" style="font-size: 2rem; margin-bottom: 12px;">Product Not Found</h2>
          <p class="text-muted" style="margin-bottom: 24px;">The garment you are looking for has been moved or is currently unavailable.</p>
          <a href="shop.html" class="btn btn-primary">Return to Catalog</a>
        </div>
      `;
    }
  },

  render: function() {
    const p = this.currentProduct;
    document.title = `${p.title} — ShopTuch Atelier`;

    // Update Breadcrumb
    const breadcrumbCat = document.getElementById('breadcrumbCategory');
    const breadcrumbTitle = document.getElementById('breadcrumbTitle');
    if (breadcrumbCat) {
      breadcrumbCat.textContent = p.category;
      breadcrumbCat.href = `category.html?cat=${p.category.toLowerCase()}`;
    }
    if (breadcrumbTitle) {
      breadcrumbTitle.textContent = p.title;
    }

    // Main Gallery
    this.renderGallery();

    // Product Information
    const brandEl = document.getElementById('pdpBrand');
    const titleEl = document.getElementById('pdpTitle');
    const priceEl = document.getElementById('pdpPrice');
    const comparePriceEl = document.getElementById('pdpComparePrice');
    const discountEl = document.getElementById('pdpDiscount');
    const ratingStarsEl = document.getElementById('pdpRatingStars');
    const ratingCountEl = document.getElementById('pdpRatingCount');
    const descEl = document.getElementById('pdpDescription');
    const skuEl = document.getElementById('pdpSKU');
    const stockBadgeEl = document.getElementById('pdpStockBadge');

    if (brandEl) brandEl.textContent = p.brand;
    if (titleEl) titleEl.textContent = p.title;
    if (priceEl) priceEl.textContent = ProductService.formatPrice(p.price);
    if (comparePriceEl) {
      if (p.comparePrice) {
        comparePriceEl.textContent = ProductService.formatPrice(p.comparePrice);
        comparePriceEl.style.display = 'inline';
      } else {
        comparePriceEl.style.display = 'none';
      }
    }
    if (discountEl) {
      if (p.discount) {
        discountEl.textContent = `${p.discount}% OFF`;
        discountEl.style.display = 'inline-block';
      } else {
        discountEl.style.display = 'none';
      }
    }
    if (ratingStarsEl) ratingStarsEl.textContent = '★★★★★';
    if (ratingCountEl) ratingCountEl.textContent = `${p.rating} (${p.reviews} Verified Reviews)`;
    if (descEl) descEl.textContent = p.description;
    if (skuEl) skuEl.textContent = p.sku || `ST-${p.id.toUpperCase()}`;

    if (stockBadgeEl) {
      if (p.stock < 5) {
        stockBadgeEl.className = 'badge badge-sale';
        stockBadgeEl.textContent = `Only ${p.stock} left in stock - order soon`;
      } else {
        stockBadgeEl.className = 'badge badge-best';
        stockBadgeEl.textContent = `In Stock (${p.stock} units ready to ship)`;
      }
    }

    // Color Selector
    this.renderColors();

    // Size Selector
    this.renderSizes();

    // Wishlist Button state
    this.updateWishlistBtn();

    // Accordions
    this.renderAccordions();

    // Customer Reviews
    this.renderReviews();

    // Complete the look / Related Products
    this.renderRelated();

    // Recently Viewed
    this.renderRecentlyViewed();
  },

  renderGallery: function() {
    const mainImg = document.getElementById('pdpMainImage');
    const thumbContainer = document.getElementById('pdpThumbnailTrack');
    const p = this.currentProduct;

    if (mainImg && p.images && p.images.length > 0) {
      mainImg.src = p.images[0];
      mainImg.alt = p.title;
    }

    if (thumbContainer && p.images) {
      thumbContainer.innerHTML = p.images.map((img, idx) => `
        <div class="thumbnail-item ${idx === 0 ? 'active' : ''}" onclick="ProductPage.switchImage('${img}', this)">
          <img src="${img}" alt="${p.title} view ${idx + 1}" onerror="this.src='assets/images/logo/shoptuch-logo.svg'"/>
        </div>
      `).join('');
    }
  },

  switchImage: function(imgUrl, thumbEl) {
    const mainImg = document.getElementById('pdpMainImage');
    if (mainImg) {
      mainImg.style.opacity = '0.4';
      mainImg.src = imgUrl;
      setTimeout(() => {
        mainImg.style.opacity = '1';
      }, 120);
    }
    document.querySelectorAll('.thumbnail-item').forEach(el => el.classList.remove('active'));
    if (thumbEl) thumbEl.classList.add('active');
  },

  renderColors: function() {
    const colorLabel = document.getElementById('pdpSelectedColorName');
    const colorContainer = document.getElementById('pdpColorSwatches');
    const p = this.currentProduct;

    if (colorLabel) colorLabel.textContent = this.selectedColor;
    if (colorContainer && p.colors) {
      colorContainer.innerHTML = p.colors.map(c => `
        <button type="button" class="swatch-btn ${c.name === this.selectedColor ? 'active' : ''}" style="background-color: ${c.hex};" title="${c.name}" onclick="ProductPage.selectColor('${c.name}', this)"></button>
      `).join('');
    }
  },

  selectColor: function(colorName, el) {
    this.selectedColor = colorName;
    const colorLabel = document.getElementById('pdpSelectedColorName');
    if (colorLabel) colorLabel.textContent = colorName;
    document.querySelectorAll('#pdpColorSwatches .swatch-btn').forEach(btn => btn.classList.remove('active'));
    if (el) el.classList.add('active');
  },

  renderSizes: function() {
    const sizeContainer = document.getElementById('pdpSizeSelector');
    const p = this.currentProduct;

    if (sizeContainer && p.sizes) {
      sizeContainer.innerHTML = p.sizes.map(s => `
        <button type="button" class="size-pill-btn ${s === this.selectedSize ? 'active' : ''}" onclick="ProductPage.selectSize('${s}', this)">
          ${s}
        </button>
      `).join('');
    }
  },

  selectSize: function(size, el) {
    this.selectedSize = size;
    document.querySelectorAll('#pdpSizeSelector .size-pill-btn').forEach(btn => btn.classList.remove('active'));
    if (el) el.classList.add('active');
  },

  changeQty: function(delta) {
    const qtyEl = document.getElementById('pdpQuantityValue');
    let newQty = this.quantity + delta;
    if (newQty < 1) newQty = 1;
    if (newQty > (this.currentProduct.stock || 10)) newQty = this.currentProduct.stock;
    this.quantity = newQty;
    if (qtyEl) qtyEl.textContent = newQty;
  },

  addToCart: function() {
    if (!this.currentProduct) return;
    Cart.addItem(this.currentProduct.id, this.selectedSize, this.selectedColor, this.quantity);
  },

  buyNow: function() {
    if (!this.currentProduct) return;
    Cart.addItem(this.currentProduct.id, this.selectedSize, this.selectedColor, this.quantity);
    window.location.href = 'checkout.html';
  },

  toggleWishlist: function() {
    if (!this.currentProduct) return;
    Wishlist.toggle(this.currentProduct.id);
    this.updateWishlistBtn();
  },

  updateWishlistBtn: function() {
    const btn = document.getElementById('pdpWishlistBtn');
    if (!btn || !this.currentProduct) return;
    const isSaved = Wishlist.has(this.currentProduct.id);
    btn.className = `btn btn-secondary ${isSaved ? 'btn-wishlist-active' : ''}`;
    btn.innerHTML = `
      <svg width="18" height="18" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
      <span>${isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
    `;
  },

  renderAccordions: function() {
    const container = document.getElementById('pdpAccordions');
    const p = this.currentProduct;
    if (!container) return;

    container.innerHTML = `
      <div class="accordion-item">
        <button class="accordion-header active" onclick="ProductPage.toggleAccordion(this)">
          <span>Fabric Composition & Features</span>
          <span class="accordion-icon">−</span>
        </button>
        <div class="accordion-content" style="display: block;">
          <ul style="padding-left: 20px; line-height: 1.8;">
            <li><strong>Material:</strong> ${p.fabric || '100% Premium Sustainable Blend'}</li>
            <li><strong>Origin:</strong> Milled and tailored in Northern Italy and Portugal</li>
            <li><strong>Weight:</strong> Heavyweight luxury drape with natural wrinkle resistance</li>
            <li><strong>Hardware:</strong> Custom matte engraved gunmetal hardware</li>
          </ul>
        </div>
      </div>

      <div class="accordion-item">
        <button class="accordion-header" onclick="ProductPage.toggleAccordion(this)">
          <span>Fit & Sizing Guide</span>
          <span class="accordion-icon">+</span>
        </button>
        <div class="accordion-content">
          <p>Designed for a relaxed modern tailored silhouette. If you prefer a standard slim fit, we recommend taking one size down from your usual size.</p>
          <p style="margin-top: 8px;">Model is 6'1" (185 cm) and wearing a size Medium.</p>
          <button class="btn btn-secondary btn-sm" style="margin-top: 12px;" onclick="openSizeGuideModal()">View Detailed Sizing Chart</button>
        </div>
      </div>

      <div class="accordion-item">
        <button class="accordion-header" onclick="ProductPage.toggleAccordion(this)">
          <span>Complimentary Shipping & 30-Day Returns</span>
          <span class="accordion-icon">+</span>
        </button>
        <div class="accordion-content">
          <p>Orders placed before 2:00 PM EST ship same business day in 100% recyclable luxury garment packaging.</p>
          <ul style="padding-left: 20px; margin-top: 8px; line-height: 1.8;">
            <li>Standard Courier (3–5 Business Days): Free on orders over $75 ($9.95 otherwise)</li>
            <li>Express Air (1–2 Business Days): $15.00 Flat Rate</li>
            <li>Hassle-free 30-day returns & prepaid exchanges</li>
          </ul>
        </div>
      </div>

      <div class="accordion-item">
        <button class="accordion-header" onclick="ProductPage.toggleAccordion(this)">
          <span>Garment Care Instructions</span>
          <span class="accordion-icon">+</span>
        </button>
        <div class="accordion-content">
          <p>To preserve the longevity and natural drape of this atelier garment:</p>
          <ul style="padding-left: 20px; margin-top: 8px; line-height: 1.8;">
            <li>Gentle hand wash cold or eco dry clean</li>
            <li>Do not bleach or tumble dry</li>
            <li>Steam gently on reverse side; store on structured wooden hangers</li>
          </ul>
        </div>
      </div>
    `;
  },

  toggleAccordion: function(headerEl) {
    const item = headerEl.parentElement;
    const content = item.querySelector('.accordion-content');
    const icon = headerEl.querySelector('.accordion-icon');
    const isOpen = content.style.display === 'block';

    if (isOpen) {
      content.style.display = 'none';
      headerEl.classList.remove('active');
      if (icon) icon.textContent = '+';
    } else {
      content.style.display = 'block';
      headerEl.classList.add('active');
      if (icon) icon.textContent = '−';
    }
  },

  renderReviews: function() {
    const container = document.getElementById('pdpReviewsList');
    const summaryRating = document.getElementById('reviewsAverageRating');
    const summaryCount = document.getElementById('reviewsTotalCount');
    const p = this.currentProduct;
    if (!container) return;

    if (summaryRating) summaryRating.textContent = p.rating.toFixed(1);
    if (summaryCount) summaryCount.textContent = `Based on ${p.reviews} verified reviews`;

    const sampleReviews = [
      { name: 'Elena Rostova', date: '2 days ago', rating: 5, verified: true, title: 'Absolute perfection in craftsmanship', comment: 'The fabric drape and weight exceed expectations. Stitching is immaculate and the color is even richer in person.' },
      { name: 'Marcus Sterling', date: '1 week ago', rating: 5, verified: true, title: 'Worth every single penny', comment: 'I have purchased luxury designer items costing triple this price that did not have this attention to detail. Fast shipping too.' },
      { name: 'Chloe Laurent', date: '2 weeks ago', rating: 5, verified: true, title: 'Modern, flattering silhouette', comment: 'Breathable, structured, and pairs effortlessly with everything in my wardrobe. Will definitely order in another color.' }
    ];

    container.innerHTML = sampleReviews.map(r => `
      <div class="review-item" style="padding: 20px 0; border-bottom: 1px solid var(--border);">
        <div class="flex items-center justify-between" style="margin-bottom: 6px;">
          <div>
            <span class="rating-stars" style="color: var(--accent);">★★★★★</span>
            <strong style="margin-left: 8px;">${r.title}</strong>
          </div>
          <span class="text-xs text-muted">${r.date}</span>
        </div>
        <p class="text-sm" style="margin-bottom: 8px; color: var(--text);">${r.comment}</p>
        <div class="flex items-center gap-2 text-xs text-muted">
          <span>${r.name}</span>
          ${r.verified ? `<span class="badge badge-best" style="font-size: 0.65rem; padding: 2px 6px;">✓ Verified Buyer</span>` : ''}
        </div>
      </div>
    `).join('');
  },

  renderRelated: function() {
    const container = document.getElementById('pdpRelatedGrid');
    if (!container || !this.currentProduct) return;

    const related = ProductService.getRelated(this.currentProduct.id, 4);
    container.innerHTML = related.map(p => FilterManager.generateCardHTML(p)).join('');
  },

  renderRecentlyViewed: function() {
    const container = document.getElementById('pdpRecentlyViewedGrid');
    const wrapper = document.getElementById('pdpRecentlyViewedSection');
    if (!container || !wrapper) return;

    try {
      const list = JSON.parse(localStorage.getItem('shoptuch_recently_viewed') || '[]')
        .filter(id => id !== this.currentProduct.id)
        .slice(0, 4);

      if (list.length === 0) {
        wrapper.style.display = 'none';
        return;
      }

      wrapper.style.display = 'block';
      const products = list.map(id => ProductService.getById(id)).filter(p => p !== null);
      container.innerHTML = products.map(p => FilterManager.generateCardHTML(p)).join('');
    } catch (e) {
      wrapper.style.display = 'none';
    }
  },

  injectSEOData: function() {
    const p = this.currentProduct;
    if (!p) return;

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": p.title,
      "image": p.images.map(img => window.location.origin + '/' + img),
      "description": p.description,
      "sku": p.sku || p.id,
      "brand": {
        "@type": "Brand",
        "name": p.brand
      },
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": "USD",
        "price": p.price.toString(),
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "ShopTuch"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": p.rating.toString(),
        "reviewCount": p.reviews.toString()
      }
    };

    let scriptTag = document.getElementById('productJsonLd');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'productJsonLd';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);
  }
};

// Global export
if (typeof window !== 'undefined') {
  window.ProductPage = ProductPage;
}
