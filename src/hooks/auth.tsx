import React, { createContext, useCallback, useState, useContext } from 'react';

import { useLocalStorage } from './custom/useLocalStorage';
import api from '../services/api';

// Types
export interface User {
  id: string;
  name: string;
  avatar_url: string;
  email: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name?: string;
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

interface AuthState {
  token: string;
  user: User;
}

// Context
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider
export const AuthProvider: React.FC = ({ children }) => {
  const [storedToken, setStoredToken] = useLocalStorage<string>(
    '@gobarber:token',
    '',
  );
  const [storedUser, setStoredUser] = useLocalStorage<User>(
    '@gobarber:user',
    {} as User,
  );

  const [data, setData] = useState<AuthState>(() => {
    api.defaults.headers.Authorization = `Bearer ${storedToken}`;
    if(storedToken && storedUser) {
      return { token: storedToken, user: storedUser };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await api.post<AuthState>('api/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      setStoredToken(token);
      setStoredUser(user);

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setData({ token, user });
    },
    [setStoredToken, setStoredUser],
  );

  const signOut = useCallback(() => {
    setStoredToken('');
    setStoredUser({} as User);

    setData({} as AuthState);
  }, [setStoredToken, setStoredUser]);

  const updateUser = useCallback(
    (user: User) => {
      setStoredUser(user);

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token, setStoredUser],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  return context;
};
