import React, { useState, useEffect } from 'react';
import './Contact.css';
import Api from '../services/Api';
import { contactPageAPI } from '../components/Admin/apiService';
import { useAnalytics } from '../hooks/useAnalytics'; 

const Contact = () => {
  useAnalytics(); // Hook pour le tracking des pages vues
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactData, setContactData] = useState({
        hero_title: "",
        hero_subtitle: "",
        email: "",
        email_subtitle: "",
        phone: "",
        phone_subtitle: "",
        address: "",
        address_subtitle: "",
        social: "",
        social_subtitle: "",
        form_title: "",
        form_subtitle: "",
        faq_title: "",
        faq_question_1: "",
        faq_answer_1: "",
        faq_question_2: "",
        faq_answer_2: "",
        faq_question_3: "",
        faq_answer_3: "",
        is_active: "",
        ctaSubtitle: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

	


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
      loadContactData();
  }, []);
      
    const loadContactData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await contactPageAPI.get();
            
        if (response.success && response.data) {
              setContactData({
                hero_title: response.data.hero_title ||  "",
                hero_subtitle: response.data.hero_subtitle ||  "",
                email: response.data.email ||  "",
                email_subtitle: response.data.email_subtitle ||  "",
                phone: response.data.phone ||  "",
                phone_subtitle: response.data.phone_subtitle ||  "",
                address: response.data.address ||  "",
                address_subtitle: response.data.address_subtitle ||  "",
                social: response.data.social ||  "",
                social_subtitle: response.data.social_subtitle ||  "",
                form_title: response.data.form_title ||  "",
                form_subtitle: response.data.form_subtitle ||  "",
                faq_title:  response.data.faq_title || "",
                faq_question_1: response.data.faq_question_1 ||  "",
                faq_answer_1: response.data.faq_answer_1 ||  "",
                faq_question_2: response.data.faq_question_2 ||  "",
                faq_answer_2: response.data.faq_answer_2 || "",
                faq_question_3:response.data.faq_question_3 ||  "",
                faq_answer_3: response.data.faq_answer_3 || "",
                is_active: response.data.is_active || "",
              
              });
            }
          } catch (err) {
            console.error('Erreur lors du chargement:', err);
            setError('Impossible de charger les données. Veuillez réessayer.');
          } finally {
            setLoading(false);
          }
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
          <h1>{contactData.hero_title}</h1>
          <p>{contactData.hero_subtitle}</p>
        </div>
      </section>

      <div className="contact-container">
        {/* Informations de contact */}
        <section className="contact-info">
          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Email</h3>
            <p>{contactData.email}</p>
            <span>{contactData.email_subtitle}</span>
          </div>
          
          <div className="info-card">
            <div className="info-icon">📱</div>
            <h3>Téléphone</h3>
            <p>{contactData.phone}</p>
            <span>{contactData.phone_subtitle}</span>
          </div>
          
          <div className="info-card">
            <div className="info-icon">🏢</div>
            <h3>Adresse</h3>
            <p>{contactData.address}</p>
            <span>{contactData.address_subtitle}</span>
          </div>
          
          <div className="info-card">
            <div className="info-icon">💬</div>
            <h3>Réseaux sociaux</h3>
            <p>{contactData.social}</p>
            <span>{contactData.social_subtitle}</span>
          </div>
        </section>

        {/* Formulaire de contact */}
        <section className="contact-form-section">
          <div className="form-header">
            <h2>✍️ {contactData.form_title}</h2>
            <p>{contactData.form_subtitle}</p>
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
          <h2>{contactData.faq_title}</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>{contactData.faq_question_1}</h4>
              <p>{contactData.faq_answer_1}</p>
            </div>
            <div className="faq-item">
              <h4>{contactData.faq_question_2}</h4>
              <p>{contactData.faq_answer_2}</p>
            </div>
            <div className="faq-item">
              <h4>{contactData.faq_question_3}</h4>
              <p>{contactData.faq_answer_3}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;