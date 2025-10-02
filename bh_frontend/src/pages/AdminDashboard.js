import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../components/Admin/ArticleForm';
import CategoryManager from '../components/Admin/CategoryManager';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' ou 'categories'

  const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    navigate('/');
  };

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <div>
            <h1>Tableau de Bord Admin</h1>
            <p>Gestion des histoires et catégories</p>
          </div>
          <button onClick={handleLogout} className="admin-logout-button">
            🚪 Déconnexion
          </button>
        </div>

        {/* Navigation par onglets */}
        <div className="admin-tabs">
          <button 
            className={`tab-button ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => setActiveTab('articles')}
          >
            📝 Articles
          </button>
          <button 
            className={`tab-button ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            📂 Catégories
          </button>
        </div>

        {/* Contenu selon l'onglet */}
        <div className="admin-content">
          {activeTab === 'articles' ? (
            <ArticleForm />
          ) : (
            <CategoryManager />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;