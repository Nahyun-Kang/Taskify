'use client';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter, usePathname } from 'next/navigation';

import Cancel from '@/src/app/_component/Button/Cancel';
import Confirm from '@/src/app/_component/Button/Confirm';
import { modalNameState } from '@/src/app/_recoil/ModalNameAtom';

interface ModalLayoutrProps {
  children: ReactNode;
  btnName: string;
  onClose: () => void;
  btnSize: 'small' | 'large';
  sign: boolean;
}

// 모달 레이아웃 + cancelBtn은 커스텀 훅의 modalType을 null로 만들어서 렌더링안되도록 + confirmBtn은 api연동할 때 자유롭게 만들 수 있도록 하기 위해 남겨두었습니다
export default function ModalLayout({ children, btnName, btnSize, onClose, sign }: ModalLayoutrProps) {
  const router = useRouter();
  const pathName = usePathname();
  const currentModalName = useRecoilValue(modalNameState);

  const handleSignConfirm = () => {
    if (pathName === '/signup' && currentModalName === '가입이 완료되었습니다!') {
      router.push('/login');
      onClose();
    }
    onClose();
  };

  const handleConfirm = () => {};
  const SignBtnSize = sign ? 'sm:justify-center' : 'sm:justify-between';
  return (
    <div className='fixed left-0 top-0 z-[1000] flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-70'>
      <div className='relative gap-[1.5rem] rounded-[0.5rem] border border-white bg-white sm:w-[20.4375rem] sm:px-[1.25rem] sm:pb-[1.25rem] sm:pt-[1.75rem] md:w-[33.75rem] md:px-[1.75rem] md:pt-[2rem]'>
        <div className=' flex flex-col gap-[2rem]'>
          {children}
          <div className={`flex gap-[0.75rem]  md:justify-end ${SignBtnSize}`}>
            {sign ? null : <Cancel size={btnSize} onClick={onClose} />}
            {sign ? (
              <Confirm btnName={btnName} size={btnSize} onClick={handleSignConfirm} />
            ) : (
              <Confirm btnName={btnName} size={btnSize} onClick={handleConfirm} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
