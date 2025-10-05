import React, { createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

interface User {
  name: string;
  email: string;
}

interface Credentials {
  email: string;
  password?: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => void;
  signup: (credentials: Credentials) => void;
  logout: () => void;
  deleteAccount: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useLocalStorage<Record<string, User>>('app_users', {});
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('current_user', null);
  const navigate = useNavigate();

  const login = ({ email, password }: Credentials) => {
    // In a real app, you'd check the password hash. Here, we just check if the user exists.
    if (users[email]) {
      setCurrentUser(users[email]);
      navigate('/');
    } else {
      alert('Credenciais inválidas.');
    }
  };

  const signup = ({ name, email, password }: Credentials) => {
    if (users[email]) {
      alert('Este e-mail já está em uso.');
      return;
    }
    if (!name || !email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    const newUser = { name, email };
    setUsers(prev => ({ ...prev, [email]: newUser }));
    alert('Conta criada com sucesso! Por favor, faça o login.');
    navigate('/login');
  };

  const logout = () => {
    setCurrentUser(null);
    navigate('/login');
  };
  
  const deleteAccount = (email: string) => {
    setUsers(prev => {
        const newUsers = { ...prev };
        delete newUsers[email];
        return newUsers;
    });
    logout();
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, login, signup, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};