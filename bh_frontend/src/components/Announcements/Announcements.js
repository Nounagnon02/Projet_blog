import React, { useState, useEffect } from 'react';
import './Announcements.css';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // ← AJOUTÉ

  // Données simulées
  const sampleAnnouncements = [
    {
      id: 1,
      title: "🎉 Nouveautés du mois",
      content: "Découvrez nos nouvelles histoires publiées ce mois-ci ! Des romans passionnants et des récits captivants vous attendent.",
      type: "promotion",
      active: true
    },
    {
      id: 2,
      title: "📢 Concours d'écriture",
      content: "Participez à notre concours mensuel ! Envoyez votre histoire avant le 30 janvier et gagnez des prix exceptionnels.",
      type: "event", 
      active: true
    }
  ];

  useEffect(() => {
    setAnnouncements(sampleAnnouncements.filter(ann => ann.active));
  }, []);

  useEffect(() => {
    if (announcements.length > 1 && isVisible) {
      const interval = setInterval(() => {
        setCurrentAnnouncement((prev) => 
          prev === announcements.length - 1 ? 0 : prev + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [announcements.length, isVisible]);

  // Fonction pour fermer l'annonce ← AJOUTÉ
  const handleClose = () => {
    setIsVisible(false);
  };

  if (announcements.length === 0 || !isVisible) { // ← MODIFIÉ
    return null;
  }

  const currentAnn = announcements[currentAnnouncement];

  return (
    <div className="announcements-banner">
      <div className={`announcement-item ${currentAnn.type}`}>
        <div className="announcement-content">
          <div className="announcement-icon">
            {currentAnn.type === 'info' && 'ℹ️'}
            {currentAnn.type === 'promotion' && '🎉'}
            {currentAnn.type === 'event' && '📢'}
            {currentAnn.type === 'warning' && '⚠️'}
          </div>
          <div className="announcement-text">
            <h4 className="announcement-title">{currentAnn.title}</h4>
            <p className="announcement-description">{currentAnn.content}</p>
          </div>
        </div>
        
        {/* Navigation si plusieurs annonces */}
        {announcements.length > 1 && (
          <div className="announcement-nav">
            {announcements.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${index === currentAnnouncement ? 'active' : ''}`}
                onClick={() => setCurrentAnnouncement(index)}
              />
            ))}
          </div>
        )}
        
        {/* Bouton fermer fonctionnel ← MODIFIÉ */}
        <button className="close-announcement" onClick={handleClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default Announcements;