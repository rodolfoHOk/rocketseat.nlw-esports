import * as ToastPrimitive from '@radix-ui/react-toast';
import { CheckCircle, WarningOctagon, X } from 'phosphor-react';
import { RefAttributes } from 'react';

interface ToastProps
  extends ToastPrimitive.ToastProps,
    RefAttributes<HTMLLIElement> {
  variant: 'success' | 'error';
  title: string;
  description: string;
}

export interface ToastInfos {
  variant: 'success' | 'error';
  title: string;
  description: string;
}

export function Toast({ variant, title, description, ...rest }: ToastProps) {
  return (
    <ToastPrimitive.Root
      {...rest}
      duration={4000}
      className={`relative bg-[#2A2634] rounded shadow-md shadow-black/40 p-4 flex gap-4 items-center border-b-4 animate-toastInRight
      ${variant === 'error' ? 'border-red-600' : 'border-green-600'}`}
    >
      {variant === 'error' ? (
        <WarningOctagon size={32} weight="fill" className="text-red-600" />
      ) : (
        <CheckCircle size={32} weight="fill" className="text-green-600" />
      )}
      <div className="flex flex-col gap-1">
        <ToastPrimitive.Title className="font-semibold text-base text-white">
          {title}
        </ToastPrimitive.Title>
        <ToastPrimitive.Description className="font-normal text-base text-white">
          {description}
        </ToastPrimitive.Description>
      </div>

      <ToastPrimitive.Close
        className="absolute top-0 right-0 p-2"
        aria-label="Fechar"
      >
        <X size={24} />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
}

export function ToastViewport() {
  return (
    <ToastPrimitive.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-3 w-[380px] list-none z-20 outline-none" />
  );
}
