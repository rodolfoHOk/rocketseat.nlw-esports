import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';
import { useAuth } from '../contexts/AuthContext';
import { Ad } from '../services/api';
import { LoginButton } from './LoginButton';

interface AdInfosProps {
  ad: Ad;
  onConnect: () => void;
}

export function AdInfos({ ad, onConnect }: AdInfosProps) {
  const { user } = useAuth();

  return (
    <div className="bg-[#2A2634] rounded-lg p-5 flex flex-col items-center">
      <div className="flex flex-col w-full mb-4">
        <span className="mb-1 text-zinc-500 text-sm">Nome</span>
        <span className="text-white text-sm font-bold">{ad.name}</span>
      </div>

      <div className="flex flex-col w-full mb-4">
        <span className="mb-1 text-zinc-500 text-sm">Tempo de jogo</span>
        <span className="text-white text-sm font-bold">{`${ad.yearsPlaying} ano(s)`}</span>
      </div>

      <div className="flex flex-col w-full mb-4">
        <span className="mb-1 text-zinc-500 text-sm">Disponibilidade</span>

        <div className="flex gap-1 text-white text-sm font-bold mb-1">
          <span
            className={`w-6 h-6 rounded flex justify-center items-center
              ${
                ad.weekDays.toString().includes('0')
                  ? 'bg-violet-500'
                  : 'bg-zinc-900'
              }`}
          >
            D
          </span>
          <span
            className={`w-6 h-6 rounded flex justify-center items-center
              ${
                ad.weekDays.toString().includes('1')
                  ? 'bg-violet-500'
                  : 'bg-zinc-900'
              }`}
          >
            S
          </span>
          <span
            className={`w-6 h-6 rounded flex justify-center items-center
              ${
                ad.weekDays.toString().includes('2')
                  ? 'bg-violet-500'
                  : 'bg-zinc-900'
              }`}
          >
            T
          </span>
          <span
            className={`w-6 h-6 rounded flex justify-center items-center
              ${
                ad.weekDays.toString().includes('3')
                  ? 'bg-violet-500'
                  : 'bg-zinc-900'
              }`}
          >
            Q
          </span>
          <span
            className={`w-6 h-6 rounded flex justify-center items-center
              ${
                ad.weekDays.toString().includes('4')
                  ? 'bg-violet-500'
                  : 'bg-zinc-900'
              }`}
          >
            Q
          </span>
          <span
            className={`w-6 h-6 rounded flex justify-center items-center
              ${
                ad.weekDays.toString().includes('5')
                  ? 'bg-violet-500'
                  : 'bg-zinc-900'
              }`}
          >
            S
          </span>
          <span
            className={`w-6 h-6 rounded flex justify-center items-center
              ${
                ad.weekDays.toString().includes('6')
                  ? 'bg-violet-500'
                  : 'bg-zinc-900'
              }`}
          >
            S
          </span>
        </div>

        <span className="text-white text-sm font-bold">
          {`${ad.hourStart} - ${ad.hourEnd}`}
        </span>
      </div>

      <div className="flex flex-col w-full mb-4">
        <span className="mb-1 text-zinc-500 text-sm">Chamada de áudio</span>
        <span
          className={`text-sm font-bold 
          ${ad.useVoiceChannel ? 'text-emerald-400' : 'text-red-400'}`}
        >
          {ad.useVoiceChannel ? 'Sim' : 'Não'}
        </span>
      </div>

      {user ? (
        <Dialog.Trigger
          onClick={onConnect}
          className="w-full h-9 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-md bg-violet-500 hover:bg-violet-600 transition-colors duration-200"
        >
          <GameController size={20} />
          <span>Conectar</span>
        </Dialog.Trigger>
      ) : (
        <LoginButton label="Logar para conectar" />
      )}
    </div>
  );
}
