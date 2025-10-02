import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>👋 Bienvenue sur StoryHub</h1>
          <p className="hero-subtitle">
            Votre plateforme de partage d'histoires captivantes
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Histoires publiées</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Auteurs talentueux</span>
            </div>
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Lecteurs satisfaits</span>
            </div>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="floating-book">📖</div>
          <div className="floating-pen">✍️</div>
          <div className="floating-heart">💖</div>
        </div>
      </section>

      {/* Notre Mission */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header">
            <h2>🎯 Notre Mission</h2>
            <p>Donner vie aux récits qui méritent d'être partagés</p>
          </div>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="card-icon">🌟</div>
              <h3>Inspirer</h3>
              <p>Créer un espace où chaque voix peut s'exprimer et inspirer des milliers de lecteurs</p>
            </div>
            <div className="mission-card">
              <div className="card-icon">🤝</div>
              <h3>Connecter</h3>
              <p>Rassembler une communauté passionnée d'auteurs et de lecteurs du monde entier</p>
            </div>
            <div className="mission-card">
              <div className="card-icon">🚀</div>
              <h3>Innovation</h3>
              <p>Révolutionner la façon dont les histoires sont découvertes et partagées</p>
            </div>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>👥 Notre Équipe</h2>
            <p>Des passionnés dévoués à votre expérience de lecture</p>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👑</div>
              <h4>Alexandre Dubois</h4>
              <span className="member-role">Fondateur & Éditeur en Chef</span>
              <p>Passionné de littérature depuis toujours</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">🎨</div>
              <h4>Sophie Martin</h4>
              <span className="member-role">Directrice Artistique</span>
              <p>Crée l'univers visuel de vos histoires</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">💻</div>
              <h4>Thomas Leroy</h4>
              <span className="member-role">Développeur Principal</span>
              <p>Garantit une expérience fluide et magique</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <h2>📖 Prêt à commencer votre aventure ?</h2>
          <p>Rejoignez notre communauté et découvrez des histoires extraordinaires</p>
          <div className="cta-buttons">
            <Link to="/" className="cta-btn primary">
              Explorer les histoires
            </Link>
            <Link to="/contact" className="cta-btn secondary">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;