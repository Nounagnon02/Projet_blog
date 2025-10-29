import axios from 'axios';

const API_URL = 'https://projet-blog-wg7g.onrender.com/' || 'http://localhost:8000/api';

// Instance Axios pour les requêtes standard
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json'
  }
});

// Fonctions pour les articles (avec fetch pour FormData)
export const articleAPI = {
  // Récupérer tous les articles  
  getArticles: async () => {
    const response = await fetch(`${API_URL}/articles`);
    return await response.json();
  },

  // Créer un article (AVEC UPLOAD D'IMAGE)
  createArticle: async (formData) => {
    const response = await fetch(`${API_URL}/articles/storage`, {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  },

  // Modifier un article
  updateArticle: async (id, formData) => {
    const response = await fetch(`${API_URL}/articles/update/${id}`, {
      method: 'PUT',
      body: formData,
    });
    return await response.json();
  },

  // Supprimer un article
  deleteArticle: async (id) => {
    const response = await fetch(`${API_URL}/articles/destroy/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  }
};

// Export par défaut pour axios
export default api;