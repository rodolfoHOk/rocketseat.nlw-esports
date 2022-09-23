import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
}

interface AuthContextData {
  user: User | null;
  loginUrl: string;
  isLoggingIn: boolean;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthResponse {
  token: string;
  user: User;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const loginUrl =
    'https://discord.com/api/oauth2/authorize?client_id=1022654586537906178&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Flogin%2Fcallback&response_type=code&scope=identify%20email';

  async function login(code: string) {
    setIsLoggingIn(true);

    api
      .post<AuthResponse>('/oauth/login', {
        code,
      })
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem('@duo:token', token);
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        setUser(user);
        navigate('/');
      })
      .catch((err) => {
        alert('Erro ao efetuar login');
        console.error(err);
        navigate('/login');
      })
      .finally(() => setIsLoggingIn(false));
  }

  function logout() {
    localStorage.removeItem('@duo:token');
    api.defaults.headers.common.authorization = '';
    setUser(null);
  }

  function getUserInfos() {
    api
      .get<User>('/oauth/user')
      .then((response) => setUser(response.data))
      .catch(() => logout());
  }

  useEffect(() => {
    const token = localStorage.getItem('@duo:token');
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      getUserInfos();
    }
  }, []);

  useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl.includes('login/callback?code=')) {
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        login(code);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUrl, isLoggingIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
