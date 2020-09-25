import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
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

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const storagedToken = localStorage.getItem('@gobarber:token');
    const storagedUser = localStorage.getItem('@gobarber:user');

    if (storagedToken && storagedUser) {
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      return { token: storagedToken, user: JSON.parse(storagedUser) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<AuthState>('api/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@gobarber:token', token);
    localStorage.setItem('@gobarber:user', JSON.stringify(user));

    api.defaults.headers.Authorization = `Bearer ${token}`;
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@gobarber:token');
    localStorage.removeItem('@gobarber:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@gobarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
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

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  return context;
};
