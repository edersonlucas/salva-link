import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { RegisterMessage, LoginMessage } from '../enums/returnMessages.enum';
import api from '../services/api';
import loginDTO from '../dto/loginDTO';
import registerDTO from '../dto/registerDTO';

import IProviderProps from '../interfaces/IProviderProps';

interface IAuthentication {
  isAuthenticated: boolean;
  login: (loginData: loginDTO) => Promise<void>;
  register: (registerData: registerDTO) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext({} as IAuthentication);

export function AuthProvider({ children }: IProviderProps) {
  const { push } = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { 'salvalink.token': token } = parseCookies();
    setIsAuthenticated(!!token);
  }, []);

  const oneDay = 60 * 60 * 24;

  const login = useCallback(
    async ({ email, password }: loginDTO) => {
      await api
        .post('/login', { email, password })
        .then((response) => {
          setCookie(undefined, 'salvalink.token', response.data.token, {
            maxAge: oneDay,
          });
          const {
            data: { token },
            status,
          } = response;
          setIsAuthenticated(!!token);
          toast.success(LoginMessage[status]);
          push('/');
        })
        .catch((err) => {
          const status: number = err?.response?.status;
          if (status) return toast.error(LoginMessage[status]);
          toast.error('Erro interno no servidor.');
        });
    },
    [oneDay, push],
  );

  const register = useCallback(
    async ({ username, email, password }: registerDTO) => {
      await api
        .post('/register', { username, email, password })
        .then((response) => {
          setCookie(undefined, 'salvalink.token', response.data.token, {
            maxAge: oneDay,
          });
          const {
            data: { token },
            status,
          } = response;
          setIsAuthenticated(!!token);
          toast.success(RegisterMessage[status]);
          push('/');
        })
        .catch((err) => {
          const status: number = err?.response?.status;
          if (RegisterMessage[status]) {
            return toast.error(RegisterMessage[status]);
          }
          toast.error('Erro interno no servidor.');
        });
    },
    [oneDay, push],
  );

  const logout = useCallback(() => {
    destroyCookie(undefined, 'salvalink.token');
    setIsAuthenticated(false);
    push('/login');
  }, [push]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      register,
      logout,
    }),
    [isAuthenticated, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
