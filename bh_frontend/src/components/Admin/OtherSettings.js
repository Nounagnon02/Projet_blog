import React, { useState } from 'react';
import AboutEditor from './AboutEditor';
import PrivacyEditor from './PrivacyEditor'; 
import ContactEditor from './ContactEditor';
import AnnouncementsEditor from './AnnouncementsEditor';  
import './OtherSettings.css';

const OtherSettings = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="other-settings">
      <h3 className='PremierH3'>⚙️ Autres modifications</h3>
      <p className="settings-description">
        Gestion des pages importantes du site
      </p>
      
      <div className="settings-grid">
        {/* Bouton À Propos */}
        <button 
          className="settings-card"
          onClick={() => openModal('about')}
        >
          <span className="settings-icon">📄</span>
          <span className="settings-title">Page "À Propos"</span>
          <span className="settings-desc">Modifier le contenu de la page À Propos</span>
        </button>
        
        {/* Bouton Contact */}
        <button 
          className="settings-card"
          onClick={() => openModal('contact')}
        >
          <span className="settings-icon">📱</span>
          <span className="settings-title">Contacts</span>
          <span className="settings-desc">Modifier les informations de contact</span>
        </button>
        
        {/* Bouton Politique de confidentialité */}
        <button 
          className="settings-card"
          onClick={() => openModal('privacy')}
        >
          <span className="settings-icon">🔒</span>
          <span className="settings-title">Politique de confidentialité</span>
          <span className="settings-desc">Gérer la politique de confidentialité</span>
        </button>
        
        {/* Bouton Annonces */}
        <button 
          className="settings-card"
          onClick={() => openModal('announcements')}
          >
        <span className="settings-icon">📢</span>
        <span className="settings-title">Annonces</span>
        <span className="settings-desc">Gérer les annonces du site</span>
        </button>

    
      {activeModal === 'announcements' && (
      <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h3>📢 Gestion des Annonces</h3>
        <button className="modal-close" onClick={closeModal}>
          ✕
        </button>
      </div>
      <div className="modal-body">
        <AnnouncementsEditor onClose={closeModal} />
      </div>
      </div>
        </div>
      )}


      </div>




      

      {/* Modal pour l'édition de la page À Propos */}
      {activeModal === 'about' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📄 Édition de la page "À Propos"</h3>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <AboutEditor onClose={closeModal} />
            </div>
          </div>
        </div>
      )}

      {/* Modal pour la page Contact */}
      {activeModal === 'contact' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📞 Édition de la page "Contact"</h3>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <ContactEditor onClose={closeModal} />
            </div>
          </div>
        </div>
      )}

      {/* Modal pour la politique de confidentialité */}
      {activeModal === 'privacy' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🔒 Édition de la politique de confidentialité</h3>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <PrivacyEditor onClose={closeModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherSettings;