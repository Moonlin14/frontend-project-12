import { useState, useEffect, useMemo } from 'react';
import AuthContext from './AuthContext';
/* eslint-disable */
const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [tokenState, setTokenState] = useState(localStorage.getItem('token'));
  const logIn = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setLoggedIn(true);
    setTokenState(token);
  };
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedIn(false);
    setTokenState('');
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);
  const authValue = useMemo(
    () => ({
      loggedIn,
      tokenState,
      logIn,
      logOut,
    }),
    [loggedIn],
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
