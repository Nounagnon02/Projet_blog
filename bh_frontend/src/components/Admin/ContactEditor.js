import React, { useState } from 'react';
import './ContactEditor.css';

const ContactEditor = ({ onClose }) => {
  const [contactData, setContactData] = useState({
    heroTitle: "📞 Contactez-Nous",
    heroSubtitle: "Nous sommes là pour répondre à toutes vos questions",
    
    // Informations de contact
    email: "contact@storyhub.com",
    emailSubtitle: "Réponse sous 24h",
    phone: "+33 1 23 45 67 89", 
    phoneSubtitle: "Lun-Ven • 9h-18h",
    address: "123 Avenue des Histoires",
    addressSubtitle: "75001 Paris, France",
    social: "@StoryHubOfficiel",
    socialSubtitle: "Message direct",
    
    // Formulaire
    formTitle: "✍️ Envoyez-nous un message",
    formSubtitle: "Remplissez le formulaire ci-dessous",
    
    // FAQ
    faqTitle: "❓ Questions Fréquentes",
    faqQuestion1: "Comment publier une histoire ?",
    faqAnswer1: "Créez un compte auteur et soumettez votre manuscrit via notre plateforme.",
    faqQuestion2: "Est-ce gratuit ?",
    faqAnswer2: "Oui ! La lecture et la publication sont entièrement gratuites.",
    faqQuestion3: "Qui peut lire mes histoires ?",
    faqAnswer3: "Tous les utilisateurs inscrits peuvent découvrir vos créations."
  });

  const [activeSection, setActiveSection] = useState('hero');

  const handleSave = async () => {
    try {
      // TODO: Appel API pour sauvegarder
      console.log('Sauvegarde des données contact:', contactData);
      alert('✅ Informations de contact sauvegardées !');
      if (onClose) onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('❌ Erreur lors de la sauvegarde');
    }
  };

  const sections = [
    { id: 'hero', name: '🏠 Section Hero', icon: '🏠' },
    { id: 'contact', name: '📞 Infos Contact', icon: '📞' },
    { id: 'form', name: '✍️ Formulaire', icon: '✍️' },
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
                <span className="label-icon">✍️</span>
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

  return (
    <div className="contact-editor">
      <div className="editor-header">
        <div className="header-content">
          <h2>📞 Édition de la page "Contact"</h2>
          <p>Modifiez les informations de contact et le contenu de la page</p>
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

export default ContactEditor;