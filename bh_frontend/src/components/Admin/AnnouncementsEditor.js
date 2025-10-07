import React, { useState } from 'react';
import './AnnouncementsEditor.css';

const AnnouncementsEditor = ({ onClose }) => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "🎉 Nouveautés du mois",
      content: "Découvrez nos nouvelles histoires publiées ce mois-ci !",
      active: true,
      type: "promotion"
    },
    {
      id: 2,
      title: "📢 Concours d'écriture",
      content: "Participez à notre concours mensuel et gagnez des prix !",
      active: true,
      type: "event"
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    type: 'info'
  });

  const addAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements([
        ...announcements,
        {
          id: Date.now(),
          ...newAnnouncement,
          active: true
        }
      ]);
      setNewAnnouncement({ title: '', content: '', type: 'info' });
    }
  };

  const toggleAnnouncement = (id) => {
    setAnnouncements(announcements.map(ann => 
      ann.id === id ? { ...ann, active: !ann.active } : ann
    ));
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
  };

  const handleSave = async () => {
    try {
      // TODO: Sauvegarder en base de données
      console.log('Annonces sauvegardées:', announcements);
      alert('✅ Annonces sauvegardées !');
      if (onClose) onClose();
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="announcements-editor">
      <div className="editor-header">
        <div className="header-content">
          <h2>📢 Gestion des Annonces</h2>
          <p>Créez et gérez les annonces affichées sur votre site</p>
        </div>
      </div>

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
          <h3>📋 Annonces Actives</h3>
          <div className="announcements-grid">
            {announcements.map(announcement => (
              <div key={announcement.id} className={`announcement-card ${announcement.type} ${!announcement.active ? 'inactive' : ''}`}>
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
                    >
                      {announcement.active ? '👁️' : '👁️‍🗨️'}
                    </button>
                    <button 
                      onClick={() => deleteAnnouncement(announcement.id)}
                      className="delete-btn"
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
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Actions */}
      <div className="editor-actions">
        <button className="save-btn" onClick={handleSave}>
          💾 Sauvegarder les annonces
        </button>
        <button className="preview-btn">
          👁️ Aperçu du site
        </button>
        <button className="close-btn" onClick={onClose}>
          ❌ Fermer
        </button>
      </div>
    </div>
  );
};

export default AnnouncementsEditor;