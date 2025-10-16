import React, { useState, useEffect } from 'react';
import { messagesAPI } from './apiService';
import './MessageManager.css';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await messagesAPI.getAll();
      if (response.success) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'unread') return !message.read;
    if (filter === 'replied') return message.replied;
    return true;
  });

  const handleSelectMessage = async (message) => {
    setSelectedMessage(message);
    setReplyText('');
    if (!message.read) {
      try {
        await messagesAPI.markAsRead(message.id);
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, read: true } : msg
        ));
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  const handleReply = async () => {
    if (!replyText.trim() || !selectedMessage) return;

    if (!window.confirm(`Envoyer cette réponse par email à ${selectedMessage.email} ?`)) {
      return;
    }

    try {
      setLoading(true);
      const response = await messagesAPI.reply(selectedMessage.id, replyText);
      if (response.success) {
        setMessages(prev => prev.map(msg => 
          msg.id === selectedMessage.id ? { ...msg, replied: true, reply_text: replyText } : msg
        ));
        alert(`✅ Réponse envoyée avec succès par email à ${selectedMessage.email}`);
        setSelectedMessage(null);
        setReplyText('');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'envoi de la réponse. Vérifiez la configuration email.');
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (messageId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      try {
        await messagesAPI.delete(messageId);
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
        if (selectedMessage && selectedMessage.id === messageId) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error('Erreur:', error);
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
                    <span className="message-date">{new Date(message.created_at).toLocaleString()}</span>
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
                <p><strong>Date :</strong> {new Date(selectedMessage.created_at).toLocaleString()}</p>
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