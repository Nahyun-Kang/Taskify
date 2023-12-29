'use client';
import DeleteDashboard from '@/src/app/_component/Button/DeleteDashboard';
import useGetWindowSize from '@/src/app/_hook/useGetWindowSize';
import EditBoard from './_component/EditBoard';
import InviteList from './_component/InviteList';
import MemberList from './_component/MemberList';
import { deleteDashboard } from '@/src/app/_api/Dashboards';
import { dashboardState } from '@/src/app/_recoil/dashboardAtoms';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

export default function BoardEdit({ params }: { params: { dashboardId: string } }) {
  const router = useRouter();
  const setDashboardData = useSetRecoilState(dashboardState);
  const windowSize = useGetWindowSize();
  const isMobile = windowSize < 510 ? true : false;

  const handleDelete = async () => {
    const result = await deleteDashboard(params.dashboardId);
    if (!result) return;
    if (result === 204) {
      setDashboardData((prevDashboard) => ({
        ...prevDashboard,
        dashboards: prevDashboard.dashboards.filter((item) => item.id !== Number(params.dashboardId)),
      }));
      router.replace('/myboard');
    }
  };

  return (
    <div className='mt-[4.3125rem] bg-white sm:w-full md:max-w-[34rem] lg:w-[38.75rem]'>
      <EditBoard boardName='비브리지' dashboardId='163' />
      <MemberList dashboardId={params.dashboardId} />
      <InviteList dashboardId={params.dashboardId} />
      <div className='sm:item-center  flex  max-w-[38.75rem] flex-col gap-[1.25rem] p-[1.75rem]'>
        <DeleteDashboard screen={isMobile ? 'mobile' : 'desktop'} onClick={handleDelete} />
      </div>
    </div>
  );
}
