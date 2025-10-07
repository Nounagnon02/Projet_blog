import React from 'react';
import ArticleList from '../components/ArticleList';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* SECTION HERO UNIQUEMENT SUR LA PAGE D'ACCUEIL */}
      <section className="hero">
        <h1>Découvrez des Histoires Captivantes</h1>
        <p>Plongez dans un monde de récits fascinants, d'aventures épiques et d'émotions fortes</p>
      </section>

      {/* Liste des articles */}
      <ArticleList /> 
    </div>
  );
};

export default Home;