'use client';
import Cancel from '@/src/app/_component/Button/Cancel';
import Confirm from '@/src/app/_component/Button/Confirm';
import { modalNameState } from '@/src/app/_recoil/ModalNameAtom';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

interface ModalLayoutrProps {
  children: ReactNode;
  btnName: string;
  btnSize: 'small' | 'large';
  sign: boolean;
  size?: string | undefined;
  onClose: () => void;
}

export default function ModalLayout({ children, btnName, btnSize, onClose, sign, size = 'small' }: ModalLayoutrProps) {
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

  const Size: { [key: string]: string } = {
    small: 'md:w-[33.75rem]',
    large: 'md:w-[31.625rem]',
  };

  const SignBtnSize = sign ? 'sm:justify-center' : 'sm:justify-between';
  return (
    <div
      className={`hide-scrollbar relative max-h-[95%] gap-[1.5rem] overflow-scroll rounded-[0.5rem] bg-white sm:px-[1.25rem] sm:pb-[1.25rem] sm:pt-[1.75rem] md:px-[1.75rem] md:pt-[2rem] ${Size[size]} dark:bg-black90 dark:text-white8`}
    >
      <div className='flex flex-col gap-[2rem]'>
        {children}

        <div className={`flex gap-[0.75rem] md:justify-end ${SignBtnSize}`}>
          {!sign && <Cancel size={btnSize} onClick={onClose} />}
          <Confirm btnName={btnName} size={btnSize} onClick={sign ? handleSignConfirm : undefined} />
        </div>
      </div>
    </div>
  );
}
