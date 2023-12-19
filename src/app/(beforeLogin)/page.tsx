import Image from 'next/image';
import Link from 'next/link';
import logoLarge from '@/public/logo/nav_logo_large.svg';
import logoSmall from '@/public/logo/nav_lgoo_small.svg';
import heroImg from '@/public/images/hero.png';
import landingImg1 from '@/public/images/landing1.png';
import landingImg2 from '@/public/images/landing2.png';
import Card from './_component/Card';
import EmailImg from '@/public/icons/email_icon.svg';
import githubImg from '@/public/icons/icons8-github.svg';
import notionImg from '@/public/icons/icons8-notion.svg';
import { CardValues } from './_constants/landing';

const ColCenter = 'flex flex-col justify-center';

export default function Home() {
  return (
    <div className='bg-white'>
      <header className='m-auto flex h-[3.75rem] max-w-[120rem] items-center justify-between px-6 md:pr-0'>
        <Link href='/'>
          <Image className='sm:hidden' src={logoSmall} alt='logo' />
          <Image className='hidden h-[2.4375rem] w-[7.5625rem] sm:block' src={logoLarge} alt='로고' />
        </Link>
        <div className='flex gap-5 text-[0.875rem] md:gap-9 md:pr-10 md:text-base lg:pr-20'>
          <Link href='/login'>로그인</Link>
          <Link href='/signup'>회원가입</Link>
        </div>
      </header>
      <main className='flex flex-col items-center pt-[2.625rem] md:pt-[5.875rem]'>
        <section className='text-center md:w-full'>
          <div className='w-full md:px-[6.4375rem] lg:px-11'>
            <Image
              className='h-[10.5rem] w-[17.9375rem] md:m-auto md:flex md:h-auto md:w-full md:max-w-[45.125rem]'
              src={heroImg}
              alt='hero image'
              priority
            />
          </div>
          <h1 className='flex flex-col items-center gap-[0.3125rem] pt-[1.625rem] md:flex-row md:justify-center md:gap-6 md:pt-[3.015rem] md:text-center lg:gap-[1.75rem]'>
            <span
              className={`${ColCenter} h-[3rem] align-baseline text-[2.5rem] font-bold tracking-[-0.125rem] md:h-[6.25rem] md:text-[3.5rem] lg:h-[6.25rem] lg:text-[4.75rem]`}
            >
              새로운 일정 관리
            </span>
            <span
              className={`${ColCenter} font-mon h-[3.1875rem] text-[2.625rem] tracking-[-0.0625rem] text-violet md:h-[4.0625rem] md:text-[4.375rem] lg:h-[4.0625rem] lg:text-[5.625rem]`}
            >
              Taskify
            </span>
          </h1>
          <div className='pt-[1.125rem] text-[0.75rem] tracking-[-0.0625rem] md:pt-6 md:text-[1rem]'>
            효율적으로 일정을 관리해 보세요.
          </div>
          <Link href='/login'>
            <button className='mt-[4.375rem] h-[2.625rem] w-[14.7rem] rounded-lg bg-violet font-medium text-white md:mt-[4.125rem] md:h-[3.125rem] md:w-[17.5rem] md:text-[1rem]'>
              로그인하기
            </button>
          </Link>
        </section>
        <section className='m-4 mt-20 w-full px-4 md:mt-[11.5rem] md:px-10'>
          <div className='flex h-full flex-col  rounded-lg bg-gray10 md:m-auto md:max-w-[75rem] lg:h-[37.5rem] lg:flex-row'>
            <div className='min-h-[22.6875rem] flex-1 text-center md:min-h-[30.375rem] md:pl-[3.75rem] md:text-left'>
              <div className='h-m-[1.375rem] mt-[3.75rem] text-[1.125rem] font-medium text-gray40 md:mt-[3.9375rem] md:text-[1.375rem] lg:mt-[7.6875rem]'>
                Point 1
              </div>
              <h2 className='m-auto mt-[3.8125rem] w-[14.1875rem] text-[2.25rem] font-bold leading-[3.125rem] md:mx-0 md:mt-[6.25rem] md:w-[18.875rem] md:text-[3rem]'>
                일의 우선순위를 관리하세요
              </h2>
            </div>
            <div className='flex-1 pl-[2.9375rem] md:pl-[9.0625rem] lg:flex lg:w-[37.125rem] lg:items-end lg:pl-0'>
              <Image src={landingImg1} alt='랜딩 이미지' quality={100} className='ml-auto w-full  rounded-tl-lg' />
            </div>
          </div>
        </section>
        <section className='m-4 mt-20 w-full px-4 md:mt-[11.5rem] md:px-10'>
          <div className='flex h-full flex-col  rounded-lg bg-gray10 md:m-auto md:max-w-[75rem] lg:h-[37.5rem] lg:flex-row-reverse'>
            <div className='min-h-[22.6875rem] flex-1 text-center md:min-h-[30.375rem] md:pl-[3.75rem] md:text-left'>
              <div className='h-m-[1.375rem] mt-[3.75rem] text-[1.125rem] font-medium text-gray40 md:mt-[3.9375rem] md:text-[1.375rem] lg:mt-[7.6875rem]'>
                Point 2
              </div>
              <h2 className='m-auto mt-[3.8125rem] w-[14.1875rem] text-[2.25rem] font-bold leading-[3.125rem] md:mx-0 md:mt-[6.25rem] md:w-[14.375rem] md:text-[3rem]'>
                해야 할 일을 등록하세요
              </h2>
            </div>
            <div className='flex flex-1 px-[3.9375rem] md:px-[9.5rem] lg:items-end lg:pl-[6.4375rem]'>
              <Image
                src={landingImg2}
                alt='랜딩 이미지'
                quality={100}
                className='mx-auto rounded-t-lg lg:h-[31.375rem] lg:w-auto'
              />
            </div>
          </div>
        </section>
        <section className='mt-[5.625rem]'>
          <h2 className='mx-auto mb-[2.625rem] h-[1.625rem] w-fit text-[1.375rem] font-bold md:mb-9 md:text-[1.75rem]  lg:ml-0 '>
            생산성을 높이는 다양한 설정⚡️
          </h2>
          <div className='flex flex-col gap-[2.53rem] md:gap-12 lg:w-[75rem] lg:flex-row lg:justify-between lg:gap-0'>
            {CardValues.map((value, i) => (
              <Card value={value} key={i} />
            ))}
          </div>
        </section>
        <footer className='mt-10 w-full bg-[#000000] pb-[5.625rem] pt-[5.03rem] text-[0.75rem] text-gray40 md:mt-40 md:h-[6.25rem] md:p-0 md:text-[1rem]'>
          <div className='m-auto flex max-w-[120rem] flex-col items-center text-center md:h-full md:flex-row md:justify-between md:px-[8.8125rem]'>
            <div className='h-[0.875rem] md:h-[1rem]'>©codeit - 2023</div>
            <div className='mx-auto mb-[4.25rem] mt-3 flex h-[0.875rem] w-fit gap-5 md:m-0 md:h-[1rem]'>
              <span>Privacy Policy</span>
              <span>FAQ</span>
            </div>
            <div className='m-auto flex w-fit items-center gap-[1.25rem] md:m-0'>
              <a href='https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=gooma519@gmail.com' target='_blank'>
                <Image src={EmailImg} alt='email' />
              </a>
              <Link href='https://github.com/Codeit-Part3-Team3/Taskify'>
                <Image src={githubImg} alt='github' className='w-[1.375rem]' />
              </Link>
              <Link href='https://www.notion.so/c5a74ae4204744d5b46bd058b693ddb3'>
                <Image src={notionImg} alt='notion' className='w-[1.375rem]' />
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
