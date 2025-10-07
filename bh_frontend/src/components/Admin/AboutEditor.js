import React, { useState } from 'react';
import './AboutEditor.css';

const AboutEditor = ({ onClose }) => {
  const [aboutData, setAboutData] = useState({
    heroTitle: "👋 Bienvenue sur StoryHub",
    heroSubtitle: "Votre plateforme de partage d'histoires captivantes",
    missionTitle: "🎯 Notre Mission", 
    missionSubtitle: "Donner vie aux récits qui méritent d'être partagés",
    missionInspire: "Créer un espace où chaque voix peut s'exprimer et inspirer des milliers de lecteurs",
    missionConnect: "Rassembler une communauté passionnée d'auteurs et de lecteurs du monde entier",
    missionInnovate: "Révolutionner la façon dont les histoires sont découvertes et partagées",
    teamTitle: "👥 Notre Équipe",
    teamSubtitle: "Des passionnés dévoués à votre expérience de lecture",
    ctaTitle: "📖 Prêt à commencer votre aventure ?",
    ctaSubtitle: "Rejoignez notre communauté et découvrez des histoires extraordinaires"
  });

  const [activeSection, setActiveSection] = useState('hero');

  const handleSave = async () => {
    try {
      // TODO: Appel API pour sauvegarder
      console.log('Sauvegarde des données:', aboutData);
      alert('✅ Modifications sauvegardées avec succès !');
      if (onClose) onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('❌ Erreur lors de la sauvegarde');
    }
  };

  const handleReset = () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser toutes les modifications ?')) {
      setAboutData({
        heroTitle: "👋 Bienvenue sur StoryHub",
        heroSubtitle: "Votre plateforme de partage d'histoires captivantes",
        missionTitle: "🎯 Notre Mission",
        missionSubtitle: "Donner vie aux récits qui méritent d'être partagés",
        missionInspire: "Créer un espace où chaque voix peut s'exprimer et inspirer des milliers de lecteurs",
        missionConnect: "Rassembler une communauté passionnée d'auteurs et de lecteurs du monde entier", 
        missionInnovate: "Révolutionner la façon dont les histoires sont découvertes et partagées",
        teamTitle: "👥 Notre Équipe",
        teamSubtitle: "Des passionnés dévoués à votre expérience de lecture",
        ctaTitle: "📖 Prêt à commencer votre aventure ?",
        ctaSubtitle: "Rejoignez notre communauté et découvrez des histoires extraordinaires"
      });
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

  return (
    <div className="about-editor">
      <div className="editor-header">
        <div className="header-content">
          <h2>📄 Édition de la page "À Propos"</h2>
          <p>Modifiez le contenu de chaque section de votre page À Propos</p>
        </div>
      </div>

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
            <button className="save-btn" onClick={handleSave}>
              <span className="btn-icon">💾</span>
              Sauvegarder les modifications
            </button>
            <button className="preview-btn">
              <span className="btn-icon">👁️</span>
              Aperçu
            </button>
            <button className="reset-btn" onClick={handleReset}>
              <span className="btn-icon">🔄</span>
              Réinitialiser
            </button>
            {onClose && (
              <button className="close-btn" onClick={onClose}>
                <span className="btn-icon">❌</span>
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