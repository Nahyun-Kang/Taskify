'use client';
import { useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import DashboardList from '@/src/app/(afterLogin)/_component/DashboardList';
import InvitationDashboard from '@/src/app/(afterLogin)/_component/InvitationDashboard';

export default function MyBoard() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRefresh = () => {
    if (!isPending) {
      startTransition(() => {
        router.refresh();
      });
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <div className='flex flex-1 bg-gray10'>
      <div className='mt-[4.3125rem] flex max-w-[63.875rem] flex-1 flex-col gap-11 p-6 px-10 md:p-10'>
        <DashboardList />
        <InvitationDashboard />
      </div>
    </div>
  );
}
