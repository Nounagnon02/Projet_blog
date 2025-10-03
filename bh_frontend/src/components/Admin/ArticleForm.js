import React, { useState , useEffect} from 'react';
import { articleAPI } from '../../services/api';
import  api  from '../../services/Api';
import './ArticleForm.css';

const ArticleForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    short_description: '',
    image1: '',
    image2: '',
    category_id: '',
    author_id: 1, // L'admin a l'ID 1
    date_published: new Date().toISOString(),
  });


  
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [categories,setCategories] =useState([]);

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('content', formData.content);
    submitData.append('short_description', formData.short_description);
    submitData.append('category_id', formData.category_id);
    submitData.append('author_id', 1);
    
    // CORRECTION : Formater la date pour MySQL
    const now = new Date();
    const mysqlDate = now.toISOString().slice(0, 19).replace('T', ' ');
    submitData.append('date_published', mysqlDate);
    // Résultat : "2025-10-02 16:41:18"
    
    if (image1) {
      submitData.append('image1', image1);
    }
    if (image2) {
      submitData.append('image2', image2);
    }

    // Debug: log FormData properly
    console.log('FormData contents:');
    for (let [key, value] of submitData.entries()) {
      console.log(key + ': ', value);
    }

    try {
      const result = await api.post('/articles/storage', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Response:', result.data);
      
      if (result.data.success) {
        alert('🎉 Histoire créée avec succès!');
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
        setFormData({ 
            title: '',
            content: '',
            short_description: '',
            category_id: '',
        });
        setImage1(null);
        setImage2(null);
        setImagePreview1(null);
        setImagePreview2(null);
        
      } else {
        alert('❌ Erreur: ' + (result.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Full error:', error);
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join(', ');
        alert('❌ Erreurs de validation: ' + errorMessages);
      } else {
        alert('❌ Erreur lors de la création: ' + (error.response?.data?.message || error.message));
      }
    } finally {
      setIsSubmitting(false);
    }
};
    // Charger les catégories
  const loadCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };
  
    useEffect(() => {
      loadCategories();
    }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage1(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview1(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage2(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview2(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage1 = () => {
    setImage1(null);
    setImagePreview1(null);
  };
  const removeImage2 = () => {
    setImage2(null);
    setImagePreview2(null);
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
              
              <option value="">
                  { categories.length === 0 
                      ? "Aucune categorie disponible "
                      : "Sélectionnez une catégorie"
                  }
              </option>
              {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                      {cat.name}
                  </option>
              ))}

            </select>

          <div className="form-group">
            <label className="form-label">Image1</label>
            {imagePreview1 ? (
              <div className="image-preview">
                <img src={imagePreview1} alt="Preview" className="preview-image" />
                <button type="button" onClick={removeImage1} className="remove-image-btn">
                  ✕
                </button>
              </div>
            ) : (
              <label className="file-upload-area">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange1}
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

          <div className="form-group">
            <label className="form-label">Image2</label>
            {imagePreview2 ? (
              <div className="image-preview">
                <img src={imagePreview2} alt="Preview" className="preview-image" />
                <button type="button" onClick={removeImage2} className="remove-image-btn">
                  ✕
                </button>
              </div>
            ) : (
              <label className="file-upload-area">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange2}
                  className="file-input"
                  required
                />
                <div className="upload-content">
                  <div className="upload-icon">📷</div>
                  <p>Ajouter la deuxième image</p>
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