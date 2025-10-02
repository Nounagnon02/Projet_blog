import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* Section Hero globale */}
      <section className="hero">
        <h1>Découvrez des Histoires Captivantes</h1>
        <p>Plongez dans un monde de récits fascinants, d'aventures épiques et d'émotions fortes</p>
      </section>
      
      {children}
    </div>
  );
};

export default Layout;