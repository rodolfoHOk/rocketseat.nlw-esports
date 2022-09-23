import { DiscordLogo, Spinner } from 'phosphor-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginButtonProps {
  label: string;
}

export function LoginButton({ label }: LoginButtonProps) {
  const { isLoggingIn, loginUrl } = useAuth();

  return (
    <a
      href={loginUrl}
      className={`py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3 transition-colors duration-200
            ${
              isLoggingIn
                ? 'cursor-not-allowed pointer-events-none hover:bg-violet-500'
                : 'cursor-pointer'
            }`}
    >
      {isLoggingIn ? (
        <Spinner size={24} className="animate-spin" />
      ) : (
        <DiscordLogo size={24} />
      )}
      {label}
    </a>
  );
}
