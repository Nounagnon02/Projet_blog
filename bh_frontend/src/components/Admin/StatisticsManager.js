import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { useAnalyticsData } from '../../hooks/useAnalytics'; // Chemin corrigé
import './StatisticsManager.css';

const StatisticsManager = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [activeChart, setActiveChart] = useState('overview');
  const { getAnalytics } = useAnalyticsData();
  const [analyticsData, setAnalyticsData] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    const data = getAnalytics();
    setAnalyticsData(data);
  };

  // Traitement des données pour les graphiques
  const processData = () => {
    const pageViews = analyticsData.filter(d => d.type === 'page_view');
    const articleViews = analyticsData.filter(d => d.type === 'article_view');

    // Vues par page
    const pagesData = pageViews.reduce((acc, view) => {
      const pageName = getPageName(view.page);
      acc[pageName] = (acc[pageName] || 0) + 1;
      return acc;
    }, {});

    // Vues par pays (simulé - à remplacer par une API IP)
    const countriesData = {
      'France': 3240,
      'Canada': 1890,
      'Belgique': 980,
      'Suisse': 750,
      'Autres': 1550
    };

    // Navigateurs
    const browsersData = pageViews.reduce((acc, view) => {
      acc[view.browser] = (acc[view.browser] || 0) + 1;
      return acc;
    }, {});

    // Systèmes d'exploitation
    const osData = pageViews.reduce((acc, view) => {
      acc[view.os] = (acc[view.os] || 0) + 1;
      return acc;
    }, {});

    // Appareils
    const devicesData = pageViews.reduce((acc, view) => {
      acc[view.device] = (acc[view.device] || 0) + 1;
      return acc;
    }, {});

    // Vues par article
    const articlesData = articleViews.reduce((acc, view) => {
      if (view.articleId) {
        acc[view.articleId] = (acc[view.articleId] || 0) + 1;
      }
      return acc;
    }, {});

    return {
      pages: Object.entries(pagesData).map(([name, value]) => ({ name, value })),
      countries: Object.entries(countriesData).map(([name, value]) => ({ name, value })),
      browsers: Object.entries(browsersData).map(([name, value]) => ({ name, value })),
      os: Object.entries(osData).map(([name, value]) => ({ name, value })),
      devices: Object.entries(devicesData).map(([name, value]) => ({ name, value })),
      articles: Object.entries(articlesData).map(([id, value]) => ({ 
        id, 
        value,
        title: `Article ${id}` // À remplacer par le vrai titre
      }))
    };
  };

  const getPageName = (path) => {
    const pages = {
      '/': 'Accueil',
      '/about': 'À propos',
      '/contact': 'Contact',
      '/privacy': 'Confidentialité',
      '/library': 'Bibliothèque'
    };
    return pages[path] || path;
  };

  const data = processData();
  const totalViews = analyticsData.filter(d => d.type === 'page_view').length;
  const uniqueVisitors = new Set(analyticsData.map(d => d.userAgent)).size;

  return (
    <div className="statistics-manager">
      <div className="stats-header">
        <div>
          <h2>📊 Tableau de Bord Analytics</h2>
          <p>Analyse complète de votre audience et performance</p>
        </div>
        <div className="header-controls">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="7days">7 jours</option>
            <option value="30days">30 jours</option>
            <option value="90days">90 jours</option>
          </select>
          <button onClick={loadAnalytics} className="refresh-btn">🔄 Actualiser</button>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="main-metrics">
        <div className="metric-card primary">
          <div className="metric-icon">👁️</div>
          <div className="metric-content">
            <h3>{totalViews.toLocaleString()}</h3>
            <p>Vues totales</p>
          </div>
        </div>
        <div className="metric-card success">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>{uniqueVisitors.toLocaleString()}</h3>
            <p>Visiteurs uniques</p>
          </div>
        </div>
        <div className="metric-card warning">
          <div className="metric-icon">📚</div>
          <div className="metric-content">
            <h3>{data.articles.length}</h3>
            <p>Articles consultés</p>
          </div>
        </div>
        <div className="metric-card info">
          <div className="metric-icon">⏱️</div>
          <div className="metric-content">
            <h3>3:45</h3>
            <p>Temps moyen</p>
          </div>
        </div>
      </div>

      {/* Navigation des graphiques */}
      <div className="chart-nav">
        <button 
          className={activeChart === 'overview' ? 'active' : ''}
          onClick={() => setActiveChart('overview')}
        >
          📈 Aperçu
        </button>
        <button 
          className={activeChart === 'audience' ? 'active' : ''}
          onClick={() => setActiveChart('audience')}
        >
          🌍 Audience
        </button>
        <button 
          className={activeChart === 'content' ? 'active' : ''}
          onClick={() => setActiveChart('content')}
        >
          📚 Contenu
        </button>
        <button 
          className={activeChart === 'technical' ? 'active' : ''}
          onClick={() => setActiveChart('technical')}
        >
          🔧 Technique
        </button>
      </div>

      {/* Graphiques */}
      <div className="charts-grid">
        {activeChart === 'overview' && (
          <>
            <div className="chart-card">
              <h4>📄 Vues par Page</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.pages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h4>📈 Évolution des Vues</h4>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data.pages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeChart === 'audience' && (
          <>
            <div className="chart-card">
              <h4>🌍 Répartition Géographique</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.countries}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.countries.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h4>📱 Appareils Utilisés</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.devices}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.devices.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeChart === 'content' && (
          <>
            <div className="chart-card">
              <h4>📚 Vues par Article</h4>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data.articles} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="title" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeChart === 'technical' && (
          <>
            <div className="chart-card">
              <h4>🌐 Navigateurs</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.browsers}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.browsers.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h4>💻 Systèmes d'Exploitation</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.os}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>

      {/* Tableau détaillé */}
      <div className="data-table">
        <h4>📋 Données Détailées</h4>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Page</th>
                <th>Type</th>
                <th>Navigateur</th>
                <th>OS</th>
                <th>Appareil</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.slice(0, 10).map((item, index) => (
                <tr key={index}>
                  <td>{getPageName(item.page)}</td>
                  <td>{item.type}</td>
                  <td>{item.browser}</td>
                  <td>{item.os}</td>
                  <td>{item.device}</td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatisticsManager;