import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Stockage temporaire en localStorage (remplacez par votre API)
const storeAnalytics = (data) => {
  try {
    const existing = JSON.parse(localStorage.getItem('library_analytics') || '[]');
    const newData = [...existing, { ...data, id: Date.now() }];
    localStorage.setItem('library_analytics', JSON.stringify(newData));
  } catch (error) {
    console.error('Erreur stockage analytics:', error);
  }
};

export const useAnalytics = (articleId = null) => {
  const location = useLocation();

  useEffect(() => {
    // Utiliser window.screen au lieu de screen directement
    const trackData = {
      type: 'page_view',
      page: location.pathname,
      articleId: articleId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      screen: `${window.screen.width}x${window.screen.height}`,
      referrer: document.referrer,
      // Détection du navigateur et OS
      browser: getBrowser(),
      os: getOS(),
      device: getDeviceType(),
    };

    storeAnalytics(trackData);
    
    // Pour les vues d'articles spécifiques
    if (articleId) {
      const articleView = {
        ...trackData,
        type: 'article_view',
        articleId: articleId
      };
      storeAnalytics(articleView);
    }
  }, [location, articleId]);

  // Fonctions de détection
  function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Other';
  }

  function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac')) return 'MacOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  function getDeviceType() {
    // Utiliser window.screen au lieu de screen
    const width = window.screen.width;
    if (width < 768) return 'Mobile';
    if (width < 1024) return 'Tablet';
    return 'Desktop';
  }
};

// Hook pour récupérer les analytics
export const useAnalyticsData = () => {
  const getAnalytics = () => {
    try {
      return JSON.parse(localStorage.getItem('library_analytics') || '[]');
    } catch {
      return [];
    }
  };

  return { getAnalytics };
};