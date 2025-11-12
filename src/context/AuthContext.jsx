import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  const getRedirectPath = () => {
    return sessionStorage.getItem('redirectPath') || '/';
  };

  const setRedirectPath = (path) => {
    sessionStorage.setItem('redirectPath', path);
  };

  const clearRedirectPath = () => {
    sessionStorage.removeItem('redirectPath');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      logout, 
      loading, 
      getRedirectPath, 
      setRedirectPath, 
      clearRedirectPath 
    }}>
      {children}
    </AuthContext.Provider>
  );
};