import axios from 'axios';

// Configuration de base axios
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
});

// Intercepteur pour ajouter le token d'authentification
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirection vers login si non authentifié
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

//ABOUT PAGE
export const aboutPageAPI = {
  // Récupérer les données de la page About
  get: async () => {
    try {
      const response = await apiClient.get('/pages/about');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la page About:', error);
      throw error;
    }
  },

  // Mettre à jour la page About
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

//CONTACT PAGE
export const contactPageAPI = {
  // Récupérer les données de la page Contact
  get: async () => {
    try {
      const response = await apiClient.get('/pages/contact');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la page Contact:', error);
      throw error;
    }
  },

  // Mettre à jour la page Contact
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

//PRIVACY PAGE
export const privacyPageAPI = {
  // Récupérer les données de la page Privacy
  get: async () => {
    try {
      const response = await apiClient.get('/pages/privacy');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la page Privacy:', error);
      throw error;
    }
  },

  // Mettre à jour la page Privacy
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

//ANNOUNCEMENTS
export const announcementsAPI = {
  // Récupérer toutes les annonces
  getAll: async () => {
    try {
      const response = await apiClient.get('/admin/announcements');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces:', error);
      throw error;
    }
  },

  // Récupérer uniquement les annonces actives
  getActive: async () => {
    try {
      const response = await apiClient.get('/pages/announcements/active');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces actives:', error);
      throw error;
    }
  },

  // Créer une nouvelle annonce
  create: async (data) => {
    try {
      const response = await apiClient.post('/admin/announcements', data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'annonce:', error);
      throw error;
    }
  },

  // Mettre à jour une annonce
  update: async (id, data) => {
    try {
      const response = await apiClient.put(`/admin/announcements/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'annonce:', error);
      throw error;
    }
  },

  // Basculer le statut actif/inactif
  toggleActive: async (id) => {
    try {
      const response = await apiClient.patch(`/admin/announcements/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      throw error;
    }
  },

  // Supprimer une annonce
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/announcements/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'annonce:', error);
      throw error;
    }
  },

  // Mettre à jour l'ordre des annonces
  updateOrder: async (announcements) => {
    try {
      const response = await apiClient.post('/admin/announcements/reorder', {
        announcements
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'ordre:', error);
      throw error;
    }
  }
};

export default {
  aboutPageAPI,
  contactPageAPI,
  privacyPageAPI,
  announcementsAPI
};