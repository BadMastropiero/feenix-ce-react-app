import { jwtDecode } from 'jwt-decode';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { API_ENDPOINT, TOKEN_REFRESH_INTERVAL } from '../config';

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
      .then(({ access_token, refresh_token }) => {
        const user = jwtDecode<JWTPayload>(access_token);
        localStorage.setItem('token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        setAuth({ token: access_token, user });
        setError('');
      })
      .catch((error) => {
        setError('Invalid credentials');
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        setError('');
      });
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
    localStorage.removeItem('refresh_token');
    setAuth(null);
  };

  const refresh = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return;
    setLoading(true);
    try {
      const req = await fetch(`${API_ENDPOINT}/auth/refresh`, {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshToken }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { access_token } = await req.json();
      const user = jwtDecode<JWTPayload>(access_token);
      localStorage.setItem('token', access_token);
      setAuth({ token: access_token, user });
      setError('');
    } catch {
      setError('Invalid credentials');
      localStorage.removeItem('refresh_token');
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const user = jwtDecode<JWTPayload>(token);
      setAuth({ token, user });
    }
  }, []);

  useEffect(() => {
    // Handle token rotation
    refresh();

    const i = setInterval(() => {
      console.log('Refreshing token');
      refresh();
    }, TOKEN_REFRESH_INTERVAL * 1000);

    return () => clearInterval(i);
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
