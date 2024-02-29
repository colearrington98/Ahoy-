import React, { useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

// Create a new context for the conversations
const ConversationsContext = React.createContext();

// Create a custom hook to use the conversations context
export function useConversations() {
    return useContext(ConversationsContext);
    }
// Create a new provider for the conversations
export function ConversationsProvider({ id, children }) {
    const [conversations, setConversations] = useLocalStorage('conversations', []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const { contacts } = useContacts();
    const socket = useSocket();
// Create a new conversation
    function createConversation(recipients) {
        setConversations((prevConversations) => {
            return [...prevConversations, { recipients, messages: [] }];
        });
    }
// Add a new message to the conversation
    const addMessageToConversation = ({ recipients, text, sender }) => {
        setConversations((prevConversations) => {
            let madeChange = false;
            const newMessage = { sender, text };
            const newConversations = prevConversations.map((conversation) => {
                if (arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true;
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage],
                    };
                }
                return conversation;
            });
// If the conversation already exists, update the messages
            if (madeChange) {
                return newConversations;
            } else {
                return [...prevConversations, { recipients, messages: [newMessage] }];
            }
        });
    };
// Listen for new messages
    useEffect(() => {
        if (socket == null) return;
        socket.on('receive-message', addMessageToConversation);
        return () => socket.off('receive-message');
    }, [socket, addMessageToConversation]);
// Select a conversation
    function sendMessage(recipients, text) {
        socket.emit('send-message', { recipients, text });
// Add the message to the conversation
        addMessageToConversation({ recipients, text, sender: id });
    }
// Format the conversations
    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map((recipient) => {
            const contact = contacts.find((contact) => {
                return contact.id === recipient;
            });
            const name = (contact && contact.name) || recipient;
            return { id: recipient, name };
        });

        const messages = conversation.messages.map((message) => {
            const contact = contacts.find((contact) => {
                return contact.id === message.sender;
            });
            const name = (contact && contact.name) || message.sender;
            const fromMe = id === message.sender;
            return { ...message, senderName: name, fromMe };
        });

        const selected = index === selectedConversationIndex;
        return { ...conversation, messages, recipients, selected };
    });
// Provide the conversations to the rest of the application
    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        createConversation,
        sendMessage,
    };
// Provide the conversations context to the rest of the application
    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    );
}
// Compare this snippet from server/server.js:
function arrayEquality(a, b) {
    if (a.length !== b.length) return false;

    a.sort();
    b.sort();

    return a.every((element, index) => {
        return element === b[index];
    });
}
