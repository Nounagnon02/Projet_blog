import React, { useState, useEffect } from 'react';
import { recommendationsAPI } from './Admin/apiService';
import './Recommendations.css';

const Recommendations = ({ articleId, type = 'similar' }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, [articleId, type]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const response = type === 'trending' 
        ? await recommendationsAPI.getTrending(7, 5)
        : await recommendationsAPI.getForArticle(articleId);
      
      if (response.success) {
        setRecommendations(response.data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="recommendations-loading">Chargement...</div>;
  if (recommendations.length === 0) return null;

  return (
    <div className="recommendations-section">
      <h3>
        {type === 'trending' ? '🔥 Tendances' : '📚 Histoires Similaires'}
      </h3>
      <div className="recommendations-grid">
        {recommendations.map(article => (
          <div key={article.id} className="recommendation-card">
            {article.image1 && (
              <img src={article.image1} alt={article.title} />
            )}
            <div className="recommendation-content">
              <h4>{article.title}</h4>
              <p>{article.short_description?.substring(0, 100)}...</p>
              <a href={`/article/${article.id}`} className="read-more">
                Lire →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
