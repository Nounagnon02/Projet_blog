import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('📧 Merci pour votre message ! Nous vous répondrons rapidement.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>📞 Contactez-Nous</h1>
          <p>Nous sommes là pour répondre à toutes vos questions</p>
        </div>
      </section>

      <div className="contact-container">
        {/* Informations de contact */}
        <section className="contact-info">
          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Email</h3>
            <p>contact@storyhub.com</p>
            <span>Réponse sous 24h</span>
          </div>
          
          <div className="info-card">
            <div className="info-icon">📱</div>
            <h3>Téléphone</h3>
            <p>+33 1 23 45 67 89</p>
            <span>Lun-Ven • 9h-18h</span>
          </div>
          
          <div className="info-card">
            <div className="info-icon">🏢</div>
            <h3>Adresse</h3>
            <p>123 Avenue des Histoires</p>
            <span>75001 Paris, France</span>
          </div>
          
          <div className="info-card">
            <div className="info-icon">💬</div>
            <h3>Réseaux sociaux</h3>
            <p>@StoryHubOfficiel</p>
            <span>Message direct</span>
          </div>
        </section>

        {/* Formulaire de contact */}
        <section className="contact-form-section">
          <div className="form-header">
            <h2>✍️ Envoyez-nous un message</h2>
            <p>Remplissez le formulaire ci-dessous</p>
          </div>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Votre nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Adresse email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@exemple.com"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Sujet du message</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Question sur mon compte..."
                required
              />
            </div>
            
            <div className="form-group">
              <label>Votre message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Décrivez-nous votre demande en détail..."
                rows="6"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">
              📤 Envoyer le message
            </button>
          </form>
        </section>
      </div>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2>Questions Fréquentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Comment publier une histoire ?</h4>
              <p>Créez un compte auteur et soumettez votre manuscrit via notre plateforme.</p>
            </div>
            <div className="faq-item">
              <h4>Est-ce gratuit ?</h4>
              <p>Oui ! La lecture et la publication sont entièrement gratuites.</p>
            </div>
            <div className="faq-item">
              <h4>Qui peut lire mes histoires ?</h4>
              <p>Tous les utilisateurs inscrits peuvent découvrir vos créations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;