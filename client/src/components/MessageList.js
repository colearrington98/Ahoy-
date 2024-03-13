import React from 'react';

const MessageList = ({ messages }) => {
    return (
        <div className = "message-list">
            {messages.map((message, index) => (
                <div key={index}>
                    {message.text}
                </div>
            ))}
        </div>
    );
}

export default MessageList;