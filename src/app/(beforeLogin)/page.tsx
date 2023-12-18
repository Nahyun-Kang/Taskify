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
  { src: 'bg-landingImg3', title: '대시보드 설정', description: '대시보드 사진과 이름을 변경할 수 있어요.' },
  { src: 'bg-landingImg4', title: '초대', description: '새로운 팀원을 초대할 수 있어요.' },
  { src: 'bg-landingImg5', title: '구성원', description: '구성원을 초대하고 내보낼 수 있어요.' },
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
      <main className='flex flex-col items-center pt-[2.625rem]'>
        <section className='text-center'>
          <Image className='h-[10.5rem] w-[17.9375rem]' src={heroImg} alt='hero image' priority />
          <h1 className='flex flex-col gap-[0.3125rem] pt-[1.625rem]'>
            <div className={`${ColCenter} h-[3rem] align-baseline text-[2.5rem] font-bold tracking-[-0.125rem]`}>
              새로운 일정 관리
            </div>
            <span className={`${ColCenter} font-mon h-[3.1875rem] text-[2.625rem] tracking-[-0.0625rem] text-violet`}>
              Taskify
            </span>
          </h1>
          <div className='pt-[1.125rem] text-[0.75rem] tracking-[-0.0625rem]'>서비스의 메인 설명 들어갑니다.</div>
          <Link href='/login'>
            <button className='mt-[4.375rem] h-[2.625rem] w-[14.7rem] rounded-lg bg-violet font-medium text-white'>
              로그인하기
            </button>
          </Link>
        </section>
        <section className='mt-20 flex h-[42.875rem] w-[21.4375rem] flex-col justify-between rounded-lg bg-gray10'>
          <div className='text-center'>
            <div className='mt-[3.75rem] h-[1.375rem] text-[1.125rem] font-medium text-gray40'>Point 1</div>
            <h2 className='m-auto mt-[3.8125rem] w-[14.1875rem] text-[2.25rem] font-bold leading-[3.125rem]'>
              일의 우선순위를 관리하세요
            </h2>
          </div>
          <Image
            src={landingImg1}
            alt='랜딩 이미지'
            quality={100}
            className='ml-auto h-[15.5rem] w-[18.507rem] rounded-tl-lg'
          />
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
