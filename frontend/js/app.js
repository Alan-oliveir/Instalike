// Main application functionality
class App {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    // Check if API is available
    this.checkApiConnection();

    // Initialize keyboard shortcuts
    this.initializeKeyboardShortcuts();

    // Initialize search functionality
    this.initializeSearch();

    // Check for updates periodically
    this.startAutoRefresh();
  }

  async checkApiConnection() {
    try {
      await window.api.getPosts();
      console.log("✅ API connection successful");
    } catch (error) {
      console.error("❌ API connection failed:", error);
      showToast(
        "Não foi possível conectar ao servidor. Verifique se o backend está rodando.",
        "error"
      );
    }
  }

  initializeKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Ctrl/Cmd + K to open upload modal
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (window.uploadManager) {
          window.uploadManager.openModal();
        }
      }

      // Escape to close modal
      if (e.key === "Escape") {
        const modal = document.getElementById("upload-modal");
        if (modal.classList.contains("active")) {
          window.uploadManager.closeModal();
        }
      }

      // R to refresh feed
      if (e.key === "r" && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        if (
          activeElement.tagName !== "INPUT" &&
          activeElement.tagName !== "TEXTAREA"
        ) {
          e.preventDefault();
          if (window.feedManager) {
            window.feedManager.loadPosts();
            showToast("Feed atualizado!", "success");
          }
        }
      }
    });
  }

  initializeSearch() {
    const searchInput = document.querySelector(".search-input input");
    if (searchInput) {
      let searchTimeout;

      searchInput.addEventListener("input", (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim().toLowerCase();

        if (query.length === 0) {
          this.clearSearch();
          return;
        }

        // Debounce search
        searchTimeout = setTimeout(() => {
          this.performSearch(query);
        }, 300);
      });
    }
  }

  performSearch(query) {
    const posts = document.querySelectorAll(".post");
    let visibleCount = 0;

    posts.forEach((post) => {
      const description =
        post.querySelector(".post-description")?.textContent?.toLowerCase() ||
        "";
      const alt = post.querySelector(".post-image")?.alt?.toLowerCase() || "";

      const matches = description.includes(query) || alt.includes(query);

      if (matches) {
        post.style.display = "block";
        visibleCount++;
      } else {
        post.style.display = "none";
      }
    });

    // Show search results info
    this.showSearchResults(query, visibleCount);
  }

  clearSearch() {
    const posts = document.querySelectorAll(".post");
    posts.forEach((post) => {
      post.style.display = "block";
    });

    this.hideSearchResults();
  }

  showSearchResults(query, count) {
    let resultsInfo = document.getElementById("search-results");
    if (!resultsInfo) {
      resultsInfo = document.createElement("div");
      resultsInfo.id = "search-results";
      resultsInfo.className = "search-results";
      document
        .querySelector(".feed")
        .insertBefore(resultsInfo, document.querySelector(".posts-container"));
    }

    resultsInfo.innerHTML = `
            <p>Resultados para "<strong>${query}</strong>": ${count} post${
      count !== 1 ? "s" : ""
    } encontrado${count !== 1 ? "s" : ""}</p>
            <button onclick="app.clearSearchFromButton()" class="clear-search">
                <i class="fas fa-times"></i> Limpar busca
            </button>
        `;
    resultsInfo.style.display = "block";
  }

  hideSearchResults() {
    const resultsInfo = document.getElementById("search-results");
    if (resultsInfo) {
      resultsInfo.style.display = "none";
    }
  }

  clearSearchFromButton() {
    const searchInput = document.querySelector(".search-input input");
    if (searchInput) {
      searchInput.value = "";
    }
    this.clearSearch();
  }

  startAutoRefresh() {
    // Auto-refresh every 30 seconds if user is active
    setInterval(() => {
      if (!document.hidden && window.feedManager) {
        window.feedManager.loadPosts();
      }
    }, 30000);
  }
}

// Toast notification system
function showToast(message, type = "info", duration = 4000) {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  // Auto remove after duration
  setTimeout(() => {
    toast.style.animation = "toastSlideOut 0.3s ease-in forwards";
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 300);
  }, duration);
}

// Add CSS for search results and toast slide out
const additionalStyles = `
.search-results {
    background: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
}

.search-results p {
    margin: 0;
    color: #262626;
    font-size: 14px;
}

.clear-search {
    background: #efefef;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
    color: #262626;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
}

.clear-search:hover {
    background: #dbdbdb;
}

@keyframes toastSlideOut {
    to {
        opacity: 0;
        transform: translateX(100%);
    }
}

@media (max-width: 768px) {
    .search-results {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .clear-search {
        align-self: flex-end;
    }
}
`;

// Add additional styles to head
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});

// Handle visibility change for auto-refresh
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && window.feedManager) {
    // Refresh when user comes back to tab
    setTimeout(() => {
      window.feedManager.loadPosts();
    }, 1000);
  }
});
