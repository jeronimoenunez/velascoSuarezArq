document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const sideMenu = document.querySelector('.side-menu');
  const searchInput = document.querySelector('.search-input');
  const searchClose = document.querySelector('.search-close');
  const overlay = document.getElementById('overlay');
  const chipContainer = document.getElementById('keyword-chips');
  const clearBtn = document.getElementById('clear-history');
  const suggestionBox = document.getElementById('suggestion-box');
  const searchIcon = document.querySelector('.search-icon');

  const searchData = [
    { title: "Casa en la Sierra", type: "Proyecto", url: "/proyectos/casa-sierra", icon: "🏡" },
    { title: "Equipo Principal", type: "Sección", url: "/contacto#equipo", icon: "👤" },
    { title: "Noticias 2024", type: "Noticia", url: "/contacto#noticias", icon: "📰" },
    { title: "Valores y Ética", type: "Nosotros", url: "/nosotros#etica", icon: "📖" },
    { title: "Contacto Directo", type: "Sección", url: "/contacto", icon: "✉️" },
    { title: "Premios Recientes", type: "Historia", url: "/nosotros#premios", icon: "🏆" },
    { title: "Carreras Profesionales", type: "Careers", url: "/contacto#careers", icon: "💼" },
    { title: "Sobre Nosotros", type: "About", url: "/nosotros#about", icon: "ℹ️" },
    { title: "Servicios Ofrecidos", type: "Sección", url: "/nosotros#servicios", icon: "🛠️" }
  ];

  const keywords = [
    "casa", "vivienda", "centro", "montaña", "urbano", "rural",
    "paisaje", "arquitectura", "proyecto", "historia", "noticia",
    "equipo", "contacto", "sierra", "premios", "ética", "valor",
    "incorpora", "contáctanos", "noticias", "carreras profesionales", "about"
  ];

  const synonyms = {
    arquitectura: ["diseño", "estructura", "edificio", "construcción"],
    casa: ["hogar", "vivienda", "residencia"],
    urbano: ["ciudad", "metrópolis", "centro"],
    montania: ["cordillera", "alturas"],
    contacto: ["mensaje", "consultar", "llamar"],
    premios: ["reconocimiento", "logros"],
    historia: ["trayectoria", "pasado"],
    incorpora: ["servicios", "prestaciones"],
    contactanos: ["contacto", "mensaje"],
    about: ["nosotros", "quienes somos"]
  };

  const redirects = {
    incorpora: "/nosotros#servicios",
    contactanos: "/contacto",
    noticias: "/contacto#noticias","carreras profesionales": "/contacto#careers",
    about: "/nosotros#about"
  };

  const getSynonyms = (term) => synonyms[term] || [];

  const saveSearchTerm = (term) => {
    if (!term) return;
    let history = JSON.parse(localStorage.getItem('searchHistory')) || {};
    history[term] = (history[term] || 0) + 1;
    localStorage.setItem('searchHistory', JSON.stringify(history));
  };

  const getSearchHistory = () => {
    const raw = JSON.parse(localStorage.getItem('searchHistory')) || {};
    return Object.entries(raw)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([term]) => term);
  };

  const clearSearchHistory = () => localStorage.removeItem('searchHistory');

  const renderSuggestions = (items) => {
    suggestionBox.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 border-b border-gray-100 last:border-none';
      div.innerHTML = `
        <span class="text-sm">${item.icon}</span>
        <span class="text-xs text-gray-500">${item.type}</span>
        <strong class="text-black text-sm">${item.title}</strong>
      `;
      div.addEventListener('click', () => {
        saveSearchTerm(item.title);
        window.location.href = item.url;
      });
      suggestionBox.appendChild(div);
    });
  };

  const renderChips = (terms) => {
    chipContainer.innerHTML = '';
    terms.forEach(term => {
      const chip = document.createElement('div');
      chip.className = 'bg-white text-black px-3 py-1 rounded-full text-sm font-medium shadow hover:bg-gray-200 cursor-pointer';
      chip.textContent = term;
      chip.addEventListener('click', () => {
        searchInput.value = term;
        handleSearch();
      });
      chipContainer.appendChild(chip);
    });
    if (terms.length > 0 || getSearchHistory().length > 0) {
      clearBtn.classList.remove('hidden');
    } else {
      clearBtn.classList.add('hidden');
    }
  };

  const handleSearch = () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      const recent = getSearchHistory();
      if (recent.length > 0) {
        suggestionBox.innerHTML = '<div class="p-2 text-gray-500">Tus búsquedas recientes:</div>';
        renderChips(recent);
      }
      return;
    }

    const terms = query.split(/\s+/).filter(word =>
      keywords.includes(word) || keywords.some(k => getSynonyms(k).includes(word))
    );
    renderChips(terms);

    const filtered = searchData
      .filter(item => {
        const text = item.title.toLowerCase();
        return [query, ...terms].some(term => text.includes(term));
      })
      .slice(0, 6);

    suggestionBox.innerHTML = filtered.length
      ? ''
      : '<div class="p-2 text-gray-500">No se encontraron resultados</div>';

    if (filtered.length) renderSuggestions(filtered);
  };

  searchInput.addEventListener('input', handleSearch);
  searchInput.addEventListener('focus', handleSearch);

  searchIcon?.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    const match = searchData.find(item => item.title.toLowerCase().includes(query));
    if (match) {
      saveSearchTerm(query);
      window.location.href = match.url;
    }
  });

  searchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim().toLowerCase();
      const match = searchData.find(item => item.title.toLowerCase().includes(query));
      if (match) {
        saveSearchTerm(query);
        window.location.href = match.url;
      } else if (redirects[query]) {
        saveSearchTerm(query);
        window.location.href = redirects[query];
      } else {
        suggestionBox.innerHTML = '<div class="p-2 text-gray-500">No se encontraron resultados</div>';
      }
    }
  });

  toggle?.addEventListener('click', () => {
  sideMenu.classList.add('expanded', 'side-open');
  overlay.classList.remove('hidden');
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'auto';
  toggle.style.zIndex = '0';
  document.body.style.overflow = 'hidden';
  handleSearch();
});

  const closeMenu = () => {
    sideMenu.classList.remove('expanded', 'side-open');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    setTimeout(() => overlay.classList.add('hidden'), 300);
    toggle.style.zIndex = '1100';
    document.body.style.overflow = '';
  };

  searchClose?.addEventListener('click', () => {
    searchInput.value = '';
    chipContainer.innerHTML = '';
    suggestionBox.innerHTML = '';
    closeMenu();
  });

  overlay?.addEventListener('click', () => {
    closeMenu();
  });

  clearBtn?.addEventListener('click', () => {
    clearSearchHistory();
    chipContainer.innerHTML = '';
    suggestionBox.innerHTML = '';
    renderChips([]);
  });
});
