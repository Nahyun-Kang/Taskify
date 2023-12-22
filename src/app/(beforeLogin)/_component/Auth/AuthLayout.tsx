import { ReactNode } from 'react';
import Link from 'next/link';
import ImageLogo from '../Icons/ImageLogo';
import TextLogo from '../Icons/TextLogo';

interface Props {
  children: ReactNode;
  message: {
    welcome: string;
    check: string;
    link: string;
  };
}

export default function AuthLayout({ children, message }: Props) {
  return (
    <div className='flex h-screen w-screen appearance-none items-center justify-center bg-gray10'>
      <div className='flex flex-col items-center md:w-[32.5rem]'>
        <div className='mb-[2.5rem] flex flex-col items-center gap-[.5437rem] md:mb-[3.75rem] md:gap-[.625rem]'>
          <div className=' flex w-[8.75rem] flex-col items-center gap-[1.3125rem]  md:w-[12.5rem]'>
            <ImageLogo className='h-[8.25rem] w-[7.1875rem] self-end md:h-[11.8125rem] md:w-[10.25rem]' />
            <TextLogo width='inherit' />
          </div>
          <div className='text-[1.25rem] font-medium'>{message.welcome}</div>
        </div>
        {children}
        <div className='mt-[1.5rem] flex gap-2 text-base font-normal'>
          <div className='text-black80'>{message.check}</div>
          <Link href='/login' className=' cursor-pointer text-violet underline'>
            {message.link}
          </Link>
        </div>
      </div>
    </div>
  );
}
