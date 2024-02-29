// components/Chat.js
import React, { useState, useEffect } from 'react';
import Message from './Message';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); 

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() !== '') {
      socket.emit('chat message', { user: 'You', text: input });
      setInput('');
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;


