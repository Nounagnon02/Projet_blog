import React, { useState, useEffect } from 'react';
import { translationsAPI } from './Admin/apiService';
import './LanguageSelector.css';

const LanguageSelector = ({ articleId, onLanguageChange }) => {
  const [availableLanguages, setAvailableLanguages] = useState(['fr']);
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  const languages = {
    fr: { name: 'Français', flag: '🇫🇷' },
    en: { name: 'English', flag: '🇬🇧' },
    es: { name: 'Español', flag: '🇪🇸' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    ar: { name: 'العربية', flag: '🇸🇦' }
  };

  useEffect(() => {
    loadAvailableLanguages();
  }, [articleId]);

  const loadAvailableLanguages = async () => {
    try {
      const response = await translationsAPI.getAvailableLanguages(articleId);
      if (response.success) {
        setAvailableLanguages(['fr', ...response.data]);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleLanguageChange = async (lang) => {
    setCurrentLanguage(lang);
    if (lang !== 'fr' && onLanguageChange) {
      try {
        const response = await translationsAPI.get(articleId, lang);
        if (response.success) {
          onLanguageChange(response.data);
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    } else if (onLanguageChange) {
      onLanguageChange(null);
    }
  };

  return (
    <div className="language-selector">
      <span className="language-label">🌐 Langue:</span>
      <div className="language-buttons">
        {availableLanguages.map(lang => (
          <button
            key={lang}
            className={`lang-btn ${currentLanguage === lang ? 'active' : ''}`}
            onClick={() => handleLanguageChange(lang)}
          >
            {languages[lang]?.flag} {languages[lang]?.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
