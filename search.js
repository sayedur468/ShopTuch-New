/**
 * ==========================================================================
 * SHOPTUCH — LIVE CLIENT-SIDE SEARCH ENGINE
 * Multi-Attribute Filtering, Highlighting, Recent Searches & Modal UI
 * ==========================================================================
 */

const SearchManager = {
  recentKey: 'shoptuch_recent_searches',
  maxRecents: 6,

  init: function() {
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('searchInputField');
    const closeBtn = document.getElementById('searchCloseBtn');

    if (!modal || !input) return;

    // Live typing listener with debounce
    let debounceTimer;
    input.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        SearchManager.performSearch(e.target.value);
      }, 180);
    });

    // Enter key submits or adds to recent
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim().length > 0) {
        SearchManager.saveRecent(input.value.trim());
      } else if (e.key === 'Escape') {
        SearchManager.close();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => SearchManager.close());
    }

    // Global keyboard shortcut '/' to focus search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        SearchManager.open();
      }
    });
  },

  open: function() {
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('searchInputField');
    if (modal && input) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => input.focus(), 100);
      this.renderRecentsAndSuggestions();
    }
  },

  close: function() {
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('searchInputField');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (input) input.value = '';
    }
  },

  getRecents: function() {
    try {
      const data = localStorage.getItem(this.recentKey);
      return data ? JSON.parse(data) : ['Cashmere', 'Hoodie', 'Silk Dress', 'Trench Coat'];
    } catch (e) {
      return [];
    }
  },

  saveRecent: function(term) {
    if (!term) return;
    let list = this.getRecents().filter(item => item.toLowerCase() !== term.toLowerCase());
    list.unshift(term);
    if (list.length > this.maxRecents) list.pop();
    try {
      localStorage.setItem(this.recentKey, JSON.stringify(list));
    } catch (e) {}
  },

  clearRecents: function() {
    localStorage.removeItem(this.recentKey);
    this.renderRecentsAndSuggestions();
  },

  renderRecentsAndSuggestions: function() {
    const resultsArea = document.getElementById('searchResultsArea');
    if (!resultsArea) return;

    const recents = this.getRecents();
    const popularCategories = ['Women', 'Men', 'Dresses', 'Outerwear', 'Hoodies', 'Shoes', 'Accessories'];

    resultsArea.innerHTML = `
      <div style="margin-bottom: 24px;">
        <div class="flex justify-between items-center" style="margin-bottom: 10px;">
          <h5 class="text-xs tracking-wider text-muted font-bold">RECENT SEARCHES</h5>
          ${recents.length > 0 ? `<button class="text-xs text-muted" onclick="SearchManager.clearRecents()" style="text-decoration: underline;">Clear</button>` : ''}
        </div>
        <div class="search-tags">
          ${recents.map(r => `
            <span class="search-tag-chip" onclick="SearchManager.searchKeyword('${r}')">${r}</span>
          `).join('')}
        </div>
      </div>

      <div>
        <h5 class="text-xs tracking-wider text-muted font-bold" style="margin-bottom: 10px;">POPULAR DEPARTMENTS</h5>
        <div class="search-tags">
          ${popularCategories.map(c => `
            <a href="category.html?cat=${c.toLowerCase()}" class="search-tag-chip" onclick="SearchManager.close()">${c}</a>
          `).join('')}
        </div>
      </div>
    `;
  },

  searchKeyword: function(word) {
    const input = document.getElementById('searchInputField');
    if (input) {
      input.value = word;
      this.performSearch(word);
    }
  },

  performSearch: function(query) {
    const resultsArea = document.getElementById('searchResultsArea');
    if (!resultsArea) return;

    const cleanQuery = query ? query.trim().toLowerCase() : '';
    if (cleanQuery.length === 0) {
      this.renderRecentsAndSuggestions();
      return;
    }

    const allProducts = ProductService.getAll();
    const matches = allProducts.filter(p => {
      const inTitle = p.title.toLowerCase().includes(cleanQuery);
      const inCategory = p.category.toLowerCase().includes(cleanQuery);
      const inSubcategory = p.subcategory && p.subcategory.toLowerCase().includes(cleanQuery);
      const inBrand = p.brand.toLowerCase().includes(cleanQuery);
      const inTags = p.tags && p.tags.some(t => t.toLowerCase().includes(cleanQuery));
      const inDesc = p.description.toLowerCase().includes(cleanQuery);
      return inTitle || inCategory || inSubcategory || inBrand || inTags || inDesc;
    });

    if (matches.length === 0) {
      resultsArea.innerHTML = `
        <div class="text-center" style="padding: 36px 16px;">
          <h4 class="font-serif" style="font-size: 1.35rem; margin-bottom: 8px;">No products found for "${query}"</h4>
          <p class="text-sm text-muted" style="margin-bottom: 20px;">Try another search term or explore our featured curated collections.</p>
          <div class="search-tags" style="justify-content: center;">
            <button class="search-tag-chip" onclick="SearchManager.searchKeyword('Hoodie')">Hoodies</button>
            <button class="search-tag-chip" onclick="SearchManager.searchKeyword('Dress')">Dresses</button>
            <button class="search-tag-chip" onclick="SearchManager.searchKeyword('Wool')">Wool Coats</button>
          </div>
        </div>
      `;
      return;
    }

    // Render Matching Results
    resultsArea.innerHTML = `
      <div class="flex justify-between items-center" style="margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid var(--border);">
        <span class="text-sm font-semibold">${matches.length} result${matches.length > 1 ? 's' : ''} found</span>
        <a href="shop.html?search=${encodeURIComponent(cleanQuery)}" class="text-xs text-accent font-semibold" onclick="SearchManager.close()">View All in Catalog →</a>
      </div>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${matches.slice(0, 6).map(p => `
          <a href="product.html?id=${p.id}" class="flex items-center gap-3" style="padding: 8px; border-radius: var(--radius-xs); transition: background 0.2s;" onmouseover="this.style.background='var(--surface)'" onmouseout="this.style.background='transparent'" onclick="SearchManager.saveRecent('${p.title}'); SearchManager.close();">
            <img src="${p.images[0]}" alt="${p.title}" style="width: 54px; height: 68px; object-fit: cover; border-radius: 4px; background: var(--surface-2);" onerror="this.src='assets/images/logo/shoptuch-logo.svg'"/>
            <div style="flex: 1;">
              <span class="text-xs text-muted uppercase font-semibold">${p.brand}</span>
              <h4 style="font-size: 0.95rem; margin: 2px 0;">${this.highlightMatch(p.title, cleanQuery)}</h4>
              <div class="flex items-center gap-2">
                <span class="font-bold text-sm">${ProductService.formatPrice(p.price)}</span>
                ${p.comparePrice ? `<span class="text-xs text-light text-decoration-line-through">${ProductService.formatPrice(p.comparePrice)}</span>` : ''}
              </div>
            </div>
            <span class="text-xs text-muted">→</span>
          </a>
        `).join('')}
      </div>
    `;
  },

  highlightMatch: function(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark style="background: var(--accent-light); color: var(--accent); padding: 0 2px;">$1</mark>');
  }
};

// Global export
if (typeof window !== 'undefined') {
  window.SearchManager = SearchManager;
}
