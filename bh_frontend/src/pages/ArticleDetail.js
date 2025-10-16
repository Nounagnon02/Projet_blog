import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { articleAPI } from '../services/Api';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    loadArticle();
    loadRelatedArticles();
  }, [id]);

  const loadArticle = async () => {
    try {
      // Pour l'instant, on simule avec les données existantes
      // Vous devrez créer une route API pour récupérer un article par ID
      const articles = await articleAPI.getArticles();
      const foundArticle = articles.find(art => art.id === parseInt(id));
      setArticle(foundArticle);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedArticles = async () => {
    try {
      const articles = await articleAPI.getArticles();
      // Prendre 3 articles aléatoires (hors l'article actuel)
      const filtered = articles.filter(art => art.id !== parseInt(id));
      const randomArticles = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
      setRelatedArticles(randomArticles);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-article">
        <div className="spinner"></div>
        <p>Chargement de l'histoire...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-not-found">
        <div className="not-found-content">
          <h2>📖 Histoire non trouvée</h2>
          <p>Cette histoire n'existe pas ou a été supprimée.</p>
          <Link to="/" className="back-home-btn">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      {/* Navigation */}
      <nav className="article-nav">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Retour
        </button>
        <Link to="/" className="home-link">
          🏠 Accueil
        </Link>
      </nav>

      {/* Article principal */}
      <article className="article-detail">
        <header className="article-header">
          {article.image && (
            <div className="article-hero-image">
              <img 
                src={`http://localhost:8000/storage/${article.image}`}
                alt={article.title}
                className="hero-image"
              />
            </div>
          )}
          
          <div className="article-meta-header">
            <span className="article-category">{article.category}</span>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta-info">
              <span className="publish-date">
                📅 Publié le {new Date(article.date_published).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              <span className="read-time">⏱️ 5 min de lecture</span>
            </div>
          </div>
        </header>

        {/* Contenu de l'article */}
        <div className="article-content">
          <div className="content-wrapper">
            {article.content.split('\n').map((paragraph, index) => (
              paragraph.trim() ? (
                <p key={index} className="article-paragraph">
                  {paragraph}
                </p>
              ) : (
                <br key={index} />
              )
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="article-actions">
          <button 
            onClick={() => navigate(-1)}
            className="action-btn secondary"
          >
            ← Retour aux histoires
          </button>
          <div className="social-actions">
            <button className="action-btn like-btn">
              👍 J'aime
            </button>
            <button className="action-btn share-btn">
              📤 Partager
            </button>
          </div>
        </div>
      </article>

      {/* Articles similaires */}
      {relatedArticles.length > 0 && (
        <section className="related-articles">
          <h3>📚 Découvrez aussi</h3>
          <div className="related-grid">
            {relatedArticles.map(relatedArticle => (
              <div key={relatedArticle.id} className="related-card">
                {relatedArticle.image && (
                  <img 
                    src={`http://localhost:8000/storage/${relatedArticle.image}`}
                    alt={relatedArticle.title}
                    className="related-image"
                  />
                )}
                <div className="related-content">
                  <span className="related-category">{relatedArticle.category}</span>
                  <h4>{relatedArticle.title}</h4>
                  <p>{relatedArticle.short_description}</p>
                  <Link 
                    to={`/article/${relatedArticle.id}`} 
                    className="read-related-btn"
                  >
                    Lire →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h3>📖 Envie de plus d'histoires ?</h3>
          <p>Découvrez notre collection complète de récits captivants</p>
          <Link to="/" className="cta-button">
            Explorer toutes les histoires
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;