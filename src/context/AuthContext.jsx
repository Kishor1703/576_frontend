import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  useEffect(() => {
    if (token) {
      setAdmin({ username: localStorage.getItem('adminUsername') });
    }
  }, [token]);

  const login = (tokenVal, username) => {
    localStorage.setItem('adminToken', tokenVal);
    localStorage.setItem('adminUsername', username);
    setToken(tokenVal);
    setAdmin({ username });
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
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
