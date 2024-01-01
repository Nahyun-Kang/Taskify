import { MouseEvent } from 'react';
import { useFormContext } from 'react-hook-form';
interface ConfirmProps {
  size: 'large' | 'small' | 'free';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  btnName: string;
}
export default function Confirm({ size, onClick, btnName }: ConfirmProps) {
  const {
    getValues,
    formState: { isValid },
  } = useFormContext();
  const sizes = {
    large: { width: 'w-[7.5rem]', height: 'md:h-[3rem] h-[2.625rem]', paddingY: 'md:py-[0.875rem] py-3' },
    small: { width: 'w-[8.625rem]', height: 'h-[2.625rem]', paddingY: 'py-[0.75rem]' },
    free: { width: 'w-full', height: 'h-full', paddingY: 'py-[0.75rem]' },
  };
  const { width, height, paddingY } = sizes[size];
  return (
    <button
      className={`flex items-center justify-center rounded-[0.5rem] bg-violet ${paddingY} ${height} ${width} text-[0.8125rem] text-white disabled:bg-gray40 md:text-[1rem]`}
      onClick={onClick}
      disabled={getValues('isDisabled') || getValues('isDisabled2') || !isValid}
    >
      {btnName}
    </button>
  );
}
