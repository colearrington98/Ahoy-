import React from 'react';
import Message from './Message';

// The MessageList component is a functional component that takes a prop called messages. 
//The messages prop is an array of message objects. The component returns a div with a class name of message-list. 
//Inside the div, the component maps over the messages array and returns a Message component for each message object in the array. 
//The key prop is set to the index of the message object in the array. The message prop is set to the message object. 
//The Message component is imported at the top of the file. The Message component is a functional component that takes a prop called message. 
//The message prop is an object with a text property. The component returns a div with the text property of the message object. 
//The Message component is imported at the top of the file. The MessageList component is exported as the default export of the file.
const MessageList = ({ messages }) => {
    return (
      <div className="message-list">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
    );
  };
export default MessageList;