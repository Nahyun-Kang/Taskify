'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import logoText from '@/public/logo/logo_text_only.svg';
import logoImg from '@/public/logo/nav_logo_small.svg';
import NotFoundImage from '@/public/images/notfound_image.png';
import unAuthorizationImage from '@/public/images/unauthorization_image.png';

export default function NotFoundLayout({
  errorType,
  errorDescription,
  btnName,
}: {
  errorType: string;
  errorDescription: string;
  btnName: string;
}) {
  const router = useRouter();
  const handleButtonClick = () => {
    if (errorType.slice(0, 3) === '401') {
      router.push('/login');
    } else {
      router.back();
    }
  };

  const imageUrl = (errorType: string) => {
    if (errorType.slice(0, 3) === '401') {
      return unAuthorizationImage;
    } else {
      return NotFoundImage;
    }
  };

  return (
    <div className='relative flex h-screen w-screen flex-col justify-center bg-gray10'>
      <Link href='/'>
        <div className='fixed left-4 top-4 flex '>
          <Image src={logoImg} alt='' />
          <Image src={logoText} alt='' />
        </div>
      </Link>
      <div className='flex flex-col items-center justify-center'>
        <div className='h-[13.25rem] w-[13.25rem] md:h-[22.625rem] md:w-[22.625rem]'>
          <Image src={imageUrl(errorType)} alt='배경이미지'></Image>
        </div>
        <div className='mt-[1.5rem] flex flex-col items-center gap-2 leading-none'>
          <div className='text-[.625rem] text-gray30 md:text-[1rem]'>Whoopoooops!</div>
          <div className='text-[1.5rem] leading-none text-gray50 md:text-[3rem]'>{errorType}</div>
          <div className='text-[1rem] leading-none text-gray40 md:text-[1.5rem]'>{errorDescription}</div>
        </div>
        <button
          onClick={handleButtonClick}
          className='mt-[1.5rem] flex items-center rounded bg-violet px-[1.875rem] py-[.625rem] text-[.75rem] text-white md:mt-[2.5rem] md:px-[3.4375rem] md:py-[.625rem] md:text-[.875rem]'
        >
          {btnName}
        </button>
      </div>
    </div>
  );
}
