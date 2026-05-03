import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

const DEFAULT_USER = {
  id: 'u1',
  name: 'Alex Chen',
  email: 'alex@eduwrap.io',
  avatar: null,
  xp: 2400,
  level: 12,
  streak: 5,
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('ew_user');
      return stored ? JSON.parse(stored) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  useEffect(() => {
    localStorage.setItem('ew_user', JSON.stringify(user));
  }, [user]);

  const updateUser = (updates) => setUser(prev => ({ ...prev, ...updates }));
  const logout = () => {
    localStorage.removeItem('ew_user');
    setUser(DEFAULT_USER);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
}
