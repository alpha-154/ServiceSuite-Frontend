import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";

// Create the context
const UserContext = createContext();

// Custom hook to access UserContext
export const useUser = () => useContext(UserContext);

// Context provider component
export const UserProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      // Extract relevant user details from Firebase Auth
      const { uid, displayName, email, photoURL } = user;
      console.log("User from Firebase:", user);
      setCurrentUser({
        displayName,
        email,
        photoURL,
        uid,
      });
    } else {
      setCurrentUser(null);
    }
  }, [user, loading]);

  return (
    <UserContext.Provider value={{ user: currentUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
