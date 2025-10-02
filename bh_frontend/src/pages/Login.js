import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pour l'instant, connexion simple - à sécuriser plus tard
    if (email === 'admin@storyhub.com' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert('Identifiants incorrects');
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-card">
          <h2>Connexion Admin</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="admin@storyhub.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button type="submit" className="submit-button">
              Se connecter
            </button>
          </form>
          
          <div className="demo-credentials">
            <p><strong>Démo :</strong> admin@storyhub.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;