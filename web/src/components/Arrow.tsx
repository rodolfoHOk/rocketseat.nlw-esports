import { CaretLeft, CaretRight } from 'phosphor-react';

export function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  return (
    <div
      className={`absolute top-1/2 -translate-y-[calc(50%-32px)] text-zinc-400 hover:text-violet-500 cursor-pointer transition-colors duration-200 
        ${props.left ? '-left-3' : '-right-3'}`}
    >
      {props.left ? (
        <CaretLeft
          weight="light"
          size={48}
          className={`${props.disabled ? 'hidden' : 'block'}`}
          onClick={props.onClick}
        />
      ) : (
        <CaretRight
          weight="light"
          size={48}
          className={`${props.disabled ? 'hidden' : 'block'}`}
          onClick={props.onClick}
        />
      )}
    </div>
  );
}
