'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import addIcon from '@/public/images/add_box_icon.svg';
import crown from '@/public/images/crown_icon.svg';
import textLogo from '@/public/logo/logo_text_only.svg';
import smallLogo from '@/public/logo/nav_logo_small.svg';
import IdxIcon from '@/src/app/(afterLogin)/_component/Icons/IdxIcon';
import { DashboardProps } from '@/src/app/(afterLogin)/_constant/Dashboard';
import { createDashboard, getDashboards } from '@/src/app/_api/Dashboards';
import useRenderModal from '@/src/app/_hook/useRenderModal';
import { dashboardState } from '@/src/app/_recoil/dashboardAtom';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { useRef } from 'react';
export default function SideMenu() {
  const [modalType, callModal, setModalType] = useRenderModal();
  const preModalType = useRef(modalType);
  const router = useRouter();
  const [dashboardData, setDashboardData] = useRecoilState(dashboardState);
  const pathName = usePathname();
  const currentBoard = pathName.replace('/dashboard/', '');

  const handleCreate = async () => {
    callModal({
      name: '새로운 대시보드',
      onSubmit: async (data) => {
        try {
          const newDashboard = await createDashboard(data);
          setDashboardData((prev) => {
            return { ...prev, dashboards: [newDashboard, ...prev.dashboards] };
          });
          setModalType(null);
          if (preModalType.current !== null && modalType === null) {
            router.push(`/dashboard/${newDashboard.id}`);
          }
        } catch (error) {
          // console.error(error);
        }
      },
    });
  };
  useEffect(() => {
    const fetchDashboard = async () => {
      const data = await getDashboards();
      if (data) {
        setDashboardData(data);
      }
    };
    fetchDashboard();
  }, [setDashboardData]);

  useEffect(() => {
    preModalType.current = modalType;
  }, [modalType]);

  return (
    <div className='fixed z-10'>
      <div className='h-screen w-[4.1875rem] border-r-[.0625rem] bg-white pt-[1.1875rem] md:w-[10rem] md:pl-[0.75rem] lg:w-[18.75rem]'>
        <Link href='/myboard'>
          <div className='mb-[2.4294rem] flex items-center justify-center md:mb-[3.7456rem] md:justify-start'>
            <Image src={smallLogo} alt='CI' className='h-[33.069px] w-[1.8009rem] md:flex-shrink-0' />
            <Image src={textLogo} alt='텍스트 로고' className='hidden md:block' />
          </div>
        </Link>
        <div className='m-auto mb-[0.9375rem] flex w-fit items-center'>
          <div className='hidden text-[.75rem] font-bold text-gray50 md:mr-6 md:block lg:mr-[10rem]'>Dash Board</div>
          <Image
            src={addIcon}
            alt='대시보드 추가 버튼'
            className='h-[1.25rem] w-[1.25rem] cursor-pointer'
            onClick={handleCreate}
          />
        </div>
        <div className='m-auto flex w-[2.5rem] flex-col items-center md:m-0 md:w-full md:items-start md:pr-3'>
          {dashboardData?.dashboards.map((item: DashboardProps, idx: number) => {
            return (
              <Link
                href={`/dashboard/${item.id}`}
                key={idx.toString()}
                className={`${
                  item.id === Number(currentBoard) ? 'bg-violet8' : ''
                } flex h-[2.5rem] w-full items-center justify-center  rounded md:h-[2.6875rem] md:justify-start md:pl-[0.75rem] lg:h-[2.8125rem]`}
              >
                <div className='flex w-full items-center'>
                  <IdxIcon color={item.color} className='md:mr-[1rem]' />
                  <div
                    className={`${
                      item.createdByMe ? 'md:max-w-[50%]' : ''
                    } hidden flex-grow-0 overflow-hidden text-ellipsis whitespace-nowrap text-base font-medium text-gray50 md:mr-[.375rem] md:block lg:max-w-[80%]`}
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
      {modalType}
    </div>
  );
}
