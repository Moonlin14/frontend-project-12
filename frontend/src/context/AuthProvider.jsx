import React, { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./context";

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedId] = useState(Boolean(userData));
  const [user, setUser] = useState(userData ? { username: userData.username } : null);

  const logIn = useCallback((userData) => {
    setLoggedId(true);
    setUser({ username: userData.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setUser(null);
    setLoggedId(false);
  }, []);

  const getAuthHeader = useCallback(() => {
    const userId = JSON.parse(localStorage.getItem('userId'))
    
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    logOut();
    return {};
  }, [logOut]);

  const providedData = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    getAuthHeader,
    user,
  }),
  [loggedIn, logIn, logOut, getAuthHeader, user]
);

return (
  <AuthContext.Provider value={providedData}>
    {children}
  </AuthContext.Provider>
  );
};

export default AuthProvider;