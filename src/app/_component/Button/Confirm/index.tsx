import { MouseEvent } from 'react';
import { useFormContext } from 'react-hook-form';
interface ConfirmProps {
  size: 'large' | 'small' | 'free';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  btnName: string;
}
export default function Confirm({ size, onClick, btnName }: ConfirmProps) {
  const {
    formState: { isValid },
  } = useFormContext();
  const sizes = {
    large: 'w-[7.5rem] h-[3rem] py-[0.875rem] px-[2.875rem]',
    small: 'w-[8.625rem] h-[2.625rem] py-[0.75rem] px-[3.5rem] text-[0.875rem]',
    free: 'w-full h-full me:text-[0.875rem] text-[0.75rem]',
  };
  return (
    <>
      <button
        className={`flex items-center justify-center rounded-[0.5rem]  bg-violet ${sizes[size]} text-white disabled:bg-gray40`}
        onClick={onClick}
        disabled={!isValid}
      >
        {btnName}
      </button>
    </>
  );
}
