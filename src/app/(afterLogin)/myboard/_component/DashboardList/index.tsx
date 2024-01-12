'use client';
import { getPaginatedDashboards } from '@/src/app/_api/Dashboards';
import AddDashboard from '@/src/app/_component/Button/AddDashboard';
import CardDashboard from '@/src/app/_component/Button/CardDashboard';
import PageNation from '@/src/app/_component/Button/PageNation';

import { useEffect, useState } from 'react';
import { DashboardProps } from '@/src/app/(afterLogin)/_constant/Dashboard';
import { useRecoilState } from 'recoil';

import CreateDashboard from '@/src/app/_component/modal/dashboard/create';
import { createDashboardModal } from '@/src/app/_recoil/ModalAtom/dashboard';
import { darkModeTextGray } from '@/src/app/darkMode';
interface DashboardListProps {
  dashboards: DashboardProps[];
  setDashboards: (value: DashboardProps[]) => void;
  page: number;
  setPage: (value: number) => void;
}

export default function DashboardList({ dashboards, setDashboards, page, setPage }: DashboardListProps) {
  const [isOpenNewDashboard, setIsOpenNewDashboard] = useRecoilState(createDashboardModal);
  const [isActiveBack, setIsActiveBack] = useState(false);
  const [isActiveForward, setIsActiveForward] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  const handlePageNation = (direction: 'back' | 'forward') => {
    if (direction === 'back') {
      setPage(page - 1);
    } else if (direction === 'forward') {
      setPage(page + 1);
    }
  };

  const openNewDashboardModal = () => setIsOpenNewDashboard(true);

  useEffect(() => {
    const getDashboardList = async (page: number, pageSize: number) => {
      const result = await getPaginatedDashboards(page, pageSize);
      if (result) {
        setIsActiveBack(page > 1);
        setIsActiveForward(result.totalCount > page * pageSize);

        setDashboards(result.dashboards);
        setTotalPage(Math.ceil(result.totalCount / pageSize));
      }
    };

    getDashboardList(page, 5);
  }, [page, setDashboards]);
  return (
    <div className='flex w-full flex-col gap-2 md:gap-6'>
      <div className='flex flex-col gap-2 md:gap-3'>
        <div className='grid auto-rows-[3.875rem] gap-2 md:auto-rows-[4.25rem] md:grid-cols-2 md:gap-3 lg:auto-rows-[4.375rem]'>
          <AddDashboard screen='free' onClick={openNewDashboardModal} />
          {dashboards?.map((dashboard) => (
            <CardDashboard
              key={dashboard.id}
              id={dashboard.id}
              screen='free'
              title={dashboard.title}
              createdByMe={dashboard.createdByMe}
              color={dashboard.color}
            />
          ))}
        </div>
        <div className='ml-auto flex items-center gap-3'>
          <span className={` flex w-full text-[0.75rem] md:text-[0.875rem] ${darkModeTextGray}`}>
            {totalPage} 페이지 중 {page}
          </span>
          <PageNation
            size='small'
            isActiveBack={isActiveBack}
            isActiveForward={isActiveForward}
            onClickBack={() => handlePageNation('back')}
            onClickForward={() => handlePageNation('forward')}
          />
        </div>
      </div>
      {isOpenNewDashboard ? <CreateDashboard /> : null}
    </div>
  );
}
