import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getUsersByEmail, registerUser } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (formData) => {
    setError('');
    try {
      const existingUsers = await getUsersByEmail(formData.email);
      if (existingUsers.length > 0) {
        throw new Error('A user with this email already exists.');
      }

      const createdUser = await registerUser({
        ...formData,
        role: 'customer',
      });

      setUser(createdUser);
      localStorage.setItem('authUser', JSON.stringify(createdUser));
      return createdUser;
    } catch (err) {
      const message = err.message || 'Registration failed.';
      setError(message);
      throw new Error(message);
    }
  };

  const login = async (email, password) => {
    setError('');
    try {
      const users = await getUsersByEmail(email);
      const matchedUser = users.find((item) => item.password === password);

      if (!matchedUser) {
        throw new Error('Invalid email or password.');
      }

      setUser(matchedUser);
      localStorage.setItem('authUser', JSON.stringify(matchedUser));
      return matchedUser;
    } catch (err) {
      const message = err.message || 'Login failed.';
      setError(message);
      throw new Error(message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    setError('');
  };

  const value = useMemo(() => ({ user, loading, error, register, login, logout }), [user, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
