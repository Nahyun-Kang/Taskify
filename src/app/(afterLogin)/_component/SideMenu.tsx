'use client';

import Link from 'next/link';
import Image from 'next/image';

import textLogo from '@/public/logo/logo_text_only.svg';
import smallLogo from '@/public/logo/nav_lgoo_small.svg';
import addIcon from '@/public/images/add_box_icon.svg';
import greenIdx from '@/public/images/eclipse_small_icon_green.svg';
import crown from '@/public/images/crown_icon.svg';

import { axiosInstance } from '../../_util/axiosInstance';
const Boards = ['비브리지', '코드잇', '3분기 계획', '회의록', '중요 문서함'];
export default function SideMenu() {
  const onSubmit = async () => {
    try {
      const res = await axiosInstance.post('auth/login', {
        email: 'testuser@codeit.com',
        password: 'sprint101',
      });
      console.log(res);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const getDashboards = async () => {
    const res3 = await axiosInstance.get('dashboards', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInRlYW1JZCI6IjEtMyIsImlhdCI6MTcwMjk4MjAyMiwiaXNzIjoic3AtdGFza2lmeSJ9.CyJw1VGMNUVnP97QL8coPmhfCeaBZkMHZDU1KjOyAyo`,
      },
    });
    console.log(res3);
    return res3;
  };

  // const res4 = getDashboards();
  // console.log(res4);

  return (
    <div className='relative'>
      <button onClick={onSubmit}>로그인</button>
      <button onClick={getDashboards}>대시보드</button>
      <div className='h-screen w-[4.1875rem] bg-white pl-[1.375rem] pr-[1.335rem] pt-[1.1875rem] sm:w-[10rem] md:w-[18.75rem]'>
        <Link href='/myboard'>
          <div className='mb-[3.7456rem] flex items-center sm:mb-[2.4294rem]'>
            <Image src={smallLogo} alt='로고' className='h-[33.069px] w-[1.8009rem] sm:flex-shrink-0' />
            <Image src={textLogo} alt='텍스트 로고' className='hidden sm:block' />
          </div>
        </Link>
        <div className='mb-[1.875rem] flex items-center justify-between'>
          <div className='hidden text-[.75rem] font-bold text-gray50 sm:block'>Dash Board</div>
          <Image src={addIcon} alt='대시보드 추가 버튼' className='h-[1.25rem] w-[1.25rem] cursor-pointer' />
        </div>
        <div className='flex flex-col items-center sm:items-start'>
          {Boards.map((item, idx) => {
            return (
              <div className='mb-[1.6875rem] flex items-center' key={idx.toString()}>
                <Image src={greenIdx} alt='인덱스 아이콘' width={8} height={8} className='mr-0 sm:mr-[1rem]' />
                <div className='mr-[0.25rem] hidden text-base font-medium text-gray50 sm:block'>{item}</div>
                <Image src={crown} alt='나의 대시보드 왕관 아이콘' className='hidden sm:block' />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
