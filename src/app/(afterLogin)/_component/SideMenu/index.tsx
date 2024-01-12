'use client';
import addIcon from '@/public/images/add_box_icon.svg';
import crown from '@/public/images/crown_icon.svg';
import IdxIcon from '@/src/app/(afterLogin)/_component/Icons/IdxIcon';
import LeftArrowIcon from '@/src/app/(afterLogin)/_component/Icons/LeftArrowIcon';
import RightArrowIcon from '@/src/app/(afterLogin)/_component/Icons/RightArrowIcon';
import { DashboardProps } from '@/src/app/(afterLogin)/_constant/Dashboard';
import { getDashboards } from '@/src/app/_api/Dashboards';
import SmallLogo from '@/src/app/_component/Icons/SmallLogo';
import TextLogo from '@/src/app/_component/Icons/TextLogo';
import CreateDashboard from '@/src/app/_component/modal/dashboard/create';
import { createDashboardModalAboutSide } from '@/src/app/_recoil/ModalAtom/dashboard';
import { dashboardState } from '@/src/app/_recoil/dashboardAtom';
import { darkMode, darkModeText } from '@/src/app/darkMode';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function SideMenu() {
  const [showInMobile, setShowInMobile] = useState(false);
  const [isOpenCreateDashboard, setIsOpenCreateDashboard] = useRecoilState(createDashboardModalAboutSide);
  const [dashboardData, setDashboardData] = useRecoilState(dashboardState);
  const pathName = usePathname();
  const currentBoard = pathName.replace('/dashboard/', '');

  const openModal = () => setIsOpenCreateDashboard(true);
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
      <div
        className={`hide-scrollbar duration-400 h-screen transition-all md:transition-none ${
          showInMobile ? 'w-[10rem] pl-[0.75rem]' : 'w-[4.1875rem]'
        } overflow-scroll border-r-[.0625rem] bg-white pt-[1.1875rem] ${darkMode} md:w-[10rem] md:pl-[0.75rem] lg:w-[18.75rem]`}
      >
        <Link href='/myboard'>
          <div className={`mb-[2.4294rem] flex items-center justify-center md:mb-[3.7456rem] md:justify-start`}>
            <SmallLogo />
            <TextLogo />
          </div>
        </Link>
        <div className='m-auto mb-[0.9375rem] flex w-fit items-center transition-none'>
          <div
            className={`${
              showInMobile ? 'block' : 'hidden'
            } mr-6 text-[.75rem] font-bold text-gray50 dark:text-gray30 md:block lg:mr-[10rem]`}
          >
            Dash Board
          </div>
          <Image
            src={addIcon}
            alt='대시보드 추가 버튼'
            className='h-[1.25rem] w-[1.25rem] cursor-pointer'
            onClick={openModal}
          />
        </div>
        <button
          type='button'
          onClick={() => setShowInMobile((prev) => !prev)}
          className={`flex ${showInMobile ? 'mr-[20px]' : ''} m-auto mb-[0.9375rem] md:hidden`}
        >
          {showInMobile ? <LeftArrowIcon /> : <RightArrowIcon />}
        </button>
        <div
          className={`m-auto flex ${
            showInMobile ? 'm-0 w-full items-start pr-3' : 'w-[2.5rem]'
          } flex-col items-center gap-1 md:m-0 md:w-full md:items-start md:pr-3`}
        >
          {dashboardData?.dashboards.map((item: DashboardProps, idx: number) => {
            return (
              <Link
                href={`/dashboard/${item.id}`}
                key={idx.toString()}
                className={`${
                  item.id === Number(currentBoard) ? `bg-violet8 ${darkMode} ${darkModeText}` : ''
                } flex  w-full items-center  rounded text-gray50 hover:bg-violet8 ${darkModeText} dark:hover:bg-black80 ${
                  showInMobile ? 'h-[2.625rem] justify-start pl-[0.75rem]' : 'h-[2.25rem] justify-center'
                } md:h-[2.625rem] md:justify-start md:pl-[0.75rem] lg:h-[2.8125rem]`}
              >
                <div
                  className={`flex w-full items-center ${
                    showInMobile ? 'justify-start' : 'justify-center'
                  } md:justify-start`}
                >
                  <IdxIcon color={item.color} className={`${showInMobile ? 'mr-[1rem]' : ''} shrink-0 md:mr-[1rem]`} />
                  <div
                    className={`${item.createdByMe ? 'max-w-[50%]' : ''} ${
                      showInMobile ? 'block' : 'hidden'
                    } mr-[.375rem] flex-grow-0 overflow-hidden text-ellipsis whitespace-nowrap text-base font-medium md:block lg:max-w-[80%]`}
                  >
                    {item.title}
                  </div>
                  {item.createdByMe === true && (
                    <Image
                      src={crown}
                      alt='내가 생성한 대시보드를 표시하는 왕관 아이콘'
                      className={`${showInMobile ? 'block' : 'hidden'} md:block`}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {isOpenCreateDashboard && <CreateDashboard side />}
    </div>
  );
}
