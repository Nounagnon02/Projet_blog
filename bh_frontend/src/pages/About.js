
import { Link } from 'react-router-dom';
import './About.css';
import { aboutPageAPI } from '../components/Admin/apiService';
import React, {useState, useEffect} from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

const About = () => {
  useAnalytics(); // Hook pour le tracking des pages vues
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      loadAboutData();
    }, []);
      
    const loadAboutData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await aboutPageAPI.get();
            
        if (response.success && response.data) {
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
  

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>{aboutData.heroTitle}</h1>
          <p className="hero-subtitle">
            {aboutData.heroSubtitle}
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
      </section>

      {/* Notre Mission */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header">
            <h2>{aboutData.missionTitle}</h2>
            <p>{aboutData.missionSubtitle}</p>
          </div>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="card-icon">🌟</div>
              <h3>Inspirer</h3>
              <p>{aboutData.missionInspire}</p>
            </div>
            <div className="mission-card">
              <div className="card-icon">🤝</div>
              <h3>Connecter</h3>
              <p>{aboutData.missionConnect}</p>
            </div>
            <div className="mission-card">
              <div className="card-icon">🚀</div>
              <h3>Innovation</h3>
              <p>{aboutData.missionInnovate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>{aboutData.teamTitle}</h2>
            <p>{aboutData.teamSubtitle}</p>
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
          <h2>{aboutData.ctaTitle}</h2>
          <p>{aboutData.ctaSubtitle}</p>
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