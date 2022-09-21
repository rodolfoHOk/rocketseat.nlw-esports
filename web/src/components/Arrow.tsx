export function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  return (
    <svg
      onClick={props.onClick}
      className={`w-8 h-8 absolute top-1/2 -translate-y-[calc(50%-32px)] fill-violet-100 hover:fill-violet-900 cursor-pointer transition-colors duration-200 ${
        props.left ? 'left-1' : 'right-1'
      } ${props.disabled ? 'hidden' : 'block'}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
