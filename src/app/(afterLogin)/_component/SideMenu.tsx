'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import textLogo from '@/public/logo/logo_text_only.svg';
import smallLogo from '@/public/logo/nav_lgoo_small.svg';
import addIcon from '@/public/images/add_box_icon.svg';
import crown from '@/public/images/crown_icon.svg';
import IdxIcon from './IdxIcon';
import { axiosInstance } from '../../_util/axiosInstance';

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
  console.log(dashboards);

  useEffect(() => {
    const res = getDashboards();
    console.log(res);
  }, []);

  return (
    <div className='relative'>
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
          {dashboards?.map((item: Dashboard, idx: number) => {
            return (
              <div className='mb-[1.6875rem] flex items-center' key={idx.toString()}>
                <IdxIcon color={item.color} />
                <div className='mr-[0.25rem] hidden text-base font-medium text-gray50 sm:block'>{item.title}</div>
                {item.createdByMe === true && (
                  <Image src={crown} alt='나의 대시보드 왕관 아이콘' className='hidden sm:block' />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
