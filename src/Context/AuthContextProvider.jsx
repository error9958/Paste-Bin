import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Scripts/firebase";
export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (USER) => {
      setUser(USER);
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
