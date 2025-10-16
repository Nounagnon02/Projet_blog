import React, { useState, useEffect } from 'react';
import { contactPageAPI } from './apiService';
import './ContactEditor.css';

const ContactEditor = ({ onClose }) => {
  const [contactData, setContactData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    email: "",
    emailSubtitle: "",
    phone: "",
    phoneSubtitle: "",
    address: "",
    addressSubtitle: "",
    social: "",
    socialSubtitle: "",
    formTitle: "",
    formSubtitle: "",
    faqTitle: "",
    faqQuestion1: "",
    faqAnswer1: "",
    faqQuestion2: "",
    faqAnswer2: "",
    faqQuestion3: "",
    faqAnswer3: ""
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadContactData();
  }, []);

  const loadContactData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await contactPageAPI.get();
      
      if (response.success && response.data) {
        setContactData({
          heroTitle: response.data.hero_title || "",
          heroSubtitle: response.data.hero_subtitle || "",
          email: response.data.email || "",
          emailSubtitle: response.data.email_subtitle || "",
          phone: response.data.phone || "",
          phoneSubtitle: response.data.phone_subtitle || "",
          address: response.data.address || "",
          addressSubtitle: response.data.address_subtitle || "",
          social: response.data.social || "",
          socialSubtitle: response.data.social_subtitle || "",
          formTitle: response.data.form_title || "",
          formSubtitle: response.data.form_subtitle || "",
          faqTitle: response.data.faq_title || "",
          faqQuestion1: response.data.faq_question_1 || "",
          faqAnswer1: response.data.faq_answer_1 || "",
          faqQuestion2: response.data.faq_question_2 || "",
          faqAnswer2: response.data.faq_answer_2 || "",
          faqQuestion3: response.data.faq_question_3 || "",
          faqAnswer3: response.data.faq_answer_3 || ""
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
      
      const response = await contactPageAPI.update(contactData);
      
      if (response.success) {
        alert('✅ Informations de contact sauvegardées avec succès !');
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
    { id: 'contact', name: '📞 Infos Contact', icon: '📞' },
    { id: 'form', name: '✏️ Formulaire', icon: '✏️' },
    { id: 'faq', name: '❓ FAQ', icon: '❓' }
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
                value={contactData.heroTitle}
                onChange={(e) => setContactData({...contactData, heroTitle: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📝</span>
                Sous-titre
              </label>
              <textarea
                value={contactData.heroSubtitle}
                onChange={(e) => setContactData({...contactData, heroSubtitle: e.target.value})}
                className="form-textarea"
                rows="2"
              />
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="section-content">
            <div className="cards-grid">
              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">📧</span>
                  <h5>Email</h5>
                </div>
                <div className="form-group">
                  <label>Adresse email</label>
                  <input
                    type="email"
                    value={contactData.email}
                    onChange={(e) => setContactData({...contactData, email: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    value={contactData.emailSubtitle}
                    onChange={(e) => setContactData({...contactData, emailSubtitle: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">📱</span>
                  <h5>Téléphone</h5>
                </div>
                <div className="form-group">
                  <label>Numéro</label>
                  <input
                    type="text"
                    value={contactData.phone}
                    onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Horaires</label>
                  <input
                    type="text"
                    value={contactData.phoneSubtitle}
                    onChange={(e) => setContactData({...contactData, phoneSubtitle: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">🏢</span>
                  <h5>Adresse</h5>
                </div>
                <div className="form-group">
                  <label>Adresse</label>
                  <input
                    type="text"
                    value={contactData.address}
                    onChange={(e) => setContactData({...contactData, address: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Ville/Code postal</label>
                  <input
                    type="text"
                    value={contactData.addressSubtitle}
                    onChange={(e) => setContactData({...contactData, addressSubtitle: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">💬</span>
                  <h5>Réseaux sociaux</h5>
                </div>
                <div className="form-group">
                  <label>Compte</label>
                  <input
                    type="text"
                    value={contactData.social}
                    onChange={(e) => setContactData({...contactData, social: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    value={contactData.socialSubtitle}
                    onChange={(e) => setContactData({...contactData, socialSubtitle: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'form':
        return (
          <div className="section-content">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">✏️</span>
                Titre du formulaire
              </label>
              <input
                type="text"
                value={contactData.formTitle}
                onChange={(e) => setContactData({...contactData, formTitle: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📝</span>
                Sous-titre formulaire
              </label>
              <textarea
                value={contactData.formSubtitle}
                onChange={(e) => setContactData({...contactData, formSubtitle: e.target.value})}
                className="form-textarea"
                rows="2"
              />
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="section-content">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">❓</span>
                Titre FAQ
              </label>
              <input
                type="text"
                value={contactData.faqTitle}
                onChange={(e) => setContactData({...contactData, faqTitle: e.target.value})}
                className="form-input"
              />
            </div>

            <div className="cards-grid">
              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">1</span>
                  <h5>Question 1</h5>
                </div>
                <div className="form-group">
                  <label>Question</label>
                  <input
                    type="text"
                    value={contactData.faqQuestion1}
                    onChange={(e) => setContactData({...contactData, faqQuestion1: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Réponse</label>
                  <textarea
                    value={contactData.faqAnswer1}
                    onChange={(e) => setContactData({...contactData, faqAnswer1: e.target.value})}
                    className="form-textarea"
                    rows="3"
                  />
                </div>
              </div>

              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">2</span>
                  <h5>Question 2</h5>
                </div>
                <div className="form-group">
                  <label>Question</label>
                  <input
                    type="text"
                    value={contactData.faqQuestion2}
                    onChange={(e) => setContactData({...contactData, faqQuestion2: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Réponse</label>
                  <textarea
                    value={contactData.faqAnswer2}
                    onChange={(e) => setContactData({...contactData, faqAnswer2: e.target.value})}
                    className="form-textarea"
                    rows="3"
                  />
                </div>
              </div>

              <div className="card-editor">
                <div className="card-header">
                  <span className="card-icon">3</span>
                  <h5>Question 3</h5>
                </div>
                <div className="form-group">
                  <label>Question</label>
                  <input
                    type="text"
                    value={contactData.faqQuestion3}
                    onChange={(e) => setContactData({...contactData, faqQuestion3: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Réponse</label>
                  <textarea
                    value={contactData.faqAnswer3}
                    onChange={(e) => setContactData({...contactData, faqAnswer3: e.target.value})}
                    className="form-textarea"
                    rows="3"
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
      <div className="contact-editor">
        <div className="loading-container">
          <p>⏳ Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-editor">
      <div className="editor-header">
        <div className="header-content">
          <h2>📞 Édition de la page "Contact"</h2>
          <p>Modifiez les informations de contact et le contenu de la page</p>
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
              {' '}
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
            <button className="preview-btn">
              <span className="btn-icon">👁️</span>
              Aperçu
            </button>
            <button 
              className="reset-btn" 
              onClick={loadContactData}
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

export default ContactEditor;