import { useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const usePageTracking = (page, articleId = null) => {
  useEffect(() => {
    const trackView = async () => {
      try {
        await axios.post(`${API_URL}/track-view`, {
          page,
          article_id: articleId
        });
      } catch (error) {
        console.error('Erreur tracking:', error);
      }
    };

    trackView();
  }, [page, articleId]);
};

export default usePageTracking;
