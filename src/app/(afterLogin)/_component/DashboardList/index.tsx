'use client';
import AddDashboard from '@/src/app/_component/Button/AddDashboard';
import CardDashboard from '@/src/app/_component/Button/CardDashboard';
import PageNation from '@/src/app/_component/Button/PageNation';

interface DashBoardListProps {
  dashBoards: {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  }[];
  totalPages: number;
}
export default function DashboardList({ dashBoards, totalPages }: DashBoardListProps) {
  return (
    <div className='flex w-full flex-col gap-2 bg-gray10 md:gap-6'>
      <div className='flex flex-col gap-2 md:gap-3'>
        <div className='grid auto-rows-[3.875rem] gap-2 md:auto-rows-[4.25rem] md:grid-cols-2 md:gap-3 lg:auto-rows-[4.375rem]'>
          <AddDashboard screen='free' onClick={() => {}} />
          {dashBoards.map((dashboard) => (
            <CardDashboard
              key={dashboard.id}
              screen='free'
              onClick={() => {}}
              title={dashboard.title}
              createdByMe={dashboard.createdByMe}
              color='bg-[#7AC555]'
            />
          ))}
        </div>
        <div className='ml-auto grid auto-cols-[4.5rem] grid-flow-col items-center gap-3 text-[0.75rem] md:auto-cols-[5rem]'>
          <span className='text-3 md:text-[0.875rem]'>{totalPages} 페이지 중 1</span>
          <PageNation
            size='small'
            isActiveBack={true}
            isActiveForward={true}
            onClickBack={() => {}}
            onClickForward={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
