import { createContext, useContext, useState, useEffect } from 'react';
import apiModule from '../api/api';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // novo estado
  const {api, csrfApi} = apiModule;
  const getUser = async () => {
    try {
      const res = await api.get('/user');
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  /*useEffect(() => {
    getUser();
  }, []);*/

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/user');
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false); // pronto para renderizar
      }
    };

    fetchUser();
  }, []);

 const login = async (token) => {
  localStorage.setItem('auth_token', token);
  try {
    const res = await api.get('/user'); // busca os dados completos
    setUser(res.data);
  } catch {
    setUser(null);
  }
};

  const logout = async () => {
    await api.post('/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

