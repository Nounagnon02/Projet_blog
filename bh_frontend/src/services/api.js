

const API_URL = 'http://localhost:8000/api';

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
      body: formData, // ← IMPORTANT: FormData au lieu de JSON
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