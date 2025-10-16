 import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const trackPageView = async (page, articleId = null) => {
  try {
    await axios.post(`${API_URL}/track-view`, {
      page,
      article_id: articleId
    });
  } catch (error) {
    console.error('Erreur tracking:', error);
  }
};

export const trackArticleView = (articleId) => {
  trackPageView(`/article/${articleId}`, articleId);
};

export default { trackPageView, trackArticleView };
