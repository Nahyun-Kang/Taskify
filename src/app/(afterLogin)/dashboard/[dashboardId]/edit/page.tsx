'use client';
import DeleteDashboard from '@/src/app/_component/Button/DeleteDashboard';
import useGetWindowSize from '@/src/app/_hook/useGetWindowSize';
import EditBoard from './_component/EditBoard';
import InviteList from './_component/InviteList';
import MemberList from './_component/MemberList';

export default function BoardEdit({ params }: { params: { dashboardId: string } }) {
  const windowSize = useGetWindowSize();
  const isMobile = windowSize < 510 ? true : false;

  const handleDelete = () => {
    //dashboard 삭제 api
  };

  return (
    <div className='mt-[4.3125rem] bg-white sm:w-full md:max-w-[34rem] lg:w-[38.75rem]'>
      <EditBoard boardName='비브리지' dashboardId='123' />
      <MemberList />
      <InviteList dashboardId={params.dashboardId} />
      <div className='sm:item-center  flex  max-w-[38.75rem] flex-col gap-[1.25rem] p-[1.75rem]'>
        <DeleteDashboard screen={isMobile ? 'mobile' : 'desktop'} onClick={handleDelete} />
      </div>
    </div>
  );
}
