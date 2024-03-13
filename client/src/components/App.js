import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';

function App() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const sendMessage = (message) => {
    setMessages([...messages, { text: message, user: 'You' }]);
    };


  return (
    <div className="app">
      <div className="chat-container">
        <MessageList messages={messages} />
        <MessageInput sendMessage={sendMessage} />
      </div>
      <UserList users={users} />
    </div>
  );
}

export default App;
