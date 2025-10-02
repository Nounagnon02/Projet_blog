import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`header ${scrolled ? 'scrolled' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Effets de particules */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <nav className="navbar">
        <Link to="/" className="logo">
          <span className="logo-icon">✨</span>
          StoryHub
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <span className="link-icon">🏠</span>
            Accueil
          </Link>
          
          <Link to="/about" className="nav-link">
            <span className="link-icon">👥</span>
            À Propos
          </Link>
          
          <Link to="/contact" className="nav-link">
            <span className="link-icon">📞</span>
            Contact
          </Link>
          
          <Link to="/privacy" className="nav-link">
            <span className="link-icon">🔒</span>
            Confidentialité
          </Link>
          
          {/* Effet de vague animée */}
          <div className="nav-wave"></div>
        </div>
      </nav>

      {/* Lueur au survol */}
      <div className="header-glow"></div>
    </header>
  );
};

export default Header;