// Feed functionality
class FeedManager {
  constructor() {
    this.postsContainer = document.getElementById("posts-container");
    this.loading = document.getElementById("loading");
    this.emptyState = document.getElementById("empty-state");
    this.posts = [];

    this.loadPosts();
  }

  async loadPosts() {
    try {
      this.showLoading();
      this.posts = await window.api.getPosts();
      this.renderPosts();
    } catch (error) {
      console.error("Error loading posts:", error);
      showToast("Erro ao carregar posts. Verifique sua conexão.", "error");
      this.showEmptyState();
    }
  }

  showLoading() {
    this.loading.style.display = "block";
    this.emptyState.style.display = "none";
    this.postsContainer.innerHTML = "";
  }

  hideLoading() {
    this.loading.style.display = "none";
  }

  showEmptyState() {
    this.hideLoading();
    this.emptyState.style.display = "block";
    this.postsContainer.innerHTML = "";
  }

  renderPosts() {
    this.hideLoading();

    if (this.posts.length === 0) {
      this.showEmptyState();
      return;
    }

    this.emptyState.style.display = "none";

    // Sort posts by creation date (newest first)
    const sortedPosts = [...this.posts].reverse();

    this.postsContainer.innerHTML = sortedPosts
      .map((post) => this.createPostHTML(post))
      .join("");

    // Add event listeners to generated posts
    this.addPostEventListeners();
  }

  createPostHTML(post) {
    const imageUrl = window.api.getImageUrl(post.imgUrl || `${post._id}.png`);
    const hasDescription = post.descricao && post.descricao.trim();
    const timeAgo = this.getTimeAgo(post._id);

    return `
            <article class="post" data-post-id="${post._id}">
                <header class="post-header">
                    <div class="post-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="post-info">
                        <h4>instalike_user</h4>
                        <span class="post-time">${timeAgo}</span>
                    </div>
                </header>
                
                <img 
                    src="${imageUrl}" 
                    alt="${post.alt || "Imagem do post"}"
                    class="post-image"
                    onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzE3Mi4zODYgMTUwIDE1MCAyMjcuNjE0IDE1MCAyNTBDMTUwIDI3Mi4zODYgMTcyLjM4NiAzMDAgMjAwIDMwMEMyMjcuNjE0IDMwMCAyNTAgMjcyLjM4NiAyNTAgMjUwQzI1MCAyMjcuNjE0IDIyNy42MTQgMTUwIDIwMCAxNTBaIiBmaWxsPSIjREJEQkRCIi8+CjxwYXRoIGQ9Ik0xNzUgMjI1SDIyNUwyMDAgMjAwTDE3NSAyMjVaIiBmaWxsPSIjOEU4RThFIi8+CjwvZz4+Cjwvc3ZnPgo=';"
                >
                
                <div class="post-actions">
                    <button class="action-btn like-btn" data-post-id="${
                      post._id
                    }">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn">
                        <i class="far fa-comment"></i>
                    </button>
                    <button class="action-btn">
                        <i class="far fa-paper-plane"></i>
                    </button>
                </div>
                
                <div class="post-content">
                    ${
                      !hasDescription
                        ? `
                        <button class="generate-description" data-post-id="${post._id}">
                            <i class="fas fa-magic"></i> Gerar descrição com IA
                        </button>
                    `
                        : ""
                    }
                    
                    ${
                      hasDescription
                        ? `
                        <p class="post-description ${
                          post.descricao?.includes("Gere uma descrição")
                            ? "generated"
                            : ""
                        }">
                            ${post.descricao}
                        </p>
                    `
                        : ""
                    }
                </div>
            </article>
        `;
  }

  addPostEventListeners() {
    // Like buttons
    document.querySelectorAll(".like-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleLike(e));
    });

    // Generate description buttons
    document.querySelectorAll(".generate-description").forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleGenerateDescription(e));
    });
  }

  handleLike(e) {
    const btn = e.currentTarget;
    const icon = btn.querySelector("i");

    if (icon.classList.contains("far")) {
      icon.classList.remove("far");
      icon.classList.add("fas");
      btn.classList.add("liked");
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far");
      btn.classList.remove("liked");
    }
  }

  async handleGenerateDescription(e) {
    const btn = e.currentTarget;
    const postId = btn.dataset.postId;
    const originalHTML = btn.innerHTML;

    try {
      // Disable button and show loading
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando...';

      // Call API to generate description
      await window.api.updatePostWithAI(
        postId,
        "Imagem gerada automaticamente"
      );

      showToast("Descrição gerada com sucesso!", "success");

      // Reload posts to show new description
      await this.loadPosts();
    } catch (error) {
      console.error("Error generating description:", error);
      showToast("Erro ao gerar descrição. Tente novamente.", "error");

      // Restore button
      btn.disabled = false;
      btn.innerHTML = originalHTML;
    }
  }

  getTimeAgo(mongoId) {
    try {
      // Extract timestamp from MongoDB ObjectId
      const timestamp = parseInt(mongoId.substring(0, 8), 16) * 1000;
      const now = Date.now();
      const diff = now - timestamp;

      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (minutes < 1) return "agora";
      if (minutes < 60) return `${minutes}m`;
      if (hours < 24) return `${hours}h`;
      if (days < 7) return `${days}d`;

      return new Date(timestamp).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });
    } catch (error) {
      return "há pouco";
    }
  }
}

// Initialize feed manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.feedManager = new FeedManager();
});
