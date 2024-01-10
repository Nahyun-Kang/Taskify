'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import addIcon from '@/public/images/add_box_icon.svg';
import crown from '@/public/images/crown_icon.svg';
import TextLogo from '@/src/app/_component/Icons/TextLogo';
import SmallLogo from '@/src/app/_component/Icons/SmallLogo';
import IdxIcon from '@/src/app/(afterLogin)/_component/Icons/IdxIcon';
import { DashboardProps } from '@/src/app/(afterLogin)/_constant/Dashboard';
import { getDashboards } from '@/src/app/_api/Dashboards';
import { dashboardState } from '@/src/app/_recoil/dashboardAtom';
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { createDashboardModalAboutSide } from '@/src/app/_recoil/ModalAtom/dashboard';
import CreateDashboard from '@/src/app/_component/modal/dashboard/create';

import toast from 'react-hot-toast';
export default function SideMenu() {
  const [isOpen, setIsOpen] = useRecoilState(createDashboardModalAboutSide);
  const [dashboardData, setDashboardData] = useRecoilState(dashboardState);
  const pathName = usePathname();
  const currentBoard = pathName.replace('/dashboard/', '');

  const openModal = () => setIsOpen(true);
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
    <div className='fixed z-[11]'>
      <div className='hide-scrollbar dark:bg-black90 h-screen w-[4.1875rem] overflow-scroll border-r-[.0625rem] bg-white pt-[1.1875rem] dark:border-black80 md:w-[10rem] md:pl-[0.75rem] lg:w-[18.75rem]'>
        <Link href='/myboard'>
          <div className='mb-[2.4294rem] flex items-center justify-center md:mb-[3.7456rem] md:justify-start'>
            <SmallLogo />
            <TextLogo />
          </div>
        </Link>
        <div className='m-auto mb-[0.9375rem] flex w-fit items-center'>
          <div className='hidden text-[.75rem] font-bold text-gray50 dark:text-gray30 md:mr-6 md:block lg:mr-[10rem]'>
            Dash Board
          </div>
          <Image
            src={addIcon}
            alt='대시보드 추가 버튼'
            className='h-[1.25rem] w-[1.25rem] cursor-pointer'
            onClick={openModal}
          />
        </div>
        <div className='m-auto flex w-[2.5rem] flex-col items-center gap-1 md:m-0 md:w-full md:items-start md:pr-3 '>
          {dashboardData?.dashboards.map((item: DashboardProps, idx: number) => {
            return (
              <Link
                href={`/dashboard/${item.id}`}
                key={idx.toString()}
                className={`${
                  item.id === Number(currentBoard) ? 'dark:text-white8 bg-violet8 dark:bg-black80' : ''
                } dark:text-gray35 flex h-[2.25rem] w-full items-center justify-center rounded text-gray50 hover:bg-violet8 dark:hover:bg-black80 md:h-[2.625rem] md:justify-start md:pl-[0.75rem] lg:h-[2.8125rem]`}
              >
                <div className='flex w-full items-center justify-center md:justify-start'>
                  <IdxIcon color={item.color} className='md:mr-[1rem]' />
                  <div
                    className={`${
                      item.createdByMe ? 'md:max-w-[50%]' : ''
                    } hidden flex-grow-0 overflow-hidden text-ellipsis whitespace-nowrap text-base font-medium md:mr-[.375rem] md:block lg:max-w-[80%]`}
                  >
                    {item.title}
                  </div>
                  {item.createdByMe === true && (
                    <Image src={crown} alt='내가 생성한 대시보드를 표시하는 왕관 아이콘' className='hidden md:block' />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {isOpen ? <CreateDashboard side /> : null}
    </div>
  );
}
