import axios from 'axios';

// Configuration de base d'axios
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

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

// Export par défaut
export default {
  aboutPageAPI,
  contactPageAPI,
  privacyPageAPI,
  announcementsAPI
};