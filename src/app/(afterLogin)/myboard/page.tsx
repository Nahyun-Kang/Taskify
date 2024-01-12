'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { DashboardProps } from '@/src/app/(afterLogin)/_constant/Dashboard';
import DashboardList from '@/src/app/(afterLogin)/myboard/_component/DashboardList';
import InvitationDashboard from '@/src/app/(afterLogin)/myboard/_component/InvitationDashboard';
import { getAccessToken } from '@/src/app/_util/getAccessToken';

export default function MyBoard() {
  const router = useRouter();
  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [dashboards, setDashboards] = useState<DashboardProps[]>([]);
  const [page, setPage] = useState(1);
  return (
    <div className='flex flex-1'>
      <div className='mt-[4.3125rem] flex max-w-[63.875rem] flex-1 flex-col gap-11 p-6 px-10 md:p-10'>
        <DashboardList dashboards={dashboards} setDashboards={setDashboards} page={page} setPage={setPage} />
        <InvitationDashboard setDashboards={setDashboards} page={page} />
      </div>
    </div>
  );
}
