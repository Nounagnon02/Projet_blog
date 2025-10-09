import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';
import { aboutPageAPI } from '../components/Admin/apiService';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aboutData, setAboutData] = useState({
    heroTitle: "Mythes & Légendes",
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

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    loadAboutData();
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Empêcher le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const loadAboutData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await aboutPageAPI.get();
      
      if (response.success && response.data) {
        setAboutData({
          heroTitle: response.data.hero_title || "Mythes & Légendes",
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
      setError('Impossible de charger les données.');
    } finally {
      setLoading(false);
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`header ${scrolled ? 'scrolled' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="navbar">
        <Link to="/" className="logo">
          <span className="logo-icon">✨</span>
          {aboutData.heroTitle}
        </Link>
        
        {/* Bouton menu mobile */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Navigation */}
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActiveRoute('/') ? 'active' : ''}`}
          >
            <span className="link-icon">🏛</span>
            Accueil
          </Link>
          
          <Link 
            to="/about" 
            className={`nav-link ${isActiveRoute('/about') ? 'active' : ''}`}
          >
            <span className="link-icon">👥</span>
            À Propos
          </Link>
          
          <Link 
            to="/contact" 
            className={`nav-link ${isActiveRoute('/contact') ? 'active' : ''}`}
          >
            <span className="link-icon">📞</span>
            Contact
          </Link>
          
          <Link 
            to="/privacy" 
            className={`nav-link ${isActiveRoute('/privacy') ? 'active' : ''}`}
          >
            <span className="link-icon">🔒</span>
            Confidentialité
          </Link>
        </div>
      </nav>

      {/* Lueur au survol */}
      <div className="header-glow"></div>
    </header>
  );
};

export default Header;