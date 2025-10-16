import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  
  // Vérifier si l'utilisateur est admin
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <h1>Tableau de Bord Admin</h1>
          <p>Gérez vos histoires et contenu</p>
          <button onClick={handleLogout} className="logout-button">
            Déconnexion
          </button>
        </div>
        
        <div className="admin-grid">
          <Link to="/create-article" className="admin-card">
            <div className="admin-card-icon">✍️</div>
            <h3>Créer une Histoire</h3>
            <p>Rédigez et publiez une nouvelle histoire</p>
          </Link>
          
          <div className="admin-card">
            <div className="admin-card-icon">📊</div>
            <h3>Statistiques</h3>
            <p>Consultez les performances de vos articles</p>
          </div>
          
          <div className="admin-card">
            <div className="admin-card-icon">💬</div>
            <h3>Commentaires</h3>
            <p>Gérez les commentaires des lecteurs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;