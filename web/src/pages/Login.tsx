import { Link } from 'react-router-dom';
import { House } from 'phosphor-react';
import logoImg from '../assets/logo-nlw-esports.svg';
import { LoginButton } from '../components/LoginButton';
import { LoginArea } from '../components/LoginArea';

export function Login() {
  return (
    <div className="relative max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <div className="absolute top-2 sm:top-0 right-6">
        <LoginArea />
      </div>

      <Link
        to="/"
        className="absolute top-0 sm:top-1 left-6 flex flex-col sm:flex-row items-center gap-1 sm:gap-2 bg-black/25 px-2 py-2 border-[1px] border-violet-500 rounded-lg text-violet-500 opacity-70 hover:opacity-100 transition-all duration-200"
      >
        <House size={20} />
        <span className="text-sm sm:text-base">Voltar</span>
      </Link>

      <img src={logoImg} alt="" className="h-32 md:h-auto" />

      <h1 className="text-4xl md:text-6xl text-white font-black mt-20">
        Entrar
      </h1>

      <p className="text-xl md:text-2xl text-white font-bold mt-10 mb-20">
        Encontre seu{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{' '}
        e bora jogar.
      </p>

      <LoginButton label="Entrar com o Discord" />
    </div>
  );
}
