import * as Dialog from '@radix-ui/react-dialog';
import { MagnifyingGlassPlus } from 'phosphor-react';
import { useAuth } from '../contexts/AuthContext';
import { LoginButton } from './LoginButton';

export function CreateAdBanner() {
  const { user } = useAuth();

  return (
    <div className="pt-1 mt-8 bg-nlw-gradient self-stretch md:rounded-lg overflow-hidden md:mx-6">
      <div className="bg-[#2A2634] px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <strong className="text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>

          <span className="text-zinc-300 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        {user ? (
          <Dialog.Trigger className="py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3 transition-colors duration-200">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </Dialog.Trigger>
        ) : (
          <LoginButton label="Necessário Logar" />
        )}
      </div>
    </div>
  );
}
