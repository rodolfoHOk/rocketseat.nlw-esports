import { InputHTMLAttributes } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { Ad } from '../../dto/adDto';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: Path<Ad>;
  register: UseFormRegister<Ad>;
  required: boolean;
}

export function Input({
  register,
  label,
  required,
  type,
  ...rest
}: InputProps) {
  return (
    <input
      type={type}
      {...rest}
      {...register(label, {
        required,
        valueAsNumber: type === 'number' ? true : false,
      })}
      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
    />
  );
}
