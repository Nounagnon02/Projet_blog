import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      {/* Hero */}
      <section className="privacy-hero">
        <div className="hero-content">
          <h1>🔒 Politique de Confidentialité</h1>
          <p>Votre vie privée est notre priorité</p>
        </div>
        <div className="privacy-decoration">
          <div className="floating-shield">🛡️</div>
          <div className="floating-lock">🔐</div>
          <div className="floating-key">🗝️</div>
        </div>
      </section>

      <div className="privacy-container">
        {/* Navigation rapide */}
        <nav className="privacy-nav">
          <a href="#collecte" className="nav-link">Collecte</a>
          <a href="#utilisation" className="nav-link">Utilisation</a>
          <a href="#protection" className="nav-link">Protection</a>
          <a href="#droits" className="nav-link">Vos droits</a>
        </nav>

        {/* Contenu */}
        <div className="privacy-content">
          <section id="collecte" className="privacy-section">
            <h2>📊 Données que nous collectons</h2>
            <div className="data-grid">
              <div className="data-card">
                <div className="data-icon">👤</div>
                <h4>Informations personnelles</h4>
                <ul>
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Photo de profil (optionnelle)</li>
                </ul>
              </div>
              <div className="data-card">
                <div className="data-icon">📝</div>
                <h4>Contenu créé</h4>
                <ul>
                  <li>Histoires publiées</li>
                  <li>Commentaires</li>
                  <li>Préférences de lecture</li>
                </ul>
              </div>
              <div className="data-card">
                <div className="data-icon">🌐</div>
                <h4>Données techniques</h4>
                <ul>
                  <li>Adresse IP</li>
                  <li>Type de navigateur</li>
                  <li>Pages visitées</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="utilisation" className="privacy-section">
            <h2>🎯 Utilisation des données</h2>
            <div className="usage-list">
              <div className="usage-item">
                <span className="usage-icon">✅</span>
                <div>
                  <h4>Personnalisation de l'expérience</h4>
                  <p>Adapter le contenu à vos préférences de lecture</p>
                </div>
              </div>
              <div className="usage-item">
                <span className="usage-icon">✅</span>
                <div>
                  <h4>Amélioration du service</h4>
                  <p>Analyser l'usage pour optimiser la plateforme</p>
                </div>
              </div>
              <div className="usage-item">
                <span className="usage-icon">✅</span>
                <div>
                  <h4>Communication</h4>
                  <p>Vous informer des nouvelles fonctionnalités</p>
                </div>
              </div>
            </div>
          </section>

          <section id="protection" className="privacy-section">
            <h2>🛡️ Protection des données</h2>
            <div className="protection-cards">
              <div className="protection-card">
                <h3>Chiffrement SSL</h3>
                <p>Toutes les données sont chiffrées en transit</p>
              </div>
              <div className="protection-card">
                <h3>Serveurs sécurisés</h3>
                <p>Hébergement avec les meilleures pratiques de sécurité</p>
              </div>
              <div className="protection-card">
                <h3>Accès restreint</h3>
                <p>Seul le personnel autorisé peut accéder aux données</p>
              </div>
            </div>
          </section>

          <section id="droits" className="privacy-section">
            <h2>⚖️ Vos droits</h2>
            <div className="rights-grid">
              <div className="right-card">
                <h4>Droit d'accès</h4>
                <p>Consulter vos données personnelles</p>
              </div>
              <div className="right-card">
                <h4>Droit de rectification</h4>
                <p>Corriger les informations inexactes</p>
              </div>
              <div className="right-card">
                <h4>Droit à l'effacement</h4>
                <p>Supprimer votre compte et données</p>
              </div>
              <div className="right-card">
                <h4>Droit d'opposition</h4>
                <p>Refuser certains traitements</p>
              </div>
            </div>
            
            <div className="contact-privacy">
              <h4>📧 Questions sur la confidentialité ?</h4>
              <p>Contactez notre délégué à la protection des données : <strong>dpo@storyhub.com</strong></p>
            </div>
          </section>
        </div>
      </div>

      {/* Mise à jour */}
      <section className="update-section">
        <div className="container">
          <div className="update-card">
            <h3>🔄 Dernière mise à jour</h3>
            <p><strong>15 Janvier 2024</strong></p>
            <p>Nous révisons régulièrement notre politique pour garantir votre protection.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;