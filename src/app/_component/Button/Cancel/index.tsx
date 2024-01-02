import { MouseEvent } from 'react';

interface CancelProps {
  size: 'large' | 'small' | 'free';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
export default function Cancel({ size, onClick }: CancelProps) {
  const sizes = {
    large: {
      width: 'w-[8.625rem] md:w-[7.5rem]',
      height: 'h-[2.625rem] md:h-[3rem]',
      paddingY: 'py-3 md:py-[0.875rem]',
    },
    small: { width: 'w-[8.625rem]', height: 'h-[2.625rem]', paddingY: 'py-[0.75rem]' },
    free: { width: 'w-full', height: 'h-full', paddingY: 'py-[0.75rem]' },
  };
  const { width, height, paddingY } = sizes[size];
  return (
    <button
      className={`flex items-center justify-center rounded-[0.5rem] border border-gray30 bg-white ${paddingY} ${height} ${width} text-[0.8125rem] text-gray50 md:text-[1rem]`}
      onClick={onClick}
      type='button'
    >
      취소
    </button>
  );
}
