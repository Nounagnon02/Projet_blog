import React from 'react';
import ArticleList from '../components/ArticleList';
import './Home.css';
import { useAnalytics } from '../hooks/useAnalytics';

const Home = () => {
  useAnalytics(); // Hook pour le tracking des pages vues
  return (
    <div className="home-page">  

      {/* Liste des articles */}
      <ArticleList /> 
    </div>
  );
};

export default Home;