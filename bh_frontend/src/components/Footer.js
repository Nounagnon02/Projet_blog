import React  from 'react';
import { Link } from 'react-router-dom';
import { aboutPageAPI } from '../components/Admin/apiService';
import { useState, useEffect } from 'react';
import api from '../services/Api';
import { emailPageAPI } from '../components/Admin/apiService';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  
    // Charger les catégories
  const loadCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur:', error);
      }
  };


  const envoyerMail = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      alert('Veuillez entrer un email valide');
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      
      const response = await emailPageAPI.create({ email });
      
      if (response.success) {
        alert('Inscription réussie !');
        setEmail('');
      } else {
        throw new Error(response.message || 'Erreur lors de l\'inscription');
      }
    } catch (err) {
      console.error('Erreur:', err);
      alert('Service temporairement indisponible. Réessayez plus tard.');
    } finally {
      setSaving(false);
    }
  };

  
    useEffect(() => {
      loadCategories();
    }, []);

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
    <footer className="mythical-footer">
      {/* Vague décorative en haut */}
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>

      {/* Particules d'ambiance */}
      <div className="footer-particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>

      <div className="footer-content">
        {/* Section principale */}
        <div className="footer-grid">
          {/* Colonne 1 - À propos */}
          <div className="footer-column">
            <div className="footer-logo">
              <span className="footer-logo-icon">✨</span>
              <h3>{aboutData.heroTitle}</h3>
            </div>
            <p className="footer-tagline">
              {aboutData.heroSubtitle}
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Colonne 2 - Navigation rapide */}
          <div className="footer-column">
            <h4 className="footer-title">
              <span className="title-icon">🧭</span>
              Navigation
            </h4>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/about">À Propos</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Confidentialité</Link></li>
            </ul>
          </div>

          {/* Colonne 3 - Catégories */}
          <div className="footer-column">
            <h4 className="footer-title">
              <span className="title-icon">📚</span>
              Catégories
            </h4>
            <ul className="footer-links">
              {categories.length === 0 ? (
                <li>
                  <div className="empty-categories">
                    <p>📝 Aucune catégorie</p>
                    <small>Cliquez sur "Ajouter" pour créer la première</small>
                  </div>
                </li>
              ) : (
                categories.map((categorie, index) => (
                  <li key={index}>
                    <Link to={`/category/${categorie.slug || 'mythologie'}`}>{categorie.name}</Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Colonne 4 - Newsletter */}
          <div className="footer-column">
            <h4 className="footer-title">
              <span className="title-icon">✉️</span>
              Newsletter
            </h4>
            <p className="newsletter-text">
              Recevez les nouvelles histoires directement dans votre boîte mail
            </p>
            <form className="newsletter-form" onSubmit={envoyerMail}>
              <input 
                type="email" 
                placeholder="Votre email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-button" disabled={saving}>
                {saving ? 'En cours...' : "S'abonner"}
              </button>
            </form>
          </div>
        </div>

        {/* Séparateur décoratif */}
        <div className="footer-divider">
          <div className="divider-ornament">⚜️</div>
        </div>

        {/* Copyright et mentions légales */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} StoryHub. Tous droits réservés. | Fait avec ❤️ pour les amoureux des histoires
          </p>
          <div className="footer-bottom-links">
            <Link to="/terms">Conditions d'utilisation</Link>
            <span className="separator">•</span>
            <Link to="/privacy">Politique de confidentialité</Link>
            <span className="separator">•</span>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mythical-footer {
          position: relative;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          color: #e4e4e4;
          overflow: hidden;
          margin-top: 80px;
        }

        .footer-wave {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }

        .footer-wave svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 80px;
          transform: rotateY(180deg);
        }

        .footer-wave path {
          fill: #f8f9fa;
        }

        .footer-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 215, 0, 0.6);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
          animation: float-particle linear infinite;
        }

        @keyframes float-particle {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .footer-content {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 40px 30px;
          z-index: 1;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .footer-content {
            padding: 60px 20px 20px;
          }
        }

        .footer-column {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .footer-column:nth-child(1) { animation-delay: 0.1s; }
        .footer-column:nth-child(2) { animation-delay: 0.2s; }
        .footer-column:nth-child(3) { animation-delay: 0.3s; }
        .footer-column:nth-child(4) { animation-delay: 0.4s; }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(20px);
          }
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .footer-logo-icon {
          font-size: 32px;
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.8));
          }
        }

        .footer-logo h3 {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .footer-tagline {
          font-size: 14px;
          line-height: 1.6;
          color: #b8b8b8;
          margin-bottom: 25px;
        }

        .footer-social {
          display: flex;
          gap: 15px;
        }

        .social-link {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          color: #e4e4e4;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-link:hover {
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #1a1a2e;
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);
        }

        .footer-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 25px;
          color: #ffd700;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .title-icon {
          font-size: 20px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-links a {
          color: #b8b8b8;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
          display: inline-block;
          position: relative;
        }

        .footer-links a::before {
          content: '→';
          position: absolute;
          left: -20px;
          opacity: 0;
          transition: all 0.3s ease;
          color: #ffd700;
        }

        .footer-links a:hover {
          color: #ffd700;
          padding-left: 20px;
        }

        .footer-links a:hover::before {
          opacity: 1;
          left: 0;
        }

        .newsletter-text {
          font-size: 14px;
          color: #b8b8b8;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .newsletter-input {
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #e4e4e4;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: #ffd700;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
        }

        .newsletter-input::placeholder {
          color: #808080;
        }

        .newsletter-button {
          padding: 12px 24px;
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #1a1a2e;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        }

        .newsletter-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(255, 215, 0, 0.5);
        }

        .newsletter-button:active {
          transform: translateY(0);
        }

        .footer-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 50px 0 40px;
          position: relative;
        }

        .footer-divider::before,
        .footer-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255, 215, 0, 0.3), transparent);
        }

        .divider-ornament {
          padding: 0 20px;
          font-size: 24px;
          color: #ffd700;
          animation: rotate-ornament 4s ease-in-out infinite;
        }

        @keyframes rotate-ornament {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
        }

        .footer-bottom {
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .copyright {
          font-size: 13px;
          color: #b8b8b8;
          margin-bottom: 15px;
        }

        .footer-bottom-links {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
          font-size: 13px;
        }

        .footer-bottom-links a {
          color: #b8b8b8;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: #ffd700;
        }

        .separator {
          color: #666;
        }

        .empty-categories {
          text-align: center;
          padding: 20px 0;
          color: #b8b8b8;
        }

        .empty-categories p {
          margin: 0 0 8px 0;
          font-size: 14px;
        }

        .empty-categories small {
          font-size: 12px;
          color: #808080;
        }
      `}</style>
    </footer>
  );
};

export default Footer;