import React, { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

// Provider is the component that will wrap around any other component that needs access inside
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // value will hold contextual values
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
      if (user) createUserDocumentFromAuth(user);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}