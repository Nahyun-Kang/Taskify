interface ConfirmProps {
  size: 'large' | 'small';
  onClick: () => void;
  btnName: string;
}
export default function Confirm({ size, onClick, btnName }: ConfirmProps) {
  const sizes = {
    large: { width: 'w-[7.5rem]', height: 'h-[3rem]', paddingY: 'py-[0.875rem]', paddingX: 'px-[2.875rem]' },
    small: { width: 'w-[8.625rem]', height: 'h-[2.625rem]', paddingY: 'py-[0.75rem]', paddingX: 'px-[3.5rem]' },
  };
  const { width, height, paddingY, paddingX } = sizes[size];
  return (
    <button
      className={`flex items-center justify-center rounded-[0.5rem]  bg-violet ${paddingX} ${paddingY} ${height} ${width} text-[0.8125rem] text-white`}
      onClick={onClick}
    >
      {btnName}
    </button>
  );
}
