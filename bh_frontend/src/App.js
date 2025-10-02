import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import AdminLogin from './pages/AdminLogin'; // ← CETTE LIGNE DOIT EXISTER
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        
        <section className="hero">
          <h1>Découvrez des Histoires Captivantes</h1>
          <p>Plongez dans un monde de récits fascinants, d'aventures épiques et d'émotions fortes</p>
        </section>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} /> 
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;