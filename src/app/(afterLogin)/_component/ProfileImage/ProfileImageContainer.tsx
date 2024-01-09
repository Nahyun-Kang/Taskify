import { ReactElement } from 'react';
import { Colors } from '@/src/app/(afterLogin)/_constant/color';

interface Props {
  children: ReactElement;
  userId: number;
  size?: 'small' | 'large';
}

const Size = {
  small: 'h-[1.625rem] w-[1.625rem] border text-[0.875rem]',
  large: 'h-[2.125rem] w-[2.125rem] md:h-[2.375rem] md:w-[2.375rem] border-2 text-[0.875rem] md:text-[1rem]',
};

export default function ProfileImageContainer({ children, userId, size = 'small' }: Props) {
  return (
    <div
      className={`${Colors[userId % 5]} ${
        Size[size]
      } flex items-center justify-center overflow-hidden rounded-full border-white font-semibold text-white dark:border-gray10`}
    >
      {children}
    </div>
  );
}
