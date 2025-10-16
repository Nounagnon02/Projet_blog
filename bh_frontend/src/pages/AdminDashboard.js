import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../components/Admin/ArticleForm';
import CategoryManager from '../components/Admin/CategoryManager';
import MessageManager from '../components/Admin/MessageManager';  
import StatisticsManager from '../components/Admin/StatisticsManager';  
import OtherSettings from '../components/Admin/OtherSettings'; 
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('articles'); // 'articles', 'categories', 'autres'

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

        {/* Navigation par onglets - Version corrigée */}
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

            <button 
            className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            📨 Messages
          </button>

          <button 
            className={`tab-button ${activeTab === 'statistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('statistics')}
          >
            📊 Statistiques
          </button>

          <button 
            className={`tab-button ${activeTab === 'autres' ? 'active' : ''}`}
            onClick={() => setActiveTab('autres')}
          >
            ⚙️ Autres modifications
          </button>
        </div>

        {/* Contenu selon l'onglet - Version corrigée */}
        <div className="admin-content">
          {activeTab === 'articles' ? (
            <ArticleForm />
          ) : activeTab === 'categories' ? (
            <CategoryManager />
          ) : activeTab === 'messages' ? (
            <MessageManager />
          ): activeTab === 'statistics' ? (
            <StatisticsManager />
          ): (
            <OtherSettings />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;