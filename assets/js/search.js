document.addEventListener('DOMContentLoaded', () => {
  let searchIndex = [];
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const mobileSearchInput = document.getElementById('mobile-search-input');
  const mobileSearchResults = document.getElementById('mobile-search-results');

  fetch('/assets/js/search-index.json')
    .then(response => response.json())
    .then(data => {
      searchIndex = data;
    })
    .catch(() => {});

  function performSearch(query, resultsContainer) {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = '';
    
    if (!query.trim()) {
      resultsContainer.classList.add('hidden');
      return;
    }

    const filtered = searchIndex.filter(item => {
      const q = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }).slice(0, 8);

    if (filtered.length === 0) {
      resultsContainer.innerHTML = '<div class="p-4 text-sm text-slate-400">No results found</div>';
      resultsContainer.classList.remove('hidden');
      return;
    }

    const html = filtered.map(item => `
      <a href="${item.url}" class="block p-3 hover:bg-slate-700 transition-colors border-b border-slate-700/50 last:border-0">
        <div class="flex items-center justify-between">
          <span class="font-medium text-sm text-white">${item.title}</span>
          <span class="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-semibold border border-emerald-500/20">${item.type}</span>
        </div>
        <p class="text-xs text-slate-400 mt-1 line-clamp-1">${item.description}</p>
      </a>
    `).join('');

    resultsContainer.innerHTML = html;
    resultsContainer.classList.remove('hidden');
  }

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value, searchResults);
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.add('hidden');
      }
    });
  }

  if (mobileSearchInput && mobileSearchResults) {
    mobileSearchInput.addEventListener('input', (e) => {
      performSearch(e.target.value, mobileSearchResults);
    });

    document.addEventListener('click', (e) => {
      if (!mobileSearchInput.contains(e.target) && !mobileSearchResults.contains(e.target)) {
        mobileSearchResults.classList.add('hidden');
      }
    });
  }
});
