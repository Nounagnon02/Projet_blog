import React, { useState } from 'react';
import './PrivacyEditor.css';

const PrivacyEditor = ({ onClose }) => {
  const [privacyData, setPrivacyData] = useState({
    // Hero Section
    heroTitle: "🔒 Politique de Confidentialité",
    heroSubtitle: "Bienvenue sur StoryHub",
    heroDescription: "La confidentialité de nos visiteurs est très importante. Cette politique explique comment nous traitons vos informations.",
    
    // Section Collecte
    collecteTitle: "Collecte d'Informations",
    collecteDescription: "Pour les lecteurs : Aucune information personnelle n'est collectée. Vous pouvez lire nos histoires librement sans créer de compte.",
    techInfo1: "Adresse IP (anonymisée)",
    techInfo2: "Type de navigateur",
    techInfo3: "Pages visitées",
    techInfo4: "Durée de lecture",
    auteursInfo1: "Nom et prénom",
    auteursInfo2: "Adresse email",
    auteursInfo3: "Historique des publications",
    auteursInfo4: "Photos de profil (optionnelles)",
    
    // Section Cookies
    cookiesTitle: "Cookies et Services Tiers",
    cookiesWarning: "Important : Nous utilisons des services tiers pour améliorer votre expérience.",
    analyticsTitle: "Google Analytics",
    analyticsDesc: "Analyse anonyme du trafic pour comprendre les préférences de lecture",
    adsenseTitle: "Google AdSense",
    adsenseDesc: "Publicités pertinentes pour soutenir financièrement la plateforme",
    cookieControlText: "Vous pouvez désactiver les cookies publicitaires en visitant :",
    
    // Section Protection
    protectionTitle: "Protection des Données",
    protectionFeature1: "Chiffrement SSL",
    protectionDesc1: "Toutes les connexions sont sécurisées",
    protectionFeature2: "Respect des œuvres",
    protectionDesc2: "Les histoires publiées restent la propriété de leurs auteurs",
    protectionFeature3: "Transparence totale",
    protectionDesc3: "Nous ne vendons ni ne partageons vos données",
    
    // Section Liens
    liensTitle: "Liens Externes",
    liensDescription: "Notre bibliothèque peut contenir des liens vers des sites externes :",
    lien1: "Plateformes de musique",
    lien2: "Réseaux sociaux des auteurs",
    lien3: "Autres ressources littéraires",
    liensDisclaimer: "Note : Nous ne sommes pas responsables des pratiques de confidentialité de ces sites tiers.",
    
    // Section Consentement
    consentTitle: "Consentement",
    consentText: "En utilisant StoryHub, vous acceptez notre politique de confidentialité.",
    consentNote: "Lecture libre et anonyme - Aucune inscription requise",
    
    // Section Contact
    contactTitle: "Contact",
    contactText: "Pour toute question concernant la confidentialité :",
    contactEmail: "privacy@storyhub.com",
    contactMethod: "Via notre page de contact",
    
    // Mise à jour
    updateTitle: "Dernière mise à jour",
    updateDate: "15 Janvier 2024",
    updateNote: "Nous révisons régulièrement cette politique pour garantir votre protection."
  });

  const [activeSection, setActiveSection] = useState('hero');

  const handleSave = async () => {
    try {
      // TODO: Appel API pour sauvegarder
      console.log('Sauvegarde des données privacy:', privacyData);
      alert('✅ Politique de confidentialité sauvegardée !');
      if (onClose) onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('❌ Erreur lors de la sauvegarde');
    }
  };

  const sections = [
    { id: 'hero', name: '🏠 Section Hero', icon: '🏠' },
    { id: 'collecte', name: '📊 Collecte', icon: '📊' },
    { id: 'cookies', name: '🍪 Cookies', icon: '🍪' },
    { id: 'protection', name: '🛡️ Protection', icon: '🛡️' },
    { id: 'liens', name: '🔗 Liens externes', icon: '🔗' },
    { id: 'consent', name: '✅ Consentement', icon: '✅' },
    { id: 'contact', name: '📩 Contact', icon: '📩' },
    { id: 'update', name: '🔄 Mise à jour', icon: '🔄' }
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
                value={privacyData.heroTitle}
                onChange={(e) => setPrivacyData({...privacyData, heroTitle: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📝</span>
                Sous-titre
              </label>
              <input
                type="text"
                value={privacyData.heroSubtitle}
                onChange={(e) => setPrivacyData({...privacyData, heroSubtitle: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📄</span>
                Description
              </label>
              <textarea
                value={privacyData.heroDescription}
                onChange={(e) => setPrivacyData({...privacyData, heroDescription: e.target.value})}
                className="form-textarea"
                rows="3"
              />
            </div>
          </div>
        );

      case 'collecte':
        return (
          <div className="section-content">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📊</span>
                Titre section
              </label>
              <input
                type="text"
                value={privacyData.collecteTitle}
                onChange={(e) => setPrivacyData({...privacyData, collecteTitle: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📝</span>
                Description principale
              </label>
              <textarea
                value={privacyData.collecteDescription}
                onChange={(e) => setPrivacyData({...privacyData, collecteDescription: e.target.value})}
                className="form-textarea"
                rows="3"
              />
            </div>

            <div className="cards-grid">
              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">👥</span>
                  <h5>Informations techniques</h5>
                </div>
                <div className="form-group">
                  <label>Point 1</label>
                  <input
                    type="text"
                    value={privacyData.techInfo1}
                    onChange={(e) => setPrivacyData({...privacyData, techInfo1: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Point 2</label>
                  <input
                    type="text"
                    value={privacyData.techInfo2}
                    onChange={(e) => setPrivacyData({...privacyData, techInfo2: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Point 3</label>
                  <input
                    type="text"
                    value={privacyData.techInfo3}
                    onChange={(e) => setPrivacyData({...privacyData, techInfo3: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Point 4</label>
                  <input
                    type="text"
                    value={privacyData.techInfo4}
                    onChange={(e) => setPrivacyData({...privacyData, techInfo4: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">✍️</span>
                  <h5>Pour les auteurs uniquement</h5>
                </div>
                <div className="form-group">
                  <label>Point 1</label>
                  <input
                    type="text"
                    value={privacyData.auteursInfo1}
                    onChange={(e) => setPrivacyData({...privacyData, auteursInfo1: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Point 2</label>
                  <input
                    type="text"
                    value={privacyData.auteursInfo2}
                    onChange={(e) => setPrivacyData({...privacyData, auteursInfo2: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Point 3</label>
                  <input
                    type="text"
                    value={privacyData.auteursInfo3}
                    onChange={(e) => setPrivacyData({...privacyData, auteursInfo3: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Point 4</label>
                  <input
                    type="text"
                    value={privacyData.auteursInfo4}
                    onChange={(e) => setPrivacyData({...privacyData, auteursInfo4: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'cookies':
        return (
          <div className="section-content">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">🍪</span>
                Titre section
              </label>
              <input
                type="text"
                value={privacyData.cookiesTitle}
                onChange={(e) => setPrivacyData({...privacyData, cookiesTitle: e.target.value})}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">⚠️</span>
                Avertissement
              </label>
              <textarea
                value={privacyData.cookiesWarning}
                onChange={(e) => setPrivacyData({...privacyData, cookiesWarning: e.target.value})}
                className="form-textarea"
                rows="2"
              />
            </div>

            <div className="cards-grid">
              <div className="card-editor">
                <div className="card-header">
                  <h5>Google Analytics</h5>
                </div>
                <div className="form-group">
                  <label>Titre</label>
                  <input
                    type="text"
                    value={privacyData.analyticsTitle}
                    onChange={(e) => setPrivacyData({...privacyData, analyticsTitle: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={privacyData.analyticsDesc}
                    onChange={(e) => setPrivacyData({...privacyData, analyticsDesc: e.target.value})}
                    className="form-textarea"
                    rows="2"
                  />
                </div>
              </div>

              <div className="card-editor">
                <div className="card-header">
                  <h5>Google AdSense</h5>
                </div>
                <div className="form-group">
                  <label>Titre</label>
                  <input
                    type="text"
                    value={privacyData.adsenseTitle}
                    onChange={(e) => setPrivacyData({...privacyData, adsenseTitle: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={privacyData.adsenseDesc}
                    onChange={(e) => setPrivacyData({...privacyData, adsenseDesc: e.target.value})}
                    className="form-textarea"
                    rows="2"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">🔄</span>
                Texte contrôle cookies
              </label>
              <textarea
                value={privacyData.cookieControlText}
                onChange={(e) => setPrivacyData({...privacyData, cookieControlText: e.target.value})}
                className="form-textarea"
                rows="2"
              />
            </div>
          </div>
        );

      case 'protection':
        return (
          <div className="section-content">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">🛡️</span>
                Titre section
              </label>
              <input
                type="text"
                value={privacyData.protectionTitle}
                onChange={(e) => setPrivacyData({...privacyData, protectionTitle: e.target.value})}
                className="form-input"
              />
            </div>

            <div className="cards-grid">
              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">🔐</span>
                  <h5>Fonctionnalité 1</h5>
                </div>
                <div className="form-group">
                  <label>Titre</label>
                  <input
                    type="text"
                    value={privacyData.protectionFeature1}
                    onChange={(e) => setPrivacyData({...privacyData, protectionFeature1: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={privacyData.protectionDesc1}
                    onChange={(e) => setPrivacyData({...privacyData, protectionDesc1: e.target.value})}
                    className="form-textarea"
                    rows="2"
                  />
                </div>
              </div>

              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">📚</span>
                  <h5>Fonctionnalité 2</h5>
                </div>
                <div className="form-group">
                  <label>Titre</label>
                  <input
                    type="text"
                    value={privacyData.protectionFeature2}
                    onChange={(e) => setPrivacyData({...privacyData, protectionFeature2: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={privacyData.protectionDesc2}
                    onChange={(e) => setPrivacyData({...privacyData, protectionDesc2: e.target.value})}
                    className="form-textarea"
                    rows="2"
                  />
                </div>
              </div>

              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">👁️</span>
                  <h5>Fonctionnalité 3</h5>
                </div>
                <div className="form-group">
                  <label>Titre</label>
                  <input
                    type="text"
                    value={privacyData.protectionFeature3}
                    onChange={(e) => setPrivacyData({...privacyData, protectionFeature3: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={privacyData.protectionDesc3}
                    onChange={(e) => setPrivacyData({...privacyData, protectionDesc3: e.target.value})}
                    className="form-textarea"
                    rows="2"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      // ... (les autres sections suivent le même pattern)

      default:
        return (
          <div className="section-content">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📝</span>
                Contenu de la section
              </label>
              <textarea
                value={privacyData[`${activeSection}Text`] || ''}
                onChange={(e) => setPrivacyData({...privacyData, [`${activeSection}Text`]: e.target.value})}
                className="form-textarea"
                rows="6"
                placeholder="Éditez le contenu de cette section..."
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="privacy-editor">
      <div className="editor-header">
        <div className="header-content">
          <h2>🔒 Édition de la Politique de Confidentialité</h2>
          <p>Modifiez le contenu de votre page de confidentialité</p>
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
              Sauvegarder
            </button>
            <button className="preview-btn">
              <span className="btn-icon">👁️</span>
              Aperçu
            </button>
            <button className="close-btn" onClick={onClose}>
              <span className="btn-icon">❌</span>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyEditor;