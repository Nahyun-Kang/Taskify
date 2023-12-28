'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import addIcon from '@/public/images/add_box_icon.svg';
import crown from '@/public/images/crown_icon.svg';
import textLogo from '@/public/logo/logo_text_only.svg';
import smallLogo from '@/public/logo/nav_logo_small.svg';
import { getDashboards } from '@/src/app/(afterLogin)/_api/dashboard';
import IdxIcon from '@/src/app/(afterLogin)/_component/Icons/IdxIcon';
import { DashboardProps } from '@/src/app/(afterLogin)/_constant/Dashboard';
import { dashboardState } from '@/src/app/_recoil/dashboardAtoms';
import { useRecoilState } from 'recoil';

export default function SideMenu() {
  const [dashboardData, setDashboardData] = useRecoilState(dashboardState);
  useEffect(() => {
    const fetchDashboard = async () => {
      const data = await getDashboards();
      if (data) {
        setDashboardData(data);
      }
    };
    fetchDashboard();
  }, [setDashboardData]);

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
          {dashboardData.dashboards.map((item: DashboardProps, idx: number) => {
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
