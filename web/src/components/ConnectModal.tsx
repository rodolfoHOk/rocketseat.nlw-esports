import * as Dialog from '@radix-ui/react-dialog';
import { CheckCircle, Copy, X } from 'phosphor-react';
import { useEffect, useState } from 'react';

interface ConnectModalProps {
  loading: boolean;
  discord: string;
}

export function ConnectModal(props: ConnectModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [props.discord]);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2A2634] text-white rounded-lg w-[calc(100%-48px)] sm:w-80 shadow-lg shadow-black/25">
        <div className="flex flex-col items-center justify-center relative">
          <Dialog.Close className="absolute top-2 right-2 h-10 w-10 flex items-center justify-center">
            <X size={20} />
          </Dialog.Close>

          <CheckCircle
            size={64}
            weight="bold"
            className="text-emerald-400 mt-8"
          />

          <Dialog.Title className="text-2xl sm:text-3xl font-black mt-6">
            Let's play
          </Dialog.Title>

          <span className="text-zinc-400 mt-4">
            Agora é só começar a jogar!
          </span>

          <p className="mt-6 mb-2 font-semibold">Adicione no Discord</p>

          <button
            title="copiar"
            onClick={() => {
              navigator.clipboard.writeText(props.discord);
              setCopied(true);
            }}
            className="w-60 h-12 relative flex justify-center items-center rounded mb-8 bg-zinc-900 hover:bg-violet-600 text-zinc-200 transition-colors duration-200"
          >
            <span>{props.loading ? 'Aguarde...' : props.discord}</span>
            <Copy
              size={20}
              className={`absolute top-1 right-1
            ${copied ? 'text-emerald-400' : 'text-zinc-400'}`}
            />
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
