// React Context for managing the AuthN status

import { createContext, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false, // user is logged in or not
  authenticate: token => {}, // update the AuthN status
  logout: () => {} // clear the AuthN status
});

// Provider for the AuthContext
export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);

  function authenticate(token) {
    setAuthToken(token);
  }

  function logout() {
    setAuthToken(null);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
