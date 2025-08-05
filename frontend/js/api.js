// API Configuration
const API_BASE_URL = "http://localhost:4000";

// API Service Class
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Get all posts
  async getPosts() {
    return this.request("/posts");
  }

  // Create a new post
  async createPost(postData) {
    return this.request("/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    });
  }

  // Upload image
  async uploadImage(formData) {
    return this.request("/upload", {
      method: "POST",
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  }

  // Update post with AI-generated description
  async updatePostWithAI(postId, altText) {
    return this.request(`/upload/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ alt: altText }),
    });
  }

  // Get image URL
  getImageUrl(imageName) {
    return `${this.baseUrl}/${imageName}`;
  }
}

// Create global API instance
window.api = new ApiService(API_BASE_URL);
