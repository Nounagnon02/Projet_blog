import React, { useState, useEffect } from 'react';
import { aboutPageAPI } from './apiService';
import './AboutEditor.css';

const AboutEditor = ({ onClose }) => {
  const [aboutData, setAboutData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    missionTitle: "",
    missionSubtitle: "",
    missionInspire: "",
    missionConnect: "",
    missionInnovate: "",
    teamTitle: "",
    teamSubtitle: "",
    ctaTitle: "",
    ctaSubtitle: ""
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Charger les données au montage du composant
  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await aboutPageAPI.get();
      
      if (response.success && response.data) {
        // Mapper les données de la DB vers le format du composant
        setAboutData({
          heroTitle: response.data.hero_title || "",
          heroSubtitle: response.data.hero_subtitle || "",
          missionTitle: response.data.mission_title || "",
          missionSubtitle: response.data.mission_subtitle || "",
          missionInspire: response.data.mission_inspire || "",
          missionConnect: response.data.mission_connect || "",
          missionInnovate: response.data.mission_innovate || "",
          teamTitle: response.data.team_title || "",
          teamSubtitle: response.data.team_subtitle || "",
          ctaTitle: response.data.cta_title || "",
          ctaSubtitle: response.data.cta_subtitle || ""
        });
      }
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError('Impossible de charger les données. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      
      const response = await aboutPageAPI.update(aboutData);
      
      if (response.success) {
        alert('✅ Modifications sauvegardées avec succès !');
        if (onClose) onClose();
      } else {
        throw new Error(response.message || 'Erreur lors de la sauvegarde');
      }
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      
      if (err.response?.data?.errors) {
        const errors = Object.values(err.response.data.errors).flat();
        setError(errors.join('\n'));
      } else {
        setError('❌ Erreur lors de la sauvegarde. Veuillez réessayer.');
      }
      
      alert(error || '❌ Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Voulez-vous vraiment recharger les données depuis la base de données ?')) {
      await loadAboutData();
    }
  };

  const sections = [
    { id: 'hero', name: '🏠 Section Hero', icon: '🏠' },
    { id: 'mission', name: '🎯 Notre Mission', icon: '🎯' },
    { id: 'team', name: '👥 Notre Équipe', icon: '👥' },
    { id: 'cta', name: '📢 Appel à Action', icon: '📢' }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <div className="section-content">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">💫</span>
                Titre principal
              </label>
              <input
                type="text"
                value={aboutData.heroTitle}
                onChange={(e) => setAboutData({...aboutData, heroTitle: e.target.value})}
                className="form-input"
                placeholder="Entrez le titre principal..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📝</span>
                Sous-titre
              </label>
              <textarea
                value={aboutData.heroSubtitle}
                onChange={(e) => setAboutData({...aboutData, heroSubtitle: e.target.value})}
                className="form-textarea"
                rows="3"
                placeholder="Entrez le sous-titre..."
              />
            </div>
          </div>
        );

      case 'mission':
        return (
          <div className="section-content">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">🎯</span>
                Titre de la section
              </label>
              <input
                type="text"
                value={aboutData.missionTitle}
                onChange={(e) => setAboutData({...aboutData, missionTitle: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">💬</span>
                Sous-titre mission
              </label>
              <textarea
                value={aboutData.missionSubtitle}
                onChange={(e) => setAboutData({...aboutData, missionSubtitle: e.target.value})}
                className="form-textarea"
                rows="2"
              />
            </div>
            
            <div className="cards-grid">
              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">🌟</span>
                  <h5>Inspirer</h5>
                </div>
                <textarea
                  value={aboutData.missionInspire}
                  onChange={(e) => setAboutData({...aboutData, missionInspire: e.target.value})}
                  className="form-textarea card-textarea"
                  rows="3"
                  placeholder="Texte pour la carte Inspirer..."
                />
              </div>
              
              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">🤝</span>
                  <h5>Connecter</h5>
                </div>
                <textarea
                  value={aboutData.missionConnect}
                  onChange={(e) => setAboutData({...aboutData, missionConnect: e.target.value})}
                  className="form-textarea card-textarea"
                  rows="3"
                  placeholder="Texte pour la carte Connecter..."
                />
              </div>
              
              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">🚀</span>
                  <h5>Innovation</h5>
                </div>
                <textarea
                  value={aboutData.missionInnovate}
                  onChange={(e) => setAboutData({...aboutData, missionInnovate: e.target.value})}
                  className="form-textarea card-textarea"
                  rows="3"
                  placeholder="Texte pour la carte Innovation..."
                />
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="section-content">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">👥</span>
                Titre équipe
              </label>
              <input
                type="text"
                value={aboutData.teamTitle}
                onChange={(e) => setAboutData({...aboutData, teamTitle: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">💬</span>
                Sous-titre équipe
              </label>
              <textarea
                value={aboutData.teamSubtitle}
                onChange={(e) => setAboutData({...aboutData, teamSubtitle: e.target.value})}
                className="form-textarea"
                rows="2"
              />
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="section-content">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📢</span>
                Titre CTA
              </label>
              <input
                type="text"
                value={aboutData.ctaTitle}
                onChange={(e) => setAboutData({...aboutData, ctaTitle: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">💬</span>
                Sous-titre CTA
              </label>
              <textarea
                value={aboutData.ctaSubtitle}
                onChange={(e) => setAboutData({...aboutData, ctaSubtitle: e.target.value})}
                className="form-textarea"
                rows="2"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="about-editor">
        <div className="loading-container">
          <p>⏳ Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="about-editor">
      <div className="editor-header">
        <div className="header-content">
          <h2>📄 Édition de la page "À Propos"</h2>
          <p>Modifiez le contenu de chaque section de votre page À Propos</p>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span>⚠️</span>
          <p>{error}</p>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <div className="editor-layout">
        {/* Navigation latérale */}
        <div className="editor-sidebar">
          <div className="sidebar-header">
            <span>📑 Sections</span>
          </div>
          <div className="sidebar-nav">
            {sections.map(section => (
              <button
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-text">{section.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="editor-main">
          <div className="section-header">
            <h3>
              {sections.find(s => s.id === activeSection)?.icon}
              {sections.find(s => s.id === activeSection)?.name}
            </h3>
          </div>

          {renderSectionContent()}

          {/* Actions globales */}
          <div className="editor-actions">
            <button 
              className="save-btn" 
              onClick={handleSave}
              disabled={saving}
            >
              <span className="btn-icon">💾</span>
              {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
            </button>
            <button 
              className="reset-btn" 
              onClick={handleReset}
              disabled={saving || loading}
            >
              <span className="btn-icon">🔄</span>
              Recharger
            </button>
            {onClose && (
              <button className="close-btn" onClick={onClose}>
                <span className="btn-icon">✕</span>
                Fermer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEditor;