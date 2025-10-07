import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="hero-content">
          <h1>🔒 Politique de Confidentialité</h1>
          <p className="hero-subtitle">Bienvenue sur <strong>StoryHub</strong></p>
          <p className="hero-description">
            La confidentialité de nos visiteurs est très importante. 
            Cette politique explique comment nous traitons vos informations.
          </p>
        </div>
        <div className="privacy-decoration">
          <div className="floating-book">📖</div>
          <div className="floating-pen">✍️</div>
          <div className="floating-shield">🛡️</div>
        </div>
      </section>

      <div className="privacy-container">
        {/* Contenu Principal */}
        <div className="privacy-content">
          {/* Section Collecte */}
          <section className="privacy-section">
            <div className="section-header">
              <div className="section-icon">📊</div>
              <h2>Collecte d'Informations</h2>
            </div>
            <div className="section-content">
              <p>
                <strong>Pour les lecteurs :</strong> Aucune information personnelle n'est collectée. 
                Vous pouvez lire nos histoires librement sans créer de compte.
              </p>
              
              <div className="info-cards">
                <div className="info-card">
                  <div className="card-icon">👥</div>
                  <div className="card-content">
                    <h4>Informations techniques</h4>
                    <ul>
                      <li>Adresse IP (anonymisée)</li>
                      <li>Type de navigateur</li>
                      <li>Pages visitées</li>
                      <li>Durée de lecture</li>
                    </ul>
                  </div>
                </div>
                
                <div className="info-card">
                  <div className="card-icon">✍️</div>
                  <div className="card-content">
                    <h4>Pour les auteurs uniquement</h4>
                    <ul>
                      <li>Nom et prénom</li>
                      <li>Adresse email</li>
                      <li>Historique des publications</li>
                      <li>Photos de profil (optionnelles)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section Cookies */}
          <section className="privacy-section">
            <div className="section-header">
              <div className="section-icon">🍪</div>
              <h2>Cookies et Services Tiers</h2>
            </div>
            <div className="section-content">
              <div className="warning-note">
                <div className="warning-icon">⚠️</div>
                <div className="warning-text">
                  <strong>Important :</strong> Nous utilisons des services tiers pour améliorer votre expérience.
                </div>
              </div>
              
              <div className="services-grid">
                <div className="service-item">
                  <h4>Google Analytics</h4>
                  <p>Analyse anonyme du trafic pour comprendre les préférences de lecture</p>
                </div>
                
                <div className="service-item">
                  <h4>Google AdSense</h4>
                  <p>Publicités pertinentes pour soutenir financièrement la plateforme</p>
                </div>
              </div>
              
              <div className="cookie-control">
                <h4>🔄 Contrôle des Cookies</h4>
                <p>
                  Vous pouvez désactiver les cookies publicitaires en visitant :<br/>
                  <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                    👉 https://policies.google.com/technologies/ads
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Section Protection */}
          <section className="privacy-section">
            <div className="section-header">
              <div className="section-icon">🛡️</div>
              <h2>Protection des Données</h2>
            </div>
            <div className="section-content">
              <div className="protection-features">
                <div className="feature">
                  <span className="feature-icon">🔐</span>
                  <div>
                    <h4>Chiffrement SSL</h4>
                    <p>Toutes les connexions sont sécurisées</p>
                  </div>
                </div>
                
                <div className="feature">
                  <span className="feature-icon">📚</span>
                  <div>
                    <h4>Respect des œuvres</h4>
                    <p>Les histoires publiées restent la propriété de leurs auteurs</p>
                  </div>
                </div>
                
                <div className="feature">
                  <span className="feature-icon">👁️</span>
                  <div>
                    <h4>Transparence totale</h4>
                    <p>Nous ne vendons ni ne partageons vos données</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section Liens Externes */}
          <section className="privacy-section">
            <div className="section-header">
              <div className="section-icon">🔗</div>
              <h2>Liens Externes</h2>
            </div>
            <div className="section-content">
              <p>
                Notre bibliothèque peut contenir des liens vers des sites externes :
              </p>
              <div className="external-links">
                <div className="link-type">🎵 Plateformes de musique</div>
                <div className="link-type">📱 Réseaux sociaux des auteurs</div>
                <div className="link-type">🌐 Autres ressources littéraires</div>
              </div>
              <p className="disclaimer">
                <strong>Note :</strong> Nous ne sommes pas responsables des pratiques de confidentialité de ces sites tiers.
              </p>
            </div>
          </section>

          {/* Section Consentement */}
          <section className="privacy-section">
            <div className="section-header">
              <div className="section-icon">✅</div>
              <h2>Consentement</h2>
            </div>
            <div className="section-content">
              <div className="consent-card">
                <p>
                  En utilisant <strong>StoryHub</strong>, vous acceptez notre politique de confidentialité.
                </p>
                <div className="consent-note">
                  <span className="note-icon">💡</span>
                  <span>Lecture libre et anonyme - Aucune inscription requise</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section Contact */}
          <section className="privacy-section">
            <div className="section-header">
              <div className="section-icon">📩</div>
              <h2>Contact</h2>
            </div>
            <div className="section-content">
              <div className="contact-card">
                <p>
                  Pour toute question concernant la confidentialité :
                </p>
                <div className="contact-info">
                  <div className="contact-method">
                    <span className="method-icon">📧</span>
                    <span>Email : privacy@storyhub.com</span>
                  </div>
                  <div className="contact-method">
                    <span className="method-icon">💬</span>
                    <span>Via notre page de contact</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mise à jour */}
          <section className="update-section">
            <div className="update-card">
              <div className="update-header">
                <span className="update-icon">🔄</span>
                <h3>Dernière mise à jour</h3>
              </div>
              <p className="update-date"><strong>15 Janvier 2024</strong></p>
              <p className="update-note">
                Nous révisons régulièrement cette politique pour garantir votre protection.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;