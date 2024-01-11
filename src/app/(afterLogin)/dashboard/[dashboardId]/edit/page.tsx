'use client';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import DeleteDashboard from '@/src/app/_component/Button/DeleteDashboard';
import useGetWindowSize from '@/src/app/_hook/useGetWindowSize';
import EditBoard from '@/src/app/(afterLogin)/dashboard/[dashboardId]/edit/_component/EditBoard';
import InviteList from '@/src/app/(afterLogin)/dashboard/[dashboardId]/edit/_component/InviteList';
import MemberList from '@/src/app/(afterLogin)/dashboard/[dashboardId]/edit/_component/MemberList';
import { deleteDashboard } from '@/src/app/_api/Dashboards';
import { dashboardState } from '@/src/app/_recoil/dashboardAtom';
import EditLayout from '@/src/app/(afterLogin)/_component/EditLayout';
import SelectAlert from '@/src/app/_util/SelectAlert';

export default function BoardEdit({ params }: { params: { dashboardId: string } }) {
  const router = useRouter();
  const setDashboardData = useSetRecoilState(dashboardState);
  const windowSize = useGetWindowSize();
  const isMobile = windowSize < 510 ? true : false;

  const handleDelete = async () => {
    const answer = await SelectAlert({ work: 'Delete' });
    if (answer) {
      const result = await deleteDashboard(params.dashboardId);
      if (!result) return;
      if (result === 204) {
        setDashboardData((prevDashboard) => ({
          ...prevDashboard,
          dashboards: prevDashboard.dashboards.filter((item) => item.id !== Number(params.dashboardId)),
        }));
        router.replace('/myboard');
      }
    }
  };

  return (
    <EditLayout dashboardId={params.dashboardId}>
      <div className='flex flex-col gap-[0.625rem] sm:w-full md:max-w-[34rem] lg:w-[38.75rem]'>
        <EditBoard dashboardId={params.dashboardId} />
        <MemberList dashboardId={params.dashboardId} />
        <InviteList dashboardId={params.dashboardId} />
        <DeleteDashboard screen={isMobile ? 'mobile' : 'desktop'} onClick={handleDelete} />
      </div>
    </EditLayout>
  );
}
