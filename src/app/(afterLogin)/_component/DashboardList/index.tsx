'use client';
import { createDashboard, getPaginatedDashboards } from '@/src/app/_api/Dashboards';
import AddDashboard from '@/src/app/_component/Button/AddDashboard';
import CardDashboard from '@/src/app/_component/Button/CardDashboard';
import PageNation from '@/src/app/_component/Button/PageNation';
import useRenderModal from '@/src/app/_hook/useRenderModal';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DashboardProps } from '@/src/app/(afterLogin)/_constant/Dashboard';
import { useSetRecoilState } from 'recoil';
import { dashboardState } from '@/src/app/_recoil/dashboardAtom';

export default function DashboardList() {
  const [ModalType, callModal] = useRenderModal();
  const router = useRouter();
  const [dashboards, setDashboards] = useState<DashboardProps[]>([]);
  const setDashboardData = useSetRecoilState(dashboardState);
  const handleCreate = async () => {
    callModal({
      name: '새로운 대시보드',
      onSubmit: async (data) => {
        try {
          const newDashboard = await createDashboard(data);
          setDashboardData((prev) => {
            return { ...prev, dashboards: [newDashboard, ...prev.dashboards] };
          });
          router.push(`/dashboard/${newDashboard.id}`);
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const [isActiveBack, setIsActiveBack] = useState(false);
  const [isActiveForward, setIsActiveForward] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const handlePageNation = (direction: 'back' | 'forward') => {
    if (direction === 'back') {
      setPage((prevPage) => prevPage - 1);
    } else if (direction === 'forward') {
      setPage((prevPage) => prevPage + 1);
    }
  };

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
  }, [page]);
  return (
    <div className='flex w-full flex-col gap-2 bg-gray10 md:gap-6'>
      <div className='flex flex-col gap-2 md:gap-3'>
        <div className='grid auto-rows-[3.875rem] gap-2 md:auto-rows-[4.25rem] md:grid-cols-2 md:gap-3 lg:auto-rows-[4.375rem]'>
          <AddDashboard screen='free' onClick={handleCreate} />
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
          <span className='flex w-full text-[0.75rem] md:text-[0.875rem]'>
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
      {ModalType}
    </div>
  );
}
