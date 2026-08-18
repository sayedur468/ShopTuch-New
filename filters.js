/**
 * ==========================================================================
 * SHOPTUCH — SHOP & CATEGORY FILTERING ENGINE
 * Multi-Faceted Filters, Sorting, URL Sync, View Modes & Product Grid
 * ==========================================================================
 */

const FilterManager = {
  state: {
    search: '',
    category: '',
    gender: '',
    sizes: [],
    colors: [],
    minPrice: 0,
    maxPrice: 500,
    rating: 0,
    inStockOnly: false,
    sort: 'featured',
    viewMode: 'grid-4',
    page: 1,
    perPage: 12
  },

  init: function() {
    this.readURLParams();
    this.bindEvents();
    this.render();
  },

  readURLParams: function() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('search')) this.state.search = params.get('search');
    if (params.has('cat') || params.has('category')) this.state.category = params.get('cat') || params.get('category');
    if (params.has('gender')) this.state.gender = params.get('gender');
    if (params.has('sort')) this.state.sort = params.get('sort');
    if (params.has('size')) this.state.sizes = params.get('size').split(',');
    if (params.has('color')) this.state.colors = params.get('color').split(',');
    if (params.has('minPrice')) this.state.minPrice = parseFloat(params.get('minPrice'));
    if (params.has('maxPrice')) this.state.maxPrice = parseFloat(params.get('maxPrice'));
    if (params.has('rating')) this.state.rating = parseFloat(params.get('rating'));
    if (params.has('inStock')) this.state.inStockOnly = params.get('inStock') === 'true';
  },

  syncURL: function() {
    const params = new URLSearchParams();
    if (this.state.search) params.set('search', this.state.search);
    if (this.state.category) params.set('category', this.state.category);
    if (this.state.gender) params.set('gender', this.state.gender);
    if (this.state.sort && this.state.sort !== 'featured') params.set('sort', this.state.sort);
    if (this.state.sizes.length > 0) params.set('size', this.state.sizes.join(','));
    if (this.state.colors.length > 0) params.set('color', this.state.colors.join(','));
    if (this.state.minPrice > 0) params.set('minPrice', this.state.minPrice.toString());
    if (this.state.maxPrice < 500) params.set('maxPrice', this.state.maxPrice.toString());
    if (this.state.rating > 0) params.set('rating', this.state.rating.toString());
    if (this.state.inStockOnly) params.set('inStock', 'true');

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  },

  bindEvents: function() {
    // Sort dropdown change
    const sortSelect = document.getElementById('catalogSortSelect');
    if (sortSelect) {
      sortSelect.value = this.state.sort;
      sortSelect.addEventListener('change', (e) => {
        this.state.sort = e.target.value;
        this.syncURL();
        this.render();
      });
    }

    // View mode switchers
    document.querySelectorAll('[data-view-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-view-mode');
        this.setViewMode(mode);
      });
    });

    // Mobile filter drawer open / close
    const mobileFilterOpen = document.getElementById('mobileFilterTrigger');
    const mobileFilterClose = document.getElementById('mobileFilterClose');
    const filterDrawer = document.getElementById('filterDrawer');
    const filterBackdrop = document.getElementById('filterDrawerBackdrop');

    if (mobileFilterOpen && filterDrawer && filterBackdrop) {
      mobileFilterOpen.addEventListener('click', () => {
        filterDrawer.classList.add('open');
        filterBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (mobileFilterClose && filterDrawer && filterBackdrop) {
      const closeDrawer = () => {
        filterDrawer.classList.remove('open');
        filterBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      };
      mobileFilterClose.addEventListener('click', closeDrawer);
      filterBackdrop.addEventListener('click', closeDrawer);
    }
  },

  setViewMode: function(mode) {
    this.state.viewMode = mode;
    document.querySelectorAll('[data-view-mode]').forEach(btn => {
      if (btn.getAttribute('data-view-mode') === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const grid = document.getElementById('shopProductGrid');
    if (grid) {
      grid.className = 'product-grid ' + (mode === 'grid-3' ? 'grid-3' : mode === 'list' ? 'product-list-view' : 'grid-4');
    }
  },

  setFilter: function(key, value) {
    this.state[key] = value;
    this.state.page = 1;
    this.syncURL();
    this.render();
  },

  toggleArrayFilter: function(key, value) {
    const list = this.state[key] || [];
    const index = list.indexOf(value);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(value);
    }
    this.state[key] = list;
    this.state.page = 1;
    this.syncURL();
    this.render();
  },

  clearAllFilters: function() {
    this.state.search = '';
    this.state.category = '';
    this.state.gender = '';
    this.state.sizes = [];
    this.state.colors = [];
    this.state.minPrice = 0;
    this.state.maxPrice = 500;
    this.state.rating = 0;
    this.state.inStockOnly = false;
    this.state.page = 1;
    this.syncURL();
    this.render();
  },

  getFilteredProducts: function() {
    let products = ProductService.getAll();

    // 1. Search Query
    if (this.state.search) {
      const q = this.state.search.toLowerCase();
      products = products.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // 2. Category
    if (this.state.category) {
      const rawCat = this.state.category.toLowerCase().trim();
      const normCat = rawCat.replace(/[^a-z0-9]/g, '');
      
      products = products.filter(p => {
        const pCat = (p.category || '').toLowerCase();
        const pNormCat = pCat.replace(/[^a-z0-9]/g, '');
        const pSub = (p.subcategory || '').toLowerCase();
        const pGen = (p.gender || '').toLowerCase();
        const pTags = (p.tags || []).map(t => t.toLowerCase());

        // Exact match on category, subcategory, or gender
        if (pCat === rawCat || pNormCat === normCat || pGen === rawCat || pSub.includes(rawCat)) {
          return true;
        }

        // Multi-Category Store Mappings (All 8 Core Departments)
        if (normCat === 'fashion') {
          return pCat !== 'Electronics' && pCat !== 'Home & Living' && pCat !== 'Beauty' && pCat !== 'Watches';
        }
        if (normCat === 'electronics' || normCat === 'tech') {
          return pCat === 'Electronics' || pNormCat.includes('electronic') || pNormCat.includes('audio') || pTags.some(t => t.includes('electronic') || t.includes('audio') || t.includes('headphone') || t.includes('tech'));
        }
        if (normCat === 'homeliving' || normCat === 'home' || normCat === 'living') {
          return pCat === 'Home & Living' || pNormCat.includes('home') || pNormCat.includes('living') || pTags.some(t => t.includes('home') || t.includes('living') || t.includes('vase') || t.includes('decor') || t.includes('candle') || t.includes('ceramic'));
        }
        if (normCat === 'beauty' || normCat === 'skincare' || normCat === 'wellness') {
          return pCat === 'Beauty' || pNormCat.includes('beauty') || pTags.some(t => t.includes('beauty') || t.includes('skincare') || t.includes('oil') || t.includes('wellness') || t.includes('cosmetic'));
        }
        if (normCat === 'watches' || normCat === 'watch' || normCat === 'timepiece') {
          return pCat === 'Watches' || pNormCat.includes('watch') || pTags.some(t => t.includes('watch') || t.includes('timepiece') || t.includes('chronograph'));
        }
        if (normCat === 'bags' || normCat === 'bag') {
          return pSub.includes('bag') || pNormCat.includes('bag') || pTags.some(t => t.includes('bag') || t.includes('tote') || t.includes('crossbody') || t.includes('handbag'));
        }
        if (normCat === 'shoes' || normCat === 'shoe' || normCat === 'footwear') {
          return pCat === 'Shoes' || pNormCat.includes('shoe') || pTags.some(t => t.includes('shoes') || t.includes('boots') || t.includes('sneakers') || t.includes('loafers') || t.includes('footwear'));
        }
        if (normCat === 'accessories' || normCat === 'accessory' || normCat === 'jewelry') {
          return pCat === 'Accessories' || pNormCat.includes('access') || pTags.some(t => t.includes('accessories') || t.includes('jewelry') || t.includes('belt') || t.includes('sunglasses') || t.includes('bag') || t.includes('tote') || t.includes('crossbody') || t.includes('scarf') || t.includes('beanie') || t.includes('hat') || t.includes('necklace'));
        }

        // Subcategory & Specific garment mappings
        if (normCat === 'jackets' || normCat === 'jacket' || normCat === 'outerwear' || normCat === 'coats') {
          return pCat === 'Outerwear' || pCat === 'Jackets' || pNormCat.includes('outerwear') || pNormCat.includes('jacket') || pTags.some(t => t.includes('jacket') || t.includes('coat') || t.includes('puffer') || t.includes('trench') || t.includes('vest') || t.includes('shacket'));
        }
        if (normCat === 'jeans' || normCat === 'denim') {
          return pNormCat.includes('jean') || pNormCat.includes('denim') || pTags.some(t => t.includes('jean') || t.includes('denim') || t.includes('selvedge'));
        }
        if (normCat === 'hoodies' || normCat === 'hoodie' || normCat === 'sweatshirts') {
          return pNormCat.includes('hoodie') || pNormCat.includes('sweatshirt') || pTags.some(t => t.includes('hoodie') || t.includes('sweatshirt'));
        }
        if (normCat === 'dresses' || normCat === 'dress') {
          return pNormCat.includes('dress') || pNormCat.includes('gown') || pTags.some(t => t.includes('dress') || t.includes('slip') || t.includes('evening'));
        }
        if (normCat === 'tops' || normCat === 'top' || normCat === 'shirts' || normCat === 'tshirts') {
          return pCat === 'Tops' || pCat === 'Shirts' || pNormCat.includes('top') || pNormCat.includes('shirt') || pTags.some(t => t.includes('top') || t.includes('shirt') || t.includes('tee') || t.includes('knitwear') || t.includes('sweater') || t.includes('cardigan') || t.includes('tank'));
        }
        if (normCat === 'bottoms' || normCat === 'bottom' || normCat === 'pants' || normCat === 'trousers' || normCat === 'skirts') {
          return pCat === 'Bottoms' || pNormCat.includes('bottom') || pNormCat.includes('trouser') || pNormCat.includes('skirt') || pTags.some(t => t.includes('bottom') || t.includes('trouser') || t.includes('skirt') || t.includes('pants') || t.includes('chino'));
        }

        return pTags.some(t => t.replace(/[^a-z0-9]/g, '') === normCat);
      });
    }

    // 3. Gender
    if (this.state.gender) {
      const g = this.state.gender.toLowerCase();
      products = products.filter(p =>
        p.gender.toLowerCase() === g || p.gender.toLowerCase() === 'unisex'
      );
    }

    // 4. Sizes
    if (this.state.sizes.length > 0) {
      products = products.filter(p =>
        p.sizes && p.sizes.some(s => this.state.sizes.includes(s))
      );
    }

    // 5. Colors
    if (this.state.colors.length > 0) {
      products = products.filter(p =>
        p.colors && p.colors.some(c => this.state.colors.includes(c.name))
      );
    }

    // 6. Price Range
    products = products.filter(p =>
      p.price >= this.state.minPrice && p.price <= this.state.maxPrice
    );

    // 7. Rating
    if (this.state.rating > 0) {
      products = products.filter(p => p.rating >= this.state.rating);
    }

    // 8. In Stock Only
    if (this.state.inStockOnly) {
      products = products.filter(p => p.stock > 0);
    }

    // 9. Sorting
    switch (this.state.sort) {
      case 'newest':
        products.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'bestseller':
        products.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
      case 'featured':
      default:
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return products;
  },

  render: function() {
    const grid = document.getElementById('shopProductGrid');
    const countEl = document.getElementById('shopProductCount');
    const activeChipsEl = document.getElementById('activeFilterChips');
    const sidebarContainer = document.getElementById('shopSidebarFilters');
    const mobileDrawerContainer = document.getElementById('mobileDrawerFilterContent');

    if (!grid) return;

    const filtered = this.getFilteredProducts();
    const totalCount = filtered.length;

    // Render count
    if (countEl) {
      countEl.textContent = `Showing ${Math.min(totalCount, this.state.page * this.state.perPage)} of ${totalCount} products`;
    }

    // Render active filter chips
    if (activeChipsEl) {
      this.renderActiveChips(activeChipsEl);
    }

    // Render Sidebar / Drawer widgets
    if (sidebarContainer) {
      sidebarContainer.innerHTML = this.generateFilterHTML();
    }
    if (mobileDrawerContainer) {
      mobileDrawerContainer.innerHTML = this.generateFilterHTML();
    }

    // Render Product Grid
    if (totalCount === 0) {
      grid.innerHTML = `
        <div class="text-center" style="grid-column: 1 / -1; padding: 64px 16px;">
          <h3 class="font-serif" style="font-size: 1.6rem; margin-bottom: 8px;">No matching products found</h3>
          <p class="text-muted" style="margin-bottom: 24px;">Try expanding your filter criteria or clear active filters.</p>
          <button class="btn btn-primary btn-sm" onclick="FilterManager.clearAllFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    const paginated = filtered.slice(0, this.state.page * this.state.perPage);

    grid.innerHTML = paginated.map(p => this.generateCardHTML(p)).join('');

    // Update wishlist active states on rendered cards
    if (typeof Wishlist !== 'undefined') {
      Wishlist.updateButtons();
    }

    // Render Load More button if more products exist
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    if (loadMoreContainer) {
      if (paginated.length < totalCount) {
        loadMoreContainer.style.display = 'block';
        loadMoreContainer.innerHTML = `
          <button class="btn btn-secondary" onclick="FilterManager.loadMore()">
            Load More Products (${totalCount - paginated.length} remaining)
          </button>
        `;
      } else {
        loadMoreContainer.style.display = 'none';
      }
    }
  },

  loadMore: function() {
    this.state.page++;
    this.render();
  },

  renderActiveChips: function(container) {
    const chips = [];

    if (this.state.search) chips.push({ label: `Search: "${this.state.search}"`, key: 'search', val: '' });
    if (this.state.category) chips.push({ label: `Category: ${this.state.category}`, key: 'category', val: '' });
    if (this.state.gender) chips.push({ label: `Gender: ${this.state.gender}`, key: 'gender', val: '' });
    if (this.state.inStockOnly) chips.push({ label: 'In Stock Only', key: 'inStockOnly', val: false });
    if (this.state.rating > 0) chips.push({ label: `${this.state.rating}+ Stars`, key: 'rating', val: 0 });
    if (this.state.minPrice > 0 || this.state.maxPrice < 500) {
      chips.push({ label: `$${this.state.minPrice} – $${this.state.maxPrice}`, key: 'price', val: null });
    }

    this.state.sizes.forEach(s => chips.push({ label: `Size: ${s}`, key: 'sizes', val: s, isArray: true }));
    this.state.colors.forEach(c => chips.push({ label: `Color: ${c}`, key: 'colors', val: c, isArray: true }));

    if (chips.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div class="flex items-center gap-2 flex-wrap" style="margin-bottom: 20px;">
        <span class="text-xs font-bold uppercase text-muted">Active Filters:</span>
        ${chips.map(chip => `
          <span class="badge badge-outline" style="padding: 6px 10px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" onclick="${chip.isArray ? `FilterManager.toggleArrayFilter('${chip.key}', '${chip.val}')` : chip.key === 'price' ? `FilterManager.setFilter('minPrice', 0); FilterManager.setFilter('maxPrice', 500);` : `FilterManager.setFilter('${chip.key}', ${typeof chip.val === 'string' ? `'${chip.val}'` : chip.val})`}">
            ${chip.label} ✕
          </span>
        `).join('')}
        <button class="text-xs text-danger font-semibold" onclick="FilterManager.clearAllFilters()" style="margin-left: 8px;">Clear All</button>
      </div>
    `;
  },

  generateCardHTML: function(product) {
    const isWishlisted = typeof Wishlist !== 'undefined' && Wishlist.has(product.id);
    return `
      <div class="product-card">
        <div class="product-image-container">
          <img src="${product.images[0]}" alt="${product.title}" loading="lazy" onerror="this.src='assets/images/logo/shoptuch-logo.svg'"/>
          <div class="product-badges">
            ${product.discount ? `<span class="badge badge-sale">${product.discount}% OFF</span>` : ''}
            ${product.newArrival ? `<span class="badge badge-new">NEW</span>` : ''}
            ${product.bestseller ? `<span class="badge badge-best">BESTSELLER</span>` : ''}
          </div>
          <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" data-wishlist-id="${product.id}" onclick="Wishlist.toggle('${product.id}')" title="Save to Wishlist" aria-label="Wishlist">
            <svg width="16" height="16" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
          <div class="quick-view-overlay">
            <button class="quick-view-btn" onclick="openQuickView('${product.id}')">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              Quick View
            </button>
          </div>
        </div>
        <div class="product-details">
          <span class="product-brand">${product.brand}</span>
          <a href="product.html?id=${product.id}" class="product-title">${product.title}</a>
          <div class="product-rating">
            <div class="rating-stars">★★★★★</div>
            <span class="rating-count">(${product.reviews})</span>
          </div>
          <div class="product-price-row">
            <span class="current-price">${ProductService.formatPrice(product.price)}</span>
            ${product.comparePrice ? `<span class="compare-price">${ProductService.formatPrice(product.comparePrice)}</span>` : ''}
            ${product.discount ? `<span class="discount-tag">${product.discount}% OFF</span>` : ''}
          </div>
          <div class="product-card-footer">
            <div class="color-swatches">
              ${product.colors ? product.colors.map(c => `
                <span class="color-swatch" style="background-color: ${c.hex};" title="${c.name}"></span>
              `).join('') : ''}
            </div>
            <button class="add-to-cart-btn-mini" onclick="Cart.addItem('${product.id}')">
              + Add
            </button>
          </div>
        </div>
      </div>
    `;
  },

  generateFilterHTML: function() {
    const categories = ['Women', 'Men', 'Dresses', 'Tops', 'Bottoms', 'Jeans', 'Hoodies', 'Jackets', 'Outerwear', 'Shirts', 'Shoes', 'Accessories'];
    const genders = ['Women', 'Men', 'Unisex'];
    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '38', '39', '40', '41', '42', '43', '44'];
    const commonColors = [
      { name: 'Onyx Black', hex: '#141414' },
      { name: 'Raw Ecru', hex: '#E8E4DC' },
      { name: 'Camel Melton', hex: '#B88E5D' },
      { name: 'Midnight Navy', hex: '#17202A' },
      { name: 'Tuscan Tan', hex: '#8A5A36' },
      { name: 'Forest Moss', hex: '#3B4A3E' }
    ];

    return `
      <!-- Category Filter -->
      <div class="form-group" style="margin-bottom: 24px;">
        <h5 class="form-label uppercase tracking-wider" style="font-size: 0.75rem;">DEPARTMENT / CATEGORY</h5>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label class="form-check text-sm">
            <input type="radio" name="filterCat" ${!this.state.category ? 'checked' : ''} onchange="FilterManager.setFilter('category', '')"/>
            <span>All Departments</span>
          </label>
          ${categories.map(c => `
            <label class="form-check text-sm">
              <input type="radio" name="filterCat" ${this.state.category.toLowerCase() === c.toLowerCase() ? 'checked' : ''} onchange="FilterManager.setFilter('category', '${c.toLowerCase()}')"/>
              <span>${c}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Gender Filter -->
      <div class="form-group" style="margin-bottom: 24px;">
        <h5 class="form-label uppercase tracking-wider" style="font-size: 0.75rem;">GENDER</h5>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label class="form-check text-sm">
            <input type="radio" name="filterGender" ${!this.state.gender ? 'checked' : ''} onchange="FilterManager.setFilter('gender', '')"/>
            <span>All Genders</span>
          </label>
          ${genders.map(g => `
            <label class="form-check text-sm">
              <input type="radio" name="filterGender" ${this.state.gender.toLowerCase() === g.toLowerCase() ? 'checked' : ''} onchange="FilterManager.setFilter('gender', '${g.toLowerCase()}')"/>
              <span>${g}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Price Filter -->
      <div class="form-group" style="margin-bottom: 24px;">
        <h5 class="form-label uppercase tracking-wider" style="font-size: 0.75rem;">PRICE RANGE</h5>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label class="form-check text-sm">
            <input type="radio" name="filterPrice" ${this.state.minPrice === 0 && this.state.maxPrice === 500 ? 'checked' : ''} onchange="FilterManager.setFilter('minPrice', 0); FilterManager.setFilter('maxPrice', 500);"/>
            <span>All Prices</span>
          </label>
          <label class="form-check text-sm">
            <input type="radio" name="filterPrice" ${this.state.maxPrice === 50 && this.state.minPrice === 0 ? 'checked' : ''} onchange="FilterManager.setFilter('minPrice', 0); FilterManager.setFilter('maxPrice', 50);"/>
            <span>Under $50</span>
          </label>
          <label class="form-check text-sm">
            <input type="radio" name="filterPrice" ${this.state.minPrice === 50 && this.state.maxPrice === 100 ? 'checked' : ''} onchange="FilterManager.setFilter('minPrice', 50); FilterManager.setFilter('maxPrice', 100);"/>
            <span>$50 – $100</span>
          </label>
          <label class="form-check text-sm">
            <input type="radio" name="filterPrice" ${this.state.minPrice === 100 && this.state.maxPrice === 200 ? 'checked' : ''} onchange="FilterManager.setFilter('minPrice', 100); FilterManager.setFilter('maxPrice', 200);"/>
            <span>$100 – $200</span>
          </label>
          <label class="form-check text-sm">
            <input type="radio" name="filterPrice" ${this.state.minPrice === 200 ? 'checked' : ''} onchange="FilterManager.setFilter('minPrice', 200); FilterManager.setFilter('maxPrice', 1000);"/>
            <span>$200 and Above</span>
          </label>
        </div>
      </div>

      <!-- Size Filter Pills -->
      <div class="form-group" style="margin-bottom: 24px;">
        <h5 class="form-label uppercase tracking-wider" style="font-size: 0.75rem;">SIZES</h5>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${availableSizes.map(s => {
            const active = this.state.sizes.includes(s);
            return `
              <button type="button" class="btn btn-sm ${active ? 'btn-primary' : 'btn-secondary'}" style="padding: 4px 10px; font-size: 0.75rem;" onclick="FilterManager.toggleArrayFilter('sizes', '${s}')">
                ${s}
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Color Filter Swatches -->
      <div class="form-group" style="margin-bottom: 24px;">
        <h5 class="form-label uppercase tracking-wider" style="font-size: 0.75rem;">COLORS</h5>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${commonColors.map(c => {
            const active = this.state.colors.includes(c.name);
            return `
              <label class="form-check text-sm" style="cursor: pointer;">
                <input type="checkbox" ${active ? 'checked' : ''} onchange="FilterManager.toggleArrayFilter('colors', '${c.name}')"/>
                <span class="color-swatch" style="background-color: ${c.hex}; width: 16px; height: 16px;"></span>
                <span>${c.name}</span>
              </label>
            `;
          }).join('')}
        </div>
      </div>

      <!-- In Stock Filter -->
      <div class="form-group" style="margin-bottom: 24px;">
        <label class="form-check text-sm">
          <input type="checkbox" ${this.state.inStockOnly ? 'checked' : ''} onchange="FilterManager.setFilter('inStockOnly', this.checked)"/>
          <span class="font-semibold">In Stock Items Only</span>
        </label>
      </div>

      <!-- Rating Filter -->
      <div class="form-group" style="margin-bottom: 24px;">
        <h5 class="form-label uppercase tracking-wider" style="font-size: 0.75rem;">CUSTOMER RATING</h5>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label class="form-check text-sm">
            <input type="radio" name="filterRating" ${this.state.rating === 0 ? 'checked' : ''} onchange="FilterManager.setFilter('rating', 0)"/>
            <span>All Ratings</span>
          </label>
          <label class="form-check text-sm">
            <input type="radio" name="filterRating" ${this.state.rating === 4.8 ? 'checked' : ''} onchange="FilterManager.setFilter('rating', 4.8)"/>
            <span class="rating-stars">★★★★★</span>
            <span>4.8+ Stars</span>
          </label>
          <label class="form-check text-sm">
            <input type="radio" name="filterRating" ${this.state.rating === 4.5 ? 'checked' : ''} onchange="FilterManager.setFilter('rating', 4.5)"/>
            <span class="rating-stars">★★★★☆</span>
            <span>4.5+ Stars</span>
          </label>
        </div>
      </div>

      <button class="btn btn-secondary btn-block btn-sm" onclick="FilterManager.clearAllFilters()">
        Reset Filters
      </button>
    `;
  }
};

// Global export
if (typeof window !== 'undefined') {
  window.FilterManager = FilterManager;
}
