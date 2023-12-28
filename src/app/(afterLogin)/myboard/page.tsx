'use client';

import DashboardList from '@/src/app/(afterLogin)/_component/DashboardList';
import InvitationDashboard from '@/src/app/(afterLogin)/_component/InvitationDashboard';
import { dashboardState } from '@/src/app/_recoil/dashboardAtoms';
import { useRecoilValue } from 'recoil';

export default function MyBoard() {
  const { dashboards, totalCount } = useRecoilValue(dashboardState);
  return (
    <div className='flex flex-1 bg-gray10'>
      <div className='mt-[4.3125rem] flex max-w-[63.875rem] flex-1 flex-col gap-11 p-6 px-10 md:p-10'>
        <DashboardList dashBoards={dashboards} totalPages={totalCount} />
        <InvitationDashboard />
      </div>
    </div>
  );
}
