import { jwtDecode } from 'jwt-decode';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { API_ENDPOINT } from '../config';

type AuthData = {
  token?: string;
  user?: JWTPayload;
};

export interface JWTPayload {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  exp: number;
  iat: number;
}

type AuthHandlers = {
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<(AuthData & AuthHandlers) | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [auth, setAuth] = useState<AuthData | null>(null);
  console.log({ auth });
  const login = (email: string, password: string) => {
    fetch(`${API_ENDPOINT}/auth`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(({ access_token }) => {
        console.log({ access_token });
        const user = jwtDecode<JWTPayload>(access_token);
        localStorage.setItem('token', access_token);
        setAuth({ token: access_token, user });
      })
      .catch((error) => console.log(error));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const user = jwtDecode<JWTPayload>(token);
      setAuth({ token, user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, ...auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return auth;
};
