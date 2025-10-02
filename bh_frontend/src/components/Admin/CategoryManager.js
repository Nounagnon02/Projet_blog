import React, { useState, useEffect } from 'react';
import './CategoryManager.css';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // Simple form inline

  // Charger les catégories
  const loadCategories = async () => {
    try {
      const mockCategories = [
        { id: 1, name: 'Aventure' },
        { id: 2, name: 'Romance' },
        { id: 3, name: 'Mystère' }
      ];
      setCategories(mockCategories);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      const newCat = {
        id: Date.now(),
        name: newCategory.trim()
      };
      setCategories([...categories, newCat]);
      setNewCategory('');
      setShowAddForm(false);
      alert('✅ Catégorie ajoutée avec succès!');
    }
  };

  const handleUpdateCategory = async (id) => {
    if (editName.trim()) {
      setCategories(categories.map(cat => 
        cat.id === id ? { ...cat, name: editName.trim() } : cat
      ));
      setEditingId(null);
      setEditName('');
      alert('✅ Catégorie modifiée avec succès!');
    }
  };

  const handleDeleteCategory = async (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    setDeleteConfirm(null);
    alert('🗑️ Catégorie supprimée avec succès!');
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
        <h3>📂 Catégories</h3>
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