import axios from 'axios';

// Configuration de base d'axios
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api' || 'https://projet-blog-wg7g.onrender.com/api';

// Instance axios configurée
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Intercepteur pour ajouter le token automatiquement
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== API ABOUT PAGE ====================
export const aboutPageAPI = {
  // Récupérer les données (public)
  get: async () => {
    try {
      const response = await apiClient.get('/pages/about');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la page About:', error);
      throw error;
    }
  },

  // Mettre à jour (admin)
  update: async (data) => {
    try {
      const response = await apiClient.put('/admin/about', data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la page About:', error);
      throw error;
    }
  }
};
export const emailPageAPI = {
   // Créer un envoi de mail 
  create: async (data) => {
    try {
      const response = await apiClient.post('/email/store', data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'envoie de mail:', error);
      throw error;
    }
  },
};

//Contact



// ==================== API CONTACT PAGE ====================
export const contactPageAPI = {
  // Récupérer les données (public)
  get: async () => {
    try {
      const response = await apiClient.get('/pages/contact');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la page Contact:', error);
      throw error;
    }
  },

  // Mettre à jour (admin)
  update: async (data) => {
    try {
      const response = await apiClient.put('/admin/contact', data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la page Contact:', error);
      throw error;
    }
  }
};

// ==================== API PRIVACY PAGE ====================
export const privacyPageAPI = {
  // Récupérer les données (public)
  get: async () => {
    try {
      const response = await apiClient.get('/pages/privacy');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la page Privacy:', error);
      throw error;
    }
  },

  // Mettre à jour (admin)
  update: async (data) => {
    try {
      const response = await apiClient.put('/admin/privacy', data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la page Privacy:', error);
      throw error;
    }
  }
};

// ==================== API ANNOUNCEMENTS ====================
export const announcementsAPI = {
  // Récupérer toutes les annonces (admin)
  getAll: async () => {
    try {
      const response = await apiClient.get('/admin/announcements');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces:', error);
      throw error;
    }
  },

  // Récupérer les annonces actives (public)
  getActive: async () => {
    try {
      const response = await apiClient.get('/announcements/active');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces actives:', error);
      throw error;
    }
  },

  // Créer une annonce (admin)
  create: async (data) => {
    try {
      const response = await apiClient.post('/admin/announcements', data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'annonce:', error);
      throw error;
    }
  },

  // Mettre à jour une annonce (admin)
  update: async (id, data) => {
    try {
      const response = await apiClient.put(`/admin/announcements/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'annonce:', error);
      throw error;
    }
  },

  // Basculer le statut actif/inactif (admin)
  toggleActive: async (id) => {
    try {
      const response = await apiClient.patch(`/admin/announcements/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      throw error;
    }
  },

  // Supprimer une annonce (admin)
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/announcements/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'annonce:', error);
      throw error;
    }
  },

  // Réorganiser les annonces (admin)
  reorder: async (announcements) => {
    try {
      const response = await apiClient.post('/admin/announcements/reorder', {
        announcements
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la réorganisation:', error);
      throw error;
    }
  }



 
};

// ==================== API MESSAGES ====================
export const messagesAPI = {
  // Récupérer tous les messages (admin)
  getAll: async () => {
    try {
      const response = await apiClient.get('/admin/messages');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      throw error;
    }
  },

  // Récupérer un message (admin)
  get: async (id) => {
    try {
      const response = await apiClient.get(`/admin/messages/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du message:', error);
      throw error;
    }
  },

  // Répondre à un message (admin)
  reply: async (id, replyText) => {
    try {
      const response = await apiClient.post(`/admin/messages/${id}/reply`, { reply: replyText });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la réponse:', error);
      throw error;
    }
  },

  // Marquer comme lu (admin)
  markAsRead: async (id) => {
    try {
      const response = await apiClient.patch(`/admin/messages/${id}/read`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors du marquage comme lu:', error);
      throw error;
    }
  },

  // Supprimer un message (admin)
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/messages/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression du message:', error);
      throw error;
    }
  },

  // Récupérer les statistiques (admin)
  getStats: async () => {
    try {
      const response = await apiClient.get('/admin/messages/stats');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }
};

// ==================== API STATISTICS ====================
export const statisticsAPI = {
  // Récupérer le tableau de bord (admin)
  getDashboard: async () => {
    try {
      const response = await apiClient.get('/admin/statistics/dashboard');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du tableau de bord:', error);
      throw error;
    }
  },

  // Récupérer les vues de pages (admin)
  getPageViews: async (days = 7) => {
    try {
      const response = await apiClient.get(`/admin/statistics/page-views?days=${days}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des vues:', error);
      throw error;
    }
  },

  // Récupérer les articles populaires (admin)
  getTopArticles: async (limit = 10) => {
    try {
      const response = await apiClient.get(`/admin/statistics/top-articles?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des articles populaires:', error);
      throw error;
    }
  },

  // Récupérer les statistiques d'appareils (admin)
  getDevices: async () => {
    try {
      const response = await apiClient.get('/admin/statistics/devices');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des appareils:', error);
      throw error;
    }
  },

  // Récupérer les statistiques de navigateurs (admin)
  getBrowsers: async () => {
    try {
      const response = await apiClient.get('/admin/statistics/browsers');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des navigateurs:', error);
      throw error;
    }
  },

  // Récupérer les statistiques d'OS (admin)
  getOs: async () => {
    try {
      const response = await apiClient.get('/admin/statistics/os');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des OS:', error);
      throw error;
    }
  },

  // Récupérer les statistiques de pays (admin)
  getCountries: async () => {
    try {
      const response = await apiClient.get('/admin/statistics/countries');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des pays:', error);
      throw error;
    }
  }
};

// ==================== API RECOMMENDATIONS ====================
export const recommendationsAPI = {
  getForArticle: async (articleId) => {
    try {
      const response = await apiClient.get(`/recommendations/article/${articleId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des recommandations:', error);
      throw error;
    }
  },

  getTrending: async (days = 7, limit = 10) => {
    try {
      const response = await apiClient.get(`/recommendations/trending?days=${days}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des tendances:', error);
      throw error;
    }
  }
};

// ==================== API TRANSLATIONS ====================
export const translationsAPI = {
  save: async (articleId, translation) => {
    try {
      const response = await apiClient.post(`/admin/articles/${articleId}/translations`, translation);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la traduction:', error);
      throw error;
    }
  },

  get: async (articleId, language) => {
    try {
      const response = await apiClient.get(`/articles/${articleId}/translations/${language}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la traduction:', error);
      throw error;
    }
  },

  getAvailableLanguages: async (articleId) => {
    try {
      const response = await apiClient.get(`/admin/articles/${articleId}/translations/languages`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des langues:', error);
      throw error;
    }
  }
};

// Export par défaut
export default {
  aboutPageAPI,
  contactPageAPI,
  privacyPageAPI,
  announcementsAPI,
  messagesAPI,
  statisticsAPI,
  recommendationsAPI,
  translationsAPI
};