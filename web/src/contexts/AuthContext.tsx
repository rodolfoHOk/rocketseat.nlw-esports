import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { api } from '../services/api';
import { WarningOctagon, X } from 'phosphor-react';

interface User {
  id: string;
  username: string;
  email: string;
  discord: string;
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

  const [openToast, setOpenToast] = useState(false);
  const [toastInfos, setToastInfos] = useState({
    title: 'Erro',
    description: 'Erro ao tentar autenticar',
  });

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
        console.error(err);
        navigate('/login');
        setToastInfos({ title: 'Erro', description: 'Erro ao efetuar login' });
        setOpenToast(true);
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
    } else if (currentUrl.includes('login/callback?error=')) {
      const error = new URLSearchParams(window.location.search).get('error');
      setToastInfos({
        title: 'Erro ao efetuar login',
        description:
          error === 'access_denied'
            ? 'Autorização foi negada'
            : (error as string),
      });
      setOpenToast(true);
      navigate('/login');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUrl, isLoggingIn, logout }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}

        <ToastPrimitive.Root
          open={openToast}
          onOpenChange={setOpenToast}
          duration={4000}
          className="relative bg-[#2A2634] rounded shadow-md shadow-black/40 p-4 flex gap-4 items-center border-b-4 border-red-600 animate-toastInRight"
        >
          <WarningOctagon size={32} weight="fill" className="text-red-600" />
          <div className="flex flex-col gap-1">
            <ToastPrimitive.Title className="font-semibold text-base text-white">
              {toastInfos.title}
            </ToastPrimitive.Title>
            <ToastPrimitive.Description className="font-normal text-base text-white">
              {toastInfos.description}
            </ToastPrimitive.Description>
          </div>

          <ToastPrimitive.Close
            className="absolute top-0 right-0 p-2"
            aria-label="Fechar"
          >
            <X size={24} />
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>

        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-3 w-[380px] list-none z-20 outline-none" />
      </ToastPrimitive.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
