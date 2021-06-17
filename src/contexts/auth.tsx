/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

type User = {
  _id: string;
  name: string;
  document: string;
  profile: string;
};

type AuthContextData = {
  isAuthenticated: boolean;
  signIn: (document: string, password: string) => Promise<void>;
  signOut: () => void;
  user: User;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const { 'stock_management.token': token } = parseCookies();
    if (token) {
      api.defaults.headers.authorization = token;

      api.get('/users').then((res) => setUser(res.data));
    }
  }, []);

  async function signOut() {
    destroyCookie(undefined, 'stock_management.token');
    setUser(null);
    router.push('/login');
  }

  async function signIn(document: string, password: string) {
    const response = await api.post('/auth', {
      document,
      password,
    });

    setUser(response.data.user);
    setCookie(undefined, 'stock_management.token', response.data.token, {
      maxAge: 60 * 60 * 24, // 24 hour
    });
    api.defaults.headers.authorization = response.data.token;
    toast({
      title: 'Sucesso',
      description: `Bem Vindo(a) ${response.data.user.name}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
    router.push('/');
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, signIn, user, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
