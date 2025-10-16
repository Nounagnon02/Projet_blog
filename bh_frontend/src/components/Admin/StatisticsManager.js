import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { statisticsAPI } from './apiService';
import './StatisticsManager.css';

const StatisticsManager = () => {
  const [timeRange, setTimeRange] = useState('7');
  const [activeChart, setActiveChart] = useState('overview');
  const [stats, setStats] = useState(null);
  const [pageViews, setPageViews] = useState([]);
  const [topArticles, setTopArticles] = useState([]);
  const [devices, setDevices] = useState([]);
  const [browsers, setBrowsers] = useState([]);
  const [os, setOs] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  useEffect(() => {
    loadAllData();
  }, [timeRange]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [statsRes, viewsRes, articlesRes, devicesRes, browsersRes, osRes, countriesRes] = await Promise.all([
        statisticsAPI.getDashboard(),
        statisticsAPI.getPageViews(timeRange),
        statisticsAPI.getTopArticles(10),
        statisticsAPI.getDevices(),
        statisticsAPI.getBrowsers(),
        statisticsAPI.getOs(),
        statisticsAPI.getCountries()
      ]);
      
      if (statsRes.success) setStats(statsRes.data);
      if (viewsRes.success) setPageViews(viewsRes.data);
      if (articlesRes.success) setTopArticles(articlesRes.data);
      if (devicesRes.success) setDevices(devicesRes.data);
      if (browsersRes.success) setBrowsers(browsersRes.data);
      if (osRes.success) setOs(osRes.data);
      if (countriesRes.success) setCountries(countriesRes.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return <div className="statistics-manager"><p>Chargement...</p></div>;
  }

  const data = {
    pages: pageViews.map(v => ({ name: v.date, value: v.count })),
    countries: countries.map(c => ({ name: c.country || 'Inconnu', value: c.count })),
    browsers: browsers.map(b => ({ name: b.browser || 'Inconnu', value: b.count })),
    os: os.map(o => ({ name: o.os || 'Inconnu', value: o.count })),
    devices: devices.map(d => ({ name: d.device || 'Inconnu', value: d.count })),
    articles: topArticles.map(a => ({ 
      title: a.article?.title || `Article ${a.article_id}`,
      value: a.views
    }))
  };

  return (
    <div className="statistics-manager">
      <div className="stats-header">
        <div>
          <h2>📊 Tableau de Bord Analytics</h2>
          <p>Analyse complète de votre audience et performance</p>
        </div>
        <div className="header-controls">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="7">7 jours</option>
            <option value="30">30 jours</option>
            <option value="90">90 jours</option>
          </select>
          <button onClick={loadAllData} className="refresh-btn">🔄 Actualiser</button>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="main-metrics">
        <div className="metric-card primary">
          <div className="metric-icon">👁️</div>
          <div className="metric-content">
            <h3>{stats.views.total.toLocaleString()}</h3>
            <p>Vues totales</p>
          </div>
        </div>
        <div className="metric-card success">
          <div className="metric-icon">📚</div>
          <div className="metric-content">
            <h3>{stats.articles.total.toLocaleString()}</h3>
            <p>Articles</p>
          </div>
        </div>
        <div className="metric-card warning">
          <div className="metric-icon">📨</div>
          <div className="metric-content">
            <h3>{stats.messages.unread}</h3>
            <p>Messages non lus</p>
          </div>
        </div>
        <div className="metric-card info">
          <div className="metric-icon">📁</div>
          <div className="metric-content">
            <h3>{stats.categories.total}</h3>
            <p>Catégories</p>
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
            <div className="chart-card full-width">
              <h4>📚 Top 10 Histoires les Plus Lues</h4>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={data.articles} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="title" width={200} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#00C49F">
                    {data.articles.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
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
        <h4>📋 Statistiques Détaillées par Histoire</h4>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Titre de l'Histoire</th>
                <th>Vues</th>
                <th>Lecteurs Uniques</th>
                <th>Taux d'Engagement</th>
                <th>Dernière Vue</th>
              </tr>
            </thead>
            <tbody>
              {topArticles.slice(0, 15).map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{item.article?.title || `Article ${item.article_id}`}</strong>
                    <br />
                    <small style={{color: '#666'}}>{item.article?.category || 'Non catégorisé'}</small>
                  </td>
                  <td><span className="badge-views">{item.views}</span></td>
                  <td>{item.unique_readers || Math.floor(item.views * 0.7)}</td>
                  <td>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${Math.min((item.views / (topArticles[0]?.views || 1)) * 100, 100)}%`}}></div>
                    </div>
                  </td>
                  <td>{item.last_viewed ? new Date(item.last_viewed).toLocaleDateString() : 'N/A'}</td>
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