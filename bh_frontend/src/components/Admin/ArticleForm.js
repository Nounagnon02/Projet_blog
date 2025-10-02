import React, { useState } from 'react';
import { articleAPI } from '../../services/api';
import './ArticleForm.css';

const ArticleForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    short_description: '',
    category: '',
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('content', formData.content);
    submitData.append('short_description', formData.short_description);
    submitData.append('category_id', formData.category_id);
    submitData.append('author_id', 1); // L'admin a l'ID 1
    submitData.append('date_published', new Date().toISOString());
    
    if (image) {
      submitData.append('image', image);
    }

    try {
      const result = await articleAPI.createArticle(submitData);
      
      if (result.success) {
        alert('🎉 Histoire créée avec succès!');
        
        // 🔥 REcharger la page automatiquement après 1 seconde
        setTimeout(() => {
          window.location.reload(); // Cette ligne rafraîchit toute la page
        }, 1000);
        
        // Réinitialiser le formulaire
        setFormData({ 
          title: '', 
          content: '', 
          short_description: '', 
          category_id: '' 
        });
        setImage(null);
        setImagePreview(null);
        
      } else {
        alert('❌ Erreur: ' + result.message);
      }
    } catch (error) {
      alert('❌ Erreur lors de la création: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="article-form-container">
      <div className="form-card">
        <div className="form-header">
          <div className="form-icon">✨</div>
          <h2>Nouvelle Histoire</h2>
          <p>Créez un récit captivant</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Titre</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Titre de votre histoire..."
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Description courte et attirante..."
              rows="2"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contenu</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Votre histoire commence ici..."
              rows="4"
              required
            />
          </div> 
             <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="form-input"
              required
              >           
              <option value="">Sélectionnez une catégorie</option>
              <option value="1">Aventure</option>
              <option value="2">Romance</option>
              <option value="3">Mystère</option>
            </select>

          <div className="form-group">
            <label className="form-label">Image</label>
            {imagePreview ? (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" className="preview-image" />
                <button type="button" onClick={removeImage} className="remove-image-btn">
                  ✕
                </button>
              </div>
            ) : (
              <label className="file-upload-area">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                  required
                />
                <div className="upload-content">
                  <div className="upload-icon">📷</div>
                  <p>Ajouter une image</p>
                </div>
              </label>
            )}
          </div>

          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Publication...
              </>
            ) : (
              '🚀 Publier l\'histoire'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;