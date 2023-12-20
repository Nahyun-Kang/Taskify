import { MouseEvent } from 'react';

interface CancelProps {
  size: 'large' | 'small';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
export default function Cancel({ size, onClick }: CancelProps) {
  const sizes = {
    large: { width: 'w-[7.5rem]', height: 'h-[3rem]', paddingY: 'py-[0.875rem]', paddingX: 'px-[2.875rem]' },
    small: { width: 'w-[8.625rem]', height: 'h-[2.625rem]', paddingY: 'py-[0.75rem]', paddingX: 'px-[3.5rem]' },
  };
  const { width, height, paddingY, paddingX } = sizes[size];
  return (
    <button
      className={`flex items-center justify-center rounded-[0.5rem] border border-gray30 bg-white ${paddingX} ${paddingY} ${height} ${width} text-[0.8125rem] text-gray50`}
      onClick={onClick}
    >
      취소
    </button>
  );
}
