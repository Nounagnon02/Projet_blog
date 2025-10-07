import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleAPI } from '../services/Api';
import './ArticleList.css';
import api from '../services/Api';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadArticles();
    loadCategories();
  }, []);
  
  const loadCategories = async () => {
        try {
          const response = await api.get('/categories');
          setCategories(response.data);
        } catch (error) {
          console.error('Erreur:', error);
        }
      };
    

  const loadArticles = async () => {
    try {
      const response = await api.get('/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Erreur:', error);
      // Données mockées pour tester le design
      setArticles([
        {
          id: 1,
          title: "Le Secret de la Forêt Enchantée",
          short_description: "Une aventure magique au cœur d'une forêt mystérieuse peuplée de créatures fantastiques.",
          image: "histoires_images/foret.jpg",
          date_published: "2024-01-15",
          category: "Aventure"
        },
        {
          id: 2,
          title: "L'Amour aux Temps Modernes",
          short_description: "Une histoire d'amour contemporaine entre deux âmes perdues qui se retrouvent.",
          image: "histoires_images/amour.jpg", 
          date_published: "2024-01-10",
          category: "Romance"
        },
        {
          id: 3,
          title: "Le Mystère du Manoir Hanté",
          short_description: "Une enquête palpitante dans un manoir aux secrets bien gardés.",
          image: "histoires_images/mystere.jpg",
          date_published: "2024-01-05",
          category: "Mystère"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };


  // Filtrer les articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.short_description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || article.category_id == selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Catégories uniques
  

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des histoires...</p>
      </div>
    );
  }

  return (
    <section className="articles-section">
      <div className="articles-container">
        
        {/* En-tête avec recherche et filtres */}
        <div className="articles-header">

          <div className="filters-container">
            {/* Barre de recherche */}
            <div className="search-box">
              <input
                type="text"
                placeholder="🔍 Rechercher une histoire..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Filtre par catégorie */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              <option value="">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Résultats */}
        <div className="results-info">
          <span>{filteredArticles.length} histoire(s) trouvée(s)</span>
          {(searchTerm || selectedCategory) && (
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="clear-filters"
            >
              ✕ Effacer les filtres
            </button>
          )}
        </div>

        {/* Grille des articles */}
        {filteredArticles.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>Aucune histoire trouvée</h3>
            <p>Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <div className="articles-grid">
            {filteredArticles.map(article => (
              <article key={article.id} className="article-card">
                <div className="article-image-container">
                  {article.image ? (
                    <img 
                      src={`http://localhost:8000/storage/${article.image1}`}
                      alt={article.title}
                      className="article-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <div className="image-placeholder">
                    📖
                  </div>
                  <div className="article-category">
                    {article.category}
                  </div>
                </div>

                <div className="article-content">
                  <h3 className="article-title" style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>
                         {article.title}
                  </h3>
                  <p className="article-description">{article.short_description}</p>
                  
                  <div className="article-footer">
                    <span className="article-date">
                      📅 {new Date(article.date_published).toLocaleDateString('fr-FR')}
                    </span>
                    <Link to={`/article/${article.id}`} className="read-button">
                      Lire l'histoire →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleList;