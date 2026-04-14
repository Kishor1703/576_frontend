import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const clearStoredAuth = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUsername');
};

const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const [, payload] = token.split('.');
    if (!payload) return false;

    const decoded = JSON.parse(atob(payload));
    if (!decoded.exp) return true;

    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (isTokenValid(storedToken)) return storedToken;

    clearStoredAuth();
    return null;
  });

  useEffect(() => {
    if (token) {
      setAdmin({ username: localStorage.getItem('adminUsername') });
      return;
    }

    setAdmin(null);
  }, [token]);

  const login = (tokenVal, username) => {
    localStorage.setItem('adminToken', tokenVal);
    localStorage.setItem('adminUsername', username);
    setToken(tokenVal);
    setAdmin({ username });
  };

  const logout = () => {
    clearStoredAuth();
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
