import React, { useState, useEffect } from 'react';
import { privacyPageAPI } from './apiService';
import './PrivacyEditor.css';

const PrivacyEditor = ({ onClose }) => {
  const [privacyData, setPrivacyData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    collecteTitle: "",
    collecteDescription: "",
    techInfo1: "",
    techInfo2: "",
    techInfo3: "",
    techInfo4: "",
    auteursInfo1: "",
    auteursInfo2: "",
    auteursInfo3: "",
    auteursInfo4: "",
    cookiesTitle: "",
    cookiesWarning: "",
    analyticsTitle: "",
    analyticsDesc: "",
    adsenseTitle: "",
    adsenseDesc: "",
    cookieControlText: "",
    protectionTitle: "",
    protectionFeature1: "",
    protectionDesc1: "",
    protectionFeature2: "",
    protectionDesc2: "",
    protectionFeature3: "",
    protectionDesc3: ""
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPrivacyData();
  }, []);

  const loadPrivacyData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await privacyPageAPI.get();
      
      if (response.success && response.data) {
        setPrivacyData({
          heroTitle: response.data.hero_title || "",
          heroSubtitle: response.data.hero_subtitle || "",
          heroDescription: response.data.hero_description || "",
          collecteTitle: response.data.collecte_title || "",
          collecteDescription: response.data.collecte_description || "",
          techInfo1: response.data.tech_info_1 || "",
          techInfo2: response.data.tech_info_2 || "",
          techInfo3: response.data.tech_info_3 || "",
          techInfo4: response.data.tech_info_4 || "",
          auteursInfo1: response.data.auteurs_info_1 || "",
          auteursInfo2: response.data.auteurs_info_2 || "",
          auteursInfo3: response.data.auteurs_info_3 || "",
          auteursInfo4: response.data.auteurs_info_4 || "",
          cookiesTitle: response.data.cookies_title || "",
          cookiesWarning: response.data.cookies_warning || "",
          analyticsTitle: response.data.analytics_title || "",
          analyticsDesc: response.data.analytics_desc || "",
          adsenseTitle: response.data.adsense_title || "",
          adsenseDesc: response.data.adsense_desc || "",
          cookieControlText: response.data.cookie_control_text || "",
          protectionTitle: response.data.protection_title || "",
          protectionFeature1: response.data.protection_feature_1 || "",
          protectionDesc1: response.data.protection_desc_1 || "",
          protectionFeature2: response.data.protection_feature_2 || "",
          protectionDesc2: response.data.protection_desc_2 || "",
          protectionFeature3: response.data.protection_feature_3 || "",
          protectionDesc3: response.data.protection_desc_3 || ""
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
      
      const response = await privacyPageAPI.update(privacyData);
      
      if (response.success) {
        alert('✅ Politique de confidentialité sauvegardée avec succès !');
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

  const sections = [
    { id: 'hero', name: '🏠 Section Hero', icon: '🏠' },
    { id: 'collecte', name: '📊 Collecte', icon: '📊' },
    { id: 'cookies', name: '🍪 Cookies', icon: '🍪' },
    { id: 'protection', name: '🛡️ Protection', icon: '🛡️' }
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
                  <span className="card-icon">✏️</span>
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
                <span className="label-icon">📄</span>
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
                  <span className="card-icon">🔒</span>
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

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="privacy-editor">
        <div className="loading-container">
          <p>⏳ Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="privacy-editor">
      <div className="editor-header">
        <div className="header-content">
          <h2>🔒 Édition de la Politique de Confidentialité</h2>
          <p>Modifiez le contenu de votre page de confidentialité</p>
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

        <div className="editor-main">
          <div className="section-header">
            <h3>
              {sections.find(s => s.id === activeSection)?.icon}
              {sections.find(s => s.id === activeSection)?.name}
            </h3>
          </div>

          {renderSectionContent()}

          <div className="editor-actions">
            <button 
              className="save-btn" 
              onClick={handleSave}
              disabled={saving}
            >
              <span className="btn-icon">💾</span>
              {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
            <button 
              className="reset-btn" 
              onClick={loadPrivacyData}
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

export default PrivacyEditor;