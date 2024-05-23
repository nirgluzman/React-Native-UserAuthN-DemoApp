// React Context for managing the AuthN status

import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    AsyncStorage.setItem('idToken', token); // store the idToken in the storage.
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('idToken'); // remove the idToken from the storage.
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
