import React, { useState, useEffect } from 'react';
import './CategoryManager.css';
import api from '../../services/Api';
import axios from 'axios';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // Simple form inline
  const [loading, setLoading] = useState(false);
  const [categorie, setCategorie] = useState([]);

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



  const handleAddCategory = async (e) => {
    e.preventDefault();
    
    if (!newCategory.trim()) {
        alert('Veuillez entrer un nom');
        return;
    }

    try {
        setLoading(true);
        
        // Envoyer seulement la nouvelle catégorie
        const response = await api.post(
            '/categories/store',
            { name: newCategory.trim() },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if (response.data.success) {
            // Ajouter la nouvelle catégorie à la liste existante
            setCategories([...categories, response.data.category]);
            
            // Réinitialiser le formulaire
            setNewCategory('');
            setShowAddForm(false);
            
            alert('Catégorie ajoutée avec succès');
        } else {
            throw new Error(response.data.message || 'Erreur lors de l\'enregistrement bor ingbé');
        }
        
    } catch (error) {
        const errorMsg = error.response?.data?.message || 
                        error.message || 
                        'Erreur lors de l\'enregistrement';
        
        alert(`Erreur: ${errorMsg}`);
        console.error('Error details:', error);
    } finally {
        setLoading(false);
    }
};

const handleUpdateCategory = async (id) => {
  if (!editName.trim()) {
    alert('Le nom ne peut pas être vide');
    return;
  }

  try {
    setLoading(true);
    const response = await api.put(
      `/categories/update/${id}`, // Add leading slash
      { name: editName.trim() }  // Simplified payload
    );

    // Check if we have a response
    if (response && response.data) {
      // Update the local state
      setCategories(prevCategories => 
        prevCategories.map(cat =>
          cat.id === id ? { ...cat, name: editName.trim() } : cat
        )
      );
      
      // Reset the form
      setEditingId(null);
      setEditName('');
      
      // Show success message
      alert('✅ Catégorie modifiée avec succès!');
    } else {
      throw new Error('Réponse invalide du serveur');
    }
  } catch (error) {
    // Better error handling
    console.error('Update error:', error);
    const errorMsg = error.response?.data?.message 
      || error.message 
      || 'Erreur lors de la modification';
    
    alert(`Erreur de modification: ${errorMsg}`);
  } finally {
    setLoading(false);
  }
};

const handleDeleteCategory = async (id) => {
  try {
    setLoading(true);
    const response = await api.delete(`categories/destroy/${id}`);

    if (response.data.success) {
      setCategories(categories.filter(cat => cat.id !== id));
      setDeleteConfirm(null);
      alert('🗑️ Catégorie supprimée avec succès!');
    } else {
      throw new Error(response.data.message || 'Erreur lors de la suppression ok donc huytrre');
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message ||
      error.message ||
      'Erreur lors de la suppression';
    alert(`Erreur: ${errorMsg}`);
    console.error('Error details:', error);
  } finally {
    setLoading(false);
  }
};

  const startDelete = (id, name) => {
    setDeleteConfirm({ id, name });
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <div className="category-manager">
      <div className="category-header">
        <h3 className='PremierH3'>📂 Catégories</h3>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="toggle-add-btn"
        >
          {showAddForm ? '✕ Annuler' : '➕ Ajouter'}
        </button>
      </div>

      {/* Formulaire d'ajout simple */}
      {showAddForm && (
        <div className="simple-add-form">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nom de la nouvelle catégorie..."
            className="simple-input"
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            autoFocus
          />
          <button 
            onClick={handleAddCategory} 
            className="simple-add-btn"
            disabled={!newCategory.trim()}
          >
            ✅ Ajouter
          </button>
        </div>
      )}

      {/* Liste des catégories */}
      <div className="categories-list">
        {categories.length === 0 ? (
          <div className="empty-categories">
            <p>📝 Aucune catégorie</p>
            <small>Cliquez sur "Ajouter" pour créer la première</small>
          </div>
        ) : (
          categories.map(category => (
            <div key={category.id} className="category-item">
              {editingId === category.id ? (
                <div className="edit-category">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="simple-input"
                    placeholder="Nouveau nom..."
                    onKeyPress={(e) => e.key === 'Enter' && handleUpdateCategory(category.id)}
                  />
                  <div className="edit-actions">
                    <button 
                      onClick={() => handleUpdateCategory(category.id)}
                      className="save-btn"
                      disabled={!editName.trim()}
                    >
                      💾
                    </button>
                    <button 
                      onClick={() => {
                        setEditingId(null);
                        setEditName('');
                      }}
                      className="cancel-btn"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ) : (
                <div className="category-display">
                  <span className="category-name">{category.name}</span>
                  <div className="category-actions">
                    <button 
                      onClick={() => {
                        setEditingId(category.id);
                        setEditName(category.name);
                      }}
                      className="edit-btn"
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    
                    {deleteConfirm?.id === category.id ? (
                      <div className="delete-confirmation">
                        <span>Supprimer ?</span>
                        <button 
                          onClick={() => handleDeleteCategory(category.id)}
                          className="confirm-btn"
                        >
                          ✅
                        </button>
                        <button 
                          onClick={cancelDelete}
                          className="cancel-btn"
                        >
                          ❌
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => startDelete(category.id, category.name)}
                        className="delete-btn"
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Statistiques simples */}
      {categories.length > 0 && (
        <div className="simple-stats">
          <span>{categories.length} catégorie(s)</span>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;