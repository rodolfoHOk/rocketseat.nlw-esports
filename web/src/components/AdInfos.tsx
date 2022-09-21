import { GameController } from 'phosphor-react';

interface Ad {
  id: string;
  name: string;
  yearsPlaying: number;
  weekDays: number[];
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
}

interface AdInfosProps {
  ad: Ad;
  onConnect: () => void;
}

export function AdInfos({ ad, onConnect }: AdInfosProps) {
  return (
    <div className="w-50 bg-[#2A2634] rounded-lg p-5 mr-4 flex flex-col items-center">
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
        <span className="text-white text-sm font-bold">
          {`${ad.weekDays.length} dias \u2022 ${ad.hourStart} - ${ad.hourEnd}`}
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

      <button
        onClick={onConnect}
        className="w-full h-9 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-md bg-violet-500 hover:bg-violet-600 transition-colors duration-200"
      >
        <GameController size={20} />
        <span>Conectar</span>
      </button>
    </div>
  );
}
