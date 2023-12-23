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
    <div className='flex w-full flex-col gap-6 bg-gray10'>
      <div className='flex flex-col gap-2 md:gap-3 '>
        <div className='grid grid-flow-row gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3'>
          <AddDashboard screen='mobile' onClick={() => {}} />
          {dashBoards.map((dashboard) => (
            <CardDashboard
              key={dashboard.id}
              screen='mobile'
              onClick={() => {}}
              title={dashboard.title}
              createdByMe={dashboard.createdByMe}
              circleColor='bg-[#7AC555]'
            />
          ))}
        </div>
        <div className='ml-auto flex items-center gap-3 text-[0.75rem]'>
          <span>{totalPages} 페이지 중 1</span>
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
