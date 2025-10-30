import React, { useState , useEffect} from 'react';
import { articleAPI } from '../../services/Api';
import  api  from '../../services/Api';
import './ArticleForm.css';

const ArticleForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content1: '',
    content2: '',
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
    submitData.append('content1', formData.content1);
    submitData.append('content2', formData.content2);
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
      const result = await api.post('/articles/storage', submitData);
      
      console.log('Response:', result.data);
      
      if (result.data.success) {
        alert('Histoire créée avec succès!');
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
        setFormData({ 
            title: '',
            content1: '',
            content2: '',
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

// Ajoutez cette fonction utilitaire dans votre ArticleForm.js

const compressImage = (file, maxSizeMB = 2) => {
  return new Promise((resolve, reject) => {
    const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
    
    // Si l'image est déjà assez petite, la retourner telle quelle
    if (file.size <= maxSize) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculer les nouvelles dimensions tout en gardant le ratio
        const maxDimension = 1920;
        if (width > height && width > maxDimension) {
          height = (height * maxDimension) / width;
          width = maxDimension;
        } else if (height > maxDimension) {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Commencer avec une qualité de 0.8
        let quality = 0.8;
        
        canvas.toBlob(
          (blob) => {
            if (blob.size > maxSize && quality > 0.1) {
              // Si toujours trop grand, réessayer avec une qualité moindre
              quality -= 0.1;
              canvas.toBlob(
                (newBlob) => {
                  const compressedFile = new File([newBlob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  });
                  resolve(compressedFile);
                },
                'image/jpeg',
                quality
              );
            } else {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            }
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = reject;
    };
    
    reader.onerror = reject;
  });
};

// Modifiez vos gestionnaires d'images existants :

const handleImageChange1 = async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      // Compresser l'image avant de la stocker
      const compressedFile = await compressImage(file, 2); // 2MB max
      console.log(`Image compressée: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
      
      setImage1(compressedFile);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview1(reader.result);
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Erreur lors de la compression:', error);
      alert('Erreur lors du traitement de l\'image');
    }
  }
};

const handleImageChange2 = async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      const compressedFile = await compressImage(file, 2); // 2MB max
      console.log(`Image compressée: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
      
      setImage2(compressedFile);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview2(reader.result);
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Erreur lors de la compression:', error);
      alert('Erreur lors du traitement de l\'image');
    }
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
            <label className="form-label">Contenu Au dessus de la première image</label>
            <textarea
              name="content1"
              value={formData.content1}
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
            <label className="form-label">Contenu Au dessus de la seconde image</label>
            <textarea
              name="content2"
              value={formData.content2}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Votre histoire commence ici..."
              rows="4"
              required
            />
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
              'Publier l\'histoire'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;