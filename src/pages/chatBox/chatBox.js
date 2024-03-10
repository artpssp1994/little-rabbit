import React, { useState } from 'react';
import './chatBox.css';

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false); // State for shaking effect

  const handleSubmit = (e) => {
      e.preventDefault();
      if (inputMessage.trim() !== '') {
          const newMessage = { sender: 'You', text: inputMessage, time: getTime() };
          setMessages([...messages, newMessage]);
          setInputMessage('');
          setIsShaking(true); // Start shaking effect
          setTimeout(() => setIsShaking(false), 500); // Stop shaking after 500ms
      }
  };

  const getTime = () => {
      const now = new Date();
      return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
      <div className={'chat-page'}>
        <div className={`chat-container ${isShaking ? 'shake' : ''}`}>
            <div className="chat-header">
                <h3>Chat Box</h3>
            </div>
            <div className="chat-body">
                {messages.map((message, index) => (
                    <div key={index} className="chat-message">
                        <span className="message-sender">{message.sender}: </span>
                        <span className="message-text">{message.text}</span>
                        <span className="message-time">{message.time}</span>
                    </div>
                ))}
            </div>
            <div className="chat-footer">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="input-message"
                        placeholder="Type a message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <button type="submit" className="btn-send">▶</button>
                </form>
            </div>
        </div>
      </div>
  );
}

export default ChatBox;
