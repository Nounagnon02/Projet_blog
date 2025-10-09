import React, { useState, useEffect } from 'react';
import { announcementsAPI } from './apiService';
import './AnnouncementsEditor.css';

const AnnouncementsEditor = ({ onClose }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    type: 'info'
  });

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await announcementsAPI.getAll();
      
      if (response.success) {
        setAnnouncements(response.data);
      }
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError('Impossible de charger les annonces. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const addAnnouncement = async () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      alert('⚠️ Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await announcementsAPI.create(newAnnouncement);
      
      if (response.success) {
        setAnnouncements([...announcements, response.data]);
        setNewAnnouncement({ title: '', content: '', type: 'info' });
        alert('✅ Annonce créée avec succès !');
      }
    } catch (err) {
      console.error('Erreur lors de la création:', err);
      alert('❌ Erreur lors de la création de l\'annonce');
    }
  };

  const toggleAnnouncement = async (id) => {
    try {
      const response = await announcementsAPI.toggleActive(id);
      
      if (response.success) {
        setAnnouncements(announcements.map(ann => 
          ann.id === id ? response.data : ann
        ));
      }
    } catch (err) {
      console.error('Erreur lors du changement de statut:', err);
      alert('❌ Erreur lors du changement de statut');
    }
  };

  const deleteAnnouncement = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      return;
    }
    
    try {
      const response = await announcementsAPI.delete(id);
      
      if (response.success) {
        setAnnouncements(announcements.filter(ann => ann.id !== id));
        alert('✅ Annonce supprimée avec succès !');
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('❌ Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="announcements-editor">
        <div className="loading-container">
          <p>⏳ Chargement des annonces...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="announcements-editor">
      <div className="editor-header">
        <div className="header-content">
          <h2>📢 Gestion des Annonces</h2>
          <p>Créez et gérez les annonces affichées sur votre site</p>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span>⚠️</span>
          <p>{error}</p>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <div className="editor-content">
        {/* Formulaire d'ajout */}
        <section className="add-announcement">
          <h3>➕ Nouvelle Annonce</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Titre de l'annonce</label>
              <input
                type="text"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                placeholder="Ex: Nouveautés du mois..."
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Type d'annonce</label>
              <select
                value={newAnnouncement.type}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value})}
                className="form-select"
              >
                <option value="info">ℹ️ Information</option>
                <option value="promotion">🎉 Promotion</option>
                <option value="event">📢 Événement</option>
                <option value="warning">⚠️ Important</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Contenu de l'annonce</label>
            <textarea
              value={newAnnouncement.content}
              onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
              placeholder="Décrivez votre annonce en détail..."
              className="form-textarea"
              rows="3"
            />
          </div>
          
          <button onClick={addAnnouncement} className="add-btn">
            ➕ Ajouter l'annonce
          </button>
        </section>

        {/* Liste des annonces */}
        <section className="announcements-list">
          <h3>📋 Annonces ({announcements.length})</h3>
          
          {announcements.length === 0 ? (
            <div className="empty-state">
              <p>Aucune annonce pour le moment</p>
              <p>Créez votre première annonce ci-dessus</p>
            </div>
          ) : (
            <div className="announcements-grid">
              {announcements.map(announcement => (
                <div 
                  key={announcement.id} 
                  className={`announcement-card ${announcement.type} ${!announcement.active ? 'inactive' : ''}`}
                >
                  <div className="card-header">
                    <div className="card-title">
                      <span className={`type-icon ${announcement.type}`}>
                        {announcement.type === 'info' && 'ℹ️'}
                        {announcement.type === 'promotion' && '🎉'}
                        {announcement.type === 'event' && '📢'}
                        {announcement.type === 'warning' && '⚠️'}
                      </span>
                      <h4>{announcement.title}</h4>
                    </div>
                    <div className="card-actions">
                      <button 
                        onClick={() => toggleAnnouncement(announcement.id)}
                        className={`toggle-btn ${announcement.active ? 'active' : 'inactive'}`}
                        title={announcement.active ? 'Désactiver' : 'Activer'}
                      >
                        {announcement.active ? '👁️' : '👁️‍🗨️'}
                      </button>
                      <button 
                        onClick={() => deleteAnnouncement(announcement.id)}
                        className="delete-btn"
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="card-content">
                    <p>{announcement.content}</p>
                  </div>
                  <div className="card-footer">
                    <span className={`status ${announcement.active ? 'active' : 'inactive'}`}>
                      {announcement.active ? '🟢 Active' : '🔴 Inactive'}
                    </span>
                    <span className="date">
                      Créée le {new Date(announcement.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Actions */}
      <div className="editor-actions">
        <button className="preview-btn" onClick={loadAnnouncements}>
          🔄 Recharger
        </button>
        <button className="close-btn" onClick={onClose}>
          ✕ Fermer
        </button>
      </div>
    </div>
  );
};

export default AnnouncementsEditor;