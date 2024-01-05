import { MouseEventHandler, ReactNode } from 'react';
import Image from 'next/image';

interface Prop {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  imageSrc: string;
}

export default function HeaderButton({ children, onClick, imageSrc }: Prop) {
  return (
    <button
      onClick={onClick}
      className='border-color-gray30 flex gap-2 rounded-lg border-[.0625rem] px-3 pb-2 pt-[.4375rem] text-[.875rem] font-medium text-gray50 dark:text-white8'
    >
      <Image src={imageSrc} alt={`${children} 버튼`} className='hidden md:block' />
      {children}
    </button>
  );
}
