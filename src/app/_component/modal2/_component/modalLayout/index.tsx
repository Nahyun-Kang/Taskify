'use client';
import { ReactNode } from 'react';
import Cancel from '@/src/app/_component/Button/Cancel';
import Confirm from '@/src/app/_component/Button/Confirm';

interface ModalLayoutrProps {
  children: ReactNode;
  btnName: string;
  btnSize: 'small' | 'large';
  sign: boolean;
  size?: string | undefined;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// 모달 레이아웃 + cancelBtn은 커스텀 훅의 modalType을 null로 만들어서 렌더링안되도록 + confirmBtn은 api연동할 때 자유롭게 만들 수 있도록 하기 위해 남겨두었습니다
export default function ModalLayout({ children, btnName, btnSize, onClose, sign, size = 'small' }: ModalLayoutrProps) {
  const Size: { [key: string]: string } = {
    small: 'md:w-[33.75rem]',
    large: 'md:w-[31.625rem]',
  };

  const SignBtnSize = sign ? 'sm:justify-center' : 'sm:justify-between';
  return (
    <div
      className={`hide-scrollbar relative max-h-[95%] gap-[1.5rem] overflow-scroll rounded-[0.5rem] bg-white sm:px-[1.25rem] sm:pb-[1.25rem] sm:pt-[1.75rem] md:px-[1.75rem] md:pt-[2rem] ${Size[size]}`}
    >
      <div className=' flex flex-col gap-[2rem]'>
        {children}
        <div className={`flex gap-[0.75rem] md:justify-end ${SignBtnSize}`}>
          {sign ? null : <Cancel size={btnSize} onClick={onClose} />}
          {sign ? (
            <Confirm btnName={btnName} size={btnSize} onClick={onClose} />
          ) : (
            <Confirm btnName={btnName} size={btnSize} />
          )}
        </div>
      </div>
    </div>
  );
}
