import React from 'react';
import ArticleForm from '../components/Admin/ArticleForm';

const CreateArticle = () => {
  return (
    <div className="admin-page">
      <div className="admin-section">
        <div className="admin-header">
          <h2>Créer une Nouvelle Histoire</h2>
          <p>Partagez votre créativité avec le monde</p>
        </div>
        <ArticleForm />
      </div>
    </div>
  );
};

export default CreateArticle;