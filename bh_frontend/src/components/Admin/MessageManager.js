import React, { useState, useEffect } from 'react';
import './MessageManager.css';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'replied'

  // Données simulées - À remplacer par votre API
  const mockMessages = [
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      subject: 'Problème de connexion',
      message: 'Je n\'arrive pas à me connecter à mon compte depuis hier.',
      date: '2024-01-15 14:30',
      read: false,
      replied: false
    },
    {
      id: 2,
      name: 'Marie Martin',
      email: 'marie.martin@email.com',
      subject: 'Suggestion de livre',
      message: 'Serait-il possible d\'ajouter plus de livres de science-fiction ?',
      date: '2024-01-14 10:15',
      read: true,
      replied: true
    },
    {
      id: 3,
      name: 'Pierre Lambert',
      email: 'pierre.lambert@email.com',
      subject: 'Question sur mon abonnement',
      message: 'Mon abonnement se renouvelle-t-il automatiquement ?',
      date: '2024-01-13 16:45',
      read: true,
      replied: false
    }
  ];

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    // Simuler un appel API
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 1000);
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'unread') return !message.read;
    if (filter === 'replied') return message.replied;
    return true;
  });

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    setReplyText('');
    // Marquer comme lu
    if (!message.read) {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, read: true } : msg
      ));
    }
  };

  const handleReply = async () => {
    if (!replyText.trim() || !selectedMessage) return;

    setLoading(true);
    // Simuler l'envoi de la réponse
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === selectedMessage.id ? { ...msg, replied: true } : msg
      ));
      setSelectedMessage(null);
      setReplyText('');
      setLoading(false);
      alert('Réponse envoyée avec succès !');
    }, 1000);
  };

  const deleteMessage = async (messageId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(null);
      }
    }
  };

  const getUnreadCount = () => messages.filter(msg => !msg.read).length;

  return (
    <div className="message-manager">
      <div className="messages-header">
        <h3>📨 Messages des utilisateurs</h3>
        <div className="message-stats">
          <span className="unread-count">
            {getUnreadCount()} non lu{getUnreadCount() !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="messages-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Tous
        </button>
        <button 
          className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Non lus
        </button>
        <button 
          className={`filter-btn ${filter === 'replied' ? 'active' : ''}`}
          onClick={() => setFilter('replied')}
        >
          Répondus
        </button>
      </div>

      <div className="messages-layout">
        {/* Liste des messages */}
        <div className="messages-list">
          {loading ? (
            <div className="loading">Chargement des messages...</div>
          ) : filteredMessages.length === 0 ? (
            <div className="no-messages">Aucun message trouvé</div>
          ) : (
            filteredMessages.map(message => (
              <div 
                key={message.id}
                className={`message-item ${!message.read ? 'unread' : ''} ${
                  selectedMessage?.id === message.id ? 'selected' : ''
                }`}
                onClick={() => handleSelectMessage(message)}
              >
                <div className="message-preview">
                  <div className="message-header">
                    <span className="message-sender">{message.name}</span>
                    <span className="message-date">{message.date}</span>
                  </div>
                  <div className="message-subject">{message.subject}</div>
                  <div className="message-excerpt">
                    {message.message.substring(0, 60)}...
                  </div>
                  <div className="message-status">
                    {!message.read && <span className="status-badge new">Nouveau</span>}
                    {message.replied && <span className="status-badge replied">Répondu</span>}
                  </div>
                </div>
                <button 
                  className="delete-message-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMessage(message.id);
                  }}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Détail du message et réponse */}
        <div className="message-detail">
          {selectedMessage ? (
            <div className="message-view">
              <div className="message-header-detail">
                <h4>{selectedMessage.subject}</h4>
                <button 
                  className="close-detail"
                  onClick={() => setSelectedMessage(null)}
                >
                  ✕
                </button>
              </div>
              
              <div className="message-info">
                <p><strong>De :</strong> {selectedMessage.name}</p>
                <p><strong>Email :</strong> {selectedMessage.email}</p>
                <p><strong>Date :</strong> {selectedMessage.date}</p>
              </div>

              <div className="message-content">
                <p>{selectedMessage.message}</p>
              </div>

              {!selectedMessage.replied ? (
                <div className="reply-section">
                  <h5>Répondre à {selectedMessage.name}</h5>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Tapez votre réponse ici..."
                    rows="6"
                    className="reply-textarea"
                  />
                  <button 
                    onClick={handleReply}
                    disabled={!replyText.trim() || loading}
                    className="send-reply-btn"
                  >
                    {loading ? 'Envoi...' : '📤 Envoyer la réponse'}
                  </button>
                </div>
              ) : (
                <div className="already-replied">
                  <span className="replied-badge">✓ Déjà répondu</span>
                </div>
              )}
            </div>
          ) : (
            <div className="no-selection">
              <p>Sélectionnez un message pour lire et répondre</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageManager;