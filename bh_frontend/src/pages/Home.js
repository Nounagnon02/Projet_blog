import React from 'react';
import ArticleList from '../components/ArticleList';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">  

      {/* Liste des articles */}
      <ArticleList /> 
    </div>
  );
};

export default Home;