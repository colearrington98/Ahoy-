import React from 'react';
import { io } from 'socket.io-client';

// Create a new context for the socket
const SocketContext = React.createContext();

// Create a custom hook to use the socket context
export function useSocket() {
    return React.useContext(SocketContext);
}

// Create a new provider for the socket
export function SocketProvider({ id, children }) {
    const [socket, setSocket] = React.useState();
// Create a new socket connection when the id changes
    React.useEffect(() => {
        const newSocket = io('http://localhost:3000', { query: { id } });
        setSocket(newSocket);
//  Close the socket connection when the id changes
        return () => newSocket.close();
    }, [id]);
// Provide the socket context to the rest of the application
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}