import Image from 'next/image';
import Link from 'next/link';
import logoLarge from '@/public/logo/nav_logo_large.svg';
import logoSmall from '@/public/logo/nav_lgoo_small.svg';

export default function Home() {
  return (
    <main>
      <header className='m-auto flex h-[3.75rem] max-w-[120rem] items-center justify-between px-6 sm:pr-0'>
        <Link href='/'>
          <Image className='sm:hidden' src={logoSmall} alt='logo' />
          <Image className='hidden h-[2.4375rem] w-[7.5625rem] sm:block' src={logoLarge} alt='로고' />
        </Link>
        <div className='flex gap-5 text-[0.875rem] sm:pr-10 sm:text-base md:gap-9 md:pr-20'>
          <Link href='/login'>로그인</Link>
          <Link href='/signup'>회원가입</Link>
        </div>
      </header>
    </main>
  );
}
