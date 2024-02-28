import React, { useState, useEffect } from 'react';
import Message from './Message';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        setMessages([...messages, { text: input }]);
        setInput('');
    }

    return (
        <div>
            <div>
                {messages.map((message, i) => <Message key={i} message={message} />)}
            </div>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;

