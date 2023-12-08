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
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  isRegister: () => void;
  loading: boolean;
  createRegister: boolean;
  error: string;
  setError: (error: string) => void;
};

export const AuthContext = createContext<(AuthData & AuthHandlers) | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [auth, setAuth] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [createRegister, setCreateRegister] = useState(false);
  const [error, setError] = useState('');

  const login = (email: string, password: string) => {
    setLoading(true);
    fetch(`${API_ENDPOINT}/auth`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(({ access_token }) => {
        const user = jwtDecode<JWTPayload>(access_token);
        localStorage.setItem('token', access_token);
        setAuth({ token: access_token, user });
        setError('');
      })
      .catch((error) => {
        setError('Invalid credentials');
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const register = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    setLoading(true);
    fetch(`${API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        setError('Register Failed');
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        setCreateRegister(false);
      });
  };

  const isRegister = () => {
    setCreateRegister(true);
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
    <AuthContext.Provider
      value={{
        register,
        login,
        isRegister,
        logout,
        loading,
        error,
        setError,
        createRegister,
        ...auth,
      }}
    >
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
