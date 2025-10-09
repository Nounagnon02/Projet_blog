import React ,{useState, useEffect} from 'react';
import './Privacy.css';
import { privacyPageAPI } from '../components/Admin/apiService';


const Privacy = () => {

    const [privacyData, setPrivacyData] = useState({
        	
            hero_title:'',	
            hero_subtitle	:'',
            hero_description:'',
            collecte_title:'',
            collecte_description:'',	
            tech_info_1:'',
            tech_info_2:'',
            tech_info_3:'',
            tech_info_4	:'',
            auteurs_info_1:'',	
            auteurs_info_2:'',
            auteurs_info_3:'',
            auteurs_info_4	:'',
            cookies_title	:'',
            cookies_warning:'',
            analytics_title	:'',
            analytics_desc	:'',
            adsense_title:'',
            adsense_desc:'',
            cookie_control_text:'',
            protection_title:'',	
            protection_feature_1:'',
            protection_desc_1:'',
            protection_feature_2	:'',
            protection_desc_2	:'',
            protection_feature_3:'',
            protection_desc_3:'',
            liens_title	:'',
            liens_description :'',
            lien_1:'',
            lien_2	:'',
            lien_3	:'',
            liens_disclaimer :'',
            consent_title:'',
            consent_text	:'',
            consent_note	:'',
            contact_title	:'',
            contact_text:'',
            contact_email	:'',
            contact_method:'',	
            update_title:'',
            update_date:'',
            update_note:'',
    });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      loadPrivacyData();
  }, []);
      
    const loadPrivacyData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await privacyPageAPI.get();
            
        if (response.success && response.data) {
              setPrivacyData({
                hero_title: response.data.hero_title ||  "",
                hero_subtitle	:response.data.hero_subtitle ||  "",
                hero_description:response.data.hero_description ||  "",
                collecte_title:response.data.collecte_title ||  "",
                collecte_description:response.data.collecte_description ||  "",
                tech_info_1:response.data.tech_info_1 ||  "",
                tech_info_2:response.data.tech_info_2 ||  "",
                tech_info_3:response.data.tech_info_3 ||  "",
                tech_info_4	:response.data.tech_info_4 ||  "",
                auteurs_info_1:response.data.auteurs_info_1 ||  "",
                auteurs_info_2:response.data.auteurs_info_2 ||  "",
                auteurs_info_3:response.data.auteurs_info_3 ||  "",
                auteurs_info_4	:response.data.auteurs_info_4 ||  "",
                cookies_title	:response.data.cookies_title ||  "",
                cookies_warning:response.data.cookies_warning ||  "",
                analytics_title	:response.data.analytics_title ||  "",
                analytics_desc	:response.data.analytics_desc ||  "",
                adsense_title:response.data.adsense_title ||  "",
                adsense_desc:response.data.adsense_desc ||  "",
                cookie_control_text:response.data.cookie_control_text ||  "",
                protection_title:response.data.protection_title ||  "",
                protection_feature_1:response.data.protection_feature_1 ||  "",
                protection_desc_1:response.data.protection_desc_1 ||  "",
                protection_feature_2	:response.data.protection_feature_2 ||  "",
                protection_desc_2	:response.data.protection_desc_2 ||  "",
                protection_feature_3:response.data.protection_feature_3 ||  "",
                protection_desc_3:response.data.protection_desc_3 ||  "",
                liens_title	:response.data.liens_title ||  "",
                liens_description :response.data.liens_description ||  "",
                lien_1:response.data.lien_1 ||  "",
                lien_2	:response.data.lien_2 ||  "",
                lien_3	:response.data.lien_3 ||  "",
                liens_disclaimer :response.data.liens_disclaimer ||  "",
                consent_title:response.data.consent_title ||  "",
                consent_text	:response.data.consent_text ||  "",
                consent_note	:response.data.consent_note ||  "",
                contact_title	:response.data.contact_title ||  "",
                contact_text:response.data.contact_text ||  "",
                contact_email	:response.data.contact_email ||  "",
                contact_method:response.data.contact_method ||  "",
                update_title:response.data.update_title ||  "",
                update_date:response.data.update_date ||  "",
                update_note:response.data.update_note ||  "",
                  
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
    <div className="privacy-page">
      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="hero-content">
          <h1>{privacyData.hero_title}</h1>
          <p className="hero-subtitle">{privacyData.hero_subtitle}</p>
          <p className="hero-description">
            {privacyData.hero_description}
          </p>
        </div>
      </section>

      <div className="privacy-container">
        {/* Contenu Principal */}
        <div className="privacy-content">
          {/* Section Collecte */}
          <section className="privacy-section">
            <div className="section-header">
              <h2>{privacyData.collecte_title}</h2>
            </div>
            <div className="section-content">
              <p>
                 {privacyData.collecte_description}.
              </p>
              
              <div className="info-cards">
                <div className="info-card">
                  <div className="card-icon">👥</div>
                  <div className="card-content">
                    <h4>Informations techniques</h4>
                    <ul>
                      <li>{privacyData.tech_info_1}</li>
                      <li>{privacyData.tech_info_2}</li>
                      <li>{privacyData.tech_info_3}</li>
                      <li>{privacyData.tech_info_4}</li>
                    </ul>
                  </div>
                </div>
                
                <div className="info-card">
                  <div className="card-icon">✍️</div>
                  <div className="card-content">
                    <h4>Pour les auteurs uniquement</h4>
                    <ul>
                      <li>{privacyData.auteurs_info_1}</li>
                      <li>{privacyData.auteurs_info_2}</li>
                      <li>{privacyData.auteurs_info_3}</li>
                      <li>{privacyData.auteurs_info_4}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section Cookies */}
          <section className="privacy-section">
            <div className="section-header">
              <h2>{privacyData.cookies_title}</h2>
            </div>
            <div className="section-content">
              <div className="warning-note">
                <div className="warning-text">
                  {privacyData.cookies_warning}
                </div>
              </div>
              
              <div className="services-grid">
                <div className="service-item">
                  <h4>{privacyData.analytics_title}</h4>
                  <p>{privacyData.analytics_desc}</p>
                </div>
                
                <div className="service-item">
                  <h4>{privacyData.adsense_title}</h4>
                  <p>{privacyData.adsense_desc}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section Protection */}
          <section className="privacy-section">
            <div className="section-header">
              <h2>{privacyData.protection_title}</h2>
            </div>
            <div className="section-content">
              <div className="protection-features">
                <div className="feature">
                  <span className="feature-icon">🔐</span>
                  <div>
                    <h4>{privacyData.protection_feature_1}</h4>
                    <p>{privacyData.protection_desc_1}</p>
                  </div>
                </div>
                
                <div className="feature">
                  <span className="feature-icon">📚</span>
                  <div>
                    <h4>{privacyData.protection_feature_2}</h4>
                    <p>{privacyData.protection_desc_2}</p>
                  </div>
                </div>
                
                <div className="feature">
                  <span className="feature-icon">👁️</span>
                  <div>
                    <h4>{privacyData.protection_feature_3}</h4>
                    <p>{privacyData.protection_desc_3}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section Liens Externes */}
          <section className="privacy-section">
            <div className="section-header">
              <h2>{privacyData.liens_title}</h2>
            </div>
            <div className="section-content">
              <p>
                {privacyData.liens_description}
              </p>
              <div className="external-links">
                <div className="link-type">{privacyData.lien_1}</div>
                <div className="link-type">{privacyData.lien_2}</div>
                <div className="link-type">{privacyData.lien_3}</div>
              </div>
              <p className="disclaimer">
                {privacyData.liens_disclaimer}
              </p>
            </div>
          </section>

          {/* Section Consentement */}
          <section className="privacy-section">
            <div className="section-header">
              <h2>{privacyData.consent_title}</h2>
            </div>
            <div className="section-content">
              <div className="consent-card">
                <p>
                  {privacyData.consent_text}
                </p>
                <div className="consent-note">
                  <span className="note-icon">💡</span>
                  {privacyData.consent_note}
                </div>
              </div>
            </div>
          </section>

          {/* Section Contact */}
          <section className="privacy-section">
            <div className="section-header">
              <div className="section-icon">📩</div>
              <h2>{privacyData.contact_title}</h2>
            </div>
            <div className="section-content">
              <div className="contact-card">
                <p>
                  {privacyData.contact_text}
                </p>
                <div className="contact-info">
                  <div className="contact-method">
                    <span className="method-icon">📧</span>
                    <span>Email : {privacyData.contact_email}</span>
                  </div>
                  <div className="contact-method">
                    <span className="method-icon">💬</span>
                    <span>{privacyData.contact_method}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mise à jour */}
          <section className="update-section">
            <div className="update-card">
              <div className="update-header">
                <span className="update-icon">🔄</span>
                <h3>{privacyData.update_title}</h3>
              </div>
              <p className="update-date"><strong>{privacyData.update_date}</strong></p>
              <p className="update-note">
                {privacyData.update_note}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;