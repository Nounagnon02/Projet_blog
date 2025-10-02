import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      sessionStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin/dashboard'); // ← Doit rediriger vers /admin/dashboard
    } else {
      alert('Mot de passe administrateur incorrect');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <h2>🔐 Connexion Administrateur</h2>
            <p>Accès réservé au gestionnaire du site</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Mot de passe administrateur</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Entrez le mot de passe..."
                required
              />
            </div>
            
            <button type="submit" className="admin-login-button">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;