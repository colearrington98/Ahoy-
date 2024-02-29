import React from 'react';
// The Contact context is used to provide the contacts state and the createContact function to the rest of the application.
const Contact = React.createContext();
// The useContacts hook is used to access the contacts state and the createContact function from any component in the application.
export function useContacts() {
  return React.useContext(Contact);
}

// The ContactsProvider component is a wrapper for the entire application. It provides the contacts state and the createContact function to the rest of the application.
export function ContactsProvider({ children }) {
  const [contacts, setContacts] = React.useState([]);
  // The createContact function is used to add a new contact to the contacts state.
  function createContact(id, name) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  }
// The Contact.Provider component is used to provide the contacts state and the createContact function to the rest of the application.
  return (
    <Contact.Provider value={{ contacts, createContact }}>
      {children}
    </Contact.Provider>
  );
}
