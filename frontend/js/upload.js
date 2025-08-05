// Upload functionality
class UploadManager {
  constructor() {
    this.modal = document.getElementById("upload-modal");
    this.form = document.getElementById("upload-form");
    this.fileInput = document.getElementById("file-input");
    this.uploadArea = document.getElementById("upload-area");
    this.selectedFile = null;

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Modal controls
    document
      .getElementById("upload-btn")
      .addEventListener("click", () => this.openModal());
    document
      .getElementById("first-upload")
      .addEventListener("click", () => this.openModal());
    document
      .getElementById("close-modal")
      .addEventListener("click", () => this.closeModal());
    document
      .getElementById("cancel-upload")
      .addEventListener("click", () => this.closeModal());

    // Click outside modal to close
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Upload area interactions
    this.uploadArea.addEventListener("click", () => this.fileInput.click());
    this.uploadArea.addEventListener("dragover", (e) => this.handleDragOver(e));
    this.uploadArea.addEventListener("dragleave", (e) =>
      this.handleDragLeave(e)
    );
    this.uploadArea.addEventListener("drop", (e) => this.handleDrop(e));

    // File input change
    this.fileInput.addEventListener("change", (e) => this.handleFileSelect(e));

    // Form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  openModal() {
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
    this.resetForm();
  }

  closeModal() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "";
    this.resetForm();
  }

  resetForm() {
    this.form.reset();
    this.selectedFile = null;
    this.uploadArea.classList.remove("has-file");
    this.updateUploadAreaText();
  }

  handleDragOver(e) {
    e.preventDefault();
    this.uploadArea.classList.add("dragover");
  }

  handleDragLeave(e) {
    e.preventDefault();
    this.uploadArea.classList.remove("dragover");
  }

  handleDrop(e) {
    e.preventDefault();
    this.uploadArea.classList.remove("dragover");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

  handleFile(file) {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      showToast("Por favor, selecione apenas arquivos de imagem.", "error");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToast("A imagem deve ter no máximo 10MB.", "error");
      return;
    }

    this.selectedFile = file;
    this.uploadArea.classList.add("has-file");
    this.updateUploadAreaText();
  }

  updateUploadAreaText() {
    const icon = this.uploadArea.querySelector("i");
    const text = this.uploadArea.querySelector("p");

    if (this.selectedFile) {
      icon.className = "fas fa-check-circle";
      text.textContent = `Arquivo selecionado: ${this.selectedFile.name}`;
    } else {
      icon.className = "fas fa-cloud-upload-alt";
      text.textContent = "Arraste uma foto aqui ou clique para selecionar";
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.selectedFile) {
      showToast("Por favor, selecione uma imagem.", "error");
      return;
    }

    const submitBtn = document.getElementById("submit-upload");
    const originalText = submitBtn.textContent;

    try {
      // Disable submit button
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Enviando...';

      // Prepare form data
      const formData = new FormData();
      formData.append("imagem", this.selectedFile);

      const descricao = document.getElementById("descricao").value.trim();
      const alt = document.getElementById("alt").value.trim();

      if (descricao) {
        formData.append("descricao", descricao);
      }
      if (alt) {
        formData.append("alt", alt);
      }

      // Upload image
      const result = await window.api.uploadImage(formData);

      showToast("Imagem enviada com sucesso!", "success");
      this.closeModal();

      // Refresh feed
      if (window.feedManager) {
        window.feedManager.loadPosts();
      }
    } catch (error) {
      console.error("Upload error:", error);
      showToast("Erro ao enviar imagem. Tente novamente.", "error");
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
}

// Initialize upload manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.uploadManager = new UploadManager();
});
