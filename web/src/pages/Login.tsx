import { Link } from 'react-router-dom';
import { House } from 'phosphor-react';
import logoImg from '../assets/logo-nlw-esports.svg';
import { LoginButton } from '../components/LoginButton';

export function Login() {
  return (
    <div className="relative max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <Link
        to="/"
        className="absolute top-32 sm:top-2 left-1 sm:left-6 flex items-center gap-2 bg-black/5 hover:bg-black/30 px-4 py-2 rounded-lg text-zinc-400 hover:text-white transition-colors duration-200"
      >
        <House size={20} />
        <span>Voltar</span>
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
