import Image from 'next/image';
import Link from 'next/link';
import logoLarge from '@/public/logo/nav_logo_large.svg';
import logoSmall from '@/public/logo/nav_lgoo_small.svg';
import heroImg from '@/public/images/hero.png';
import landingImg1 from '@/public/images/landing1.png';
import landingImg2 from '@/public/images/landing2.png';
import Card from './_component/Card';
import EmailImg from '@/public/icons/email_icon.svg';
import FaceBookImg from '@/public/icons/facebook_icon.svg';
import InstagramImg from '@/public/icons/instagram_logo.svg';

const ColCenter = 'flex flex-col justify-center';

const CardValues = [
  {
    src: 'bg-[url("/images/landing3.png")]',
    title: '대시보드 설정',
    description: '대시보드 사진과 이름을 변경할 수 있어요.',
  },
  { src: 'bg-[url("/images/landing4.png")]', title: '초대', description: '새로운 팀원을 초대할 수 있어요.' },
  { src: 'bg-[url("/images/landing5.png")]', title: '구성원', description: '구성원을 초대하고 내보낼 수 있어요.' },
];

export default function Home() {
  return (
    <div className='bg-white'>
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
      <main className='flex flex-col items-center pt-[2.625rem] sm:pt-[5.875rem]'>
        <section className='text-center sm:w-full'>
          <div className='w-full sm:px-11 md:px-[6.4375rem]'>
            <Image
              className='h-[10.5rem] w-[17.9375rem] sm:flex sm:h-auto sm:w-full'
              src={heroImg}
              alt='hero image'
              priority
            />
          </div>
          <h1 className='flex flex-col items-center gap-[0.3125rem] pt-[1.625rem] md:flex-row md:justify-center md:gap-6 md:pt-[3.015rem] md:text-center'>
            <span
              className={`${ColCenter} h-[3rem] align-baseline text-[2.5rem] font-bold tracking-[-0.125rem] md:h-[6.25rem] md:text-[3.5rem]`}
            >
              새로운 일정 관리
            </span>
            <span
              className={`${ColCenter} font-mon h-[3.1875rem] text-[2.625rem] tracking-[-0.0625rem] text-violet md:h-[4.0625rem] md:text-[4.375rem]`}
            >
              Taskify
            </span>
          </h1>
          <div className='pt-[1.125rem] text-[0.75rem] tracking-[-0.0625rem] md:pt-6 md:text-[1rem]'>
            서비스의 메인 설명 들어갑니다.
          </div>
          <Link href='/login'>
            <button className='mt-[4.375rem] h-[2.625rem] w-[14.7rem] rounded-lg bg-violet font-medium text-white md:mt-[4.125rem] md:h-[3.125rem] md:w-[17.5rem] md:text-[1rem]'>
              로그인하기
            </button>
          </Link>
        </section>
        <section className='m-4 mt-20 w-full px-4 md:mt-[11.5rem]'>
          <div className='flex h-full flex-col  rounded-lg bg-gray10'>
            <div className='min-h-[22.6875rem] flex-1 text-center'>
              <div className='h-m-[1.375rem] mt-[3.75rem] text-[1.125rem] font-medium text-gray40'>Point 1</div>
              <h2 className='m-auto mt-[3.8125rem] w-[14.1875rem] text-[2.25rem] font-bold leading-[3.125rem]'>
                일의 우선순위를 관리하세요
              </h2>
            </div>
            <div className='flex-1 pl-[2.9375rem]'>
              <Image src={landingImg1} alt='랜딩 이미지' quality={100} className='ml-auto w-full  rounded-tl-lg' />
            </div>
          </div>
        </section>
        <section className='mt-[3.6875rem] flex h-[42.875rem] w-[21.4375rem] flex-col justify-between rounded-lg bg-gray10'>
          <div className='text-center'>
            <div className='mt-[3.75rem] h-[1.375rem] text-[1.125rem] font-medium text-gray40'>Point 2</div>
            <h2 className='m-auto mt-[3.8125rem] w-[10.8125rem] text-[2.25rem] font-bold leading-[3.125rem]'>
              해야 할 일을 등록하세요
            </h2>
          </div>
          <Image
            src={landingImg2}
            alt='랜딩 이미지'
            quality={100}
            className='mx-auto h-[15.625rem] w-[13.5707rem] rounded-tl-lg'
          />
        </section>
        <section className='mt-[5.625rem]'>
          <h2 className='mx-auto mb-[2.625rem]  h-[1.625rem] w-fit text-[1.375rem] font-bold'>
            생산성을 높이는 다양한 설정⚡️
          </h2>
          <div className='flex flex-col gap-[2.53rem]'>
            {CardValues.map((value, i) => (
              <Card value={value} key={i} />
            ))}
          </div>
        </section>
        <footer className='mt-10 w-full bg-[#000000] pb-[5.625rem] pt-[5.03rem] text-[0.75rem] text-gray40'>
          <div className='m-auto max-w-[120rem] text-center'>
            <div className='h-[0.875rem]'>©codeit - 2023</div>
            <div className='mx-auto mb-[4.25rem] mt-3 flex h-[0.875rem] w-fit gap-5'>
              <span>Privacy Policy</span>
              <span>FAQ</span>
            </div>
            <div className='m-auto flex w-fit items-center gap-[1.25rem]'>
              <Image src={EmailImg} alt='email' />
              <Image src={FaceBookImg} alt='facebook' />
              <Image src={InstagramImg} alt='instagram' />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
