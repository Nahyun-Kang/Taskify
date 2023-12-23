'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import textLogo from '@/public/logo/logo_text_only.svg';
import smallLogo from '@/public/logo/nav_logo_small.svg';
import addIcon from '@/public/images/add_box_icon.svg';
import crown from '@/public/images/crown_icon.svg';
import IdxIcon from '../Icons/IdxIcon';
import { axiosInstance } from '@/src/app/_util/axiosInstance';

interface Dashboard {
  color: string;
  createdAt?: string;
  createdByMe: boolean;
  id?: number;
  title?: string;
  updatedAt?: string;
  userId?: number;
}

export default function SideMenu() {
  const [dashboards, setDashboards] = useState<Dashboard[] | null>(null);
  const getDashboards = async () => {
    try {
      const res = await axiosInstance.get('dashboards?navigationMethod=infiniteScroll', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInRlYW1JZCI6IjEtMyIsImlhdCI6MTcwMjk4MjAyMiwiaXNzIjoic3AtdGFza2lmeSJ9.CyJw1VGMNUVnP97QL8coPmhfCeaBZkMHZDU1KjOyAyo`,
        },
      });

      const {
        data: { dashboards },
      } = res;

      setDashboards(dashboards);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDashboards();
  }, []);

  return (
    <div className='relative z-10'>
      <div className='h-screen w-[4.1875rem] border-r-[.0625rem] bg-white pl-[1.375rem] pr-[1.335rem] pt-[1.1875rem] md:w-[10rem] lg:w-[18.75rem]'>
        <Link href='/myboard'>
          <div className='mb-[2.4294rem] flex items-center md:mb-[3.7456rem]'>
            <Image src={smallLogo} alt='CI' className='h-[33.069px] w-[1.8009rem] md:flex-shrink-0' />
            <Image src={textLogo} alt='텍스트 로고' className='hidden md:block' />
          </div>
        </Link>
        <div className='mb-[1.875rem] flex items-center justify-between'>
          <div className='hidden text-[.75rem] font-bold text-gray50 md:block'>Dash Board</div>
          <Image src={addIcon} alt='대시보드 추가 버튼' className='h-[1.25rem] w-[1.25rem] cursor-pointer' />
        </div>
        <div className='flex flex-col items-center md:items-start'>
          {dashboards?.map((item: Dashboard, idx: number) => {
            return (
              <div className='mb-[1.6875rem] flex items-center' key={idx.toString()}>
                <IdxIcon color={item.color} className='md:mr-[1rem]' />
                <div className='hidden text-base font-medium text-gray50 md:mr-[.375rem] md:block'>{item.title}</div>
                {item.createdByMe === true && (
                  <Image src={crown} alt='내가 생성한 대시보드를 표시하는 왕관 아이콘' className='hidden md:block' />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
