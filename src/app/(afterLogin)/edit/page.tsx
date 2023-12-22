'use client';
import DeleteDashboard from '../../_component/Button/DeleteDashboard';
import useGetWindowSize from '../../_hook/useGetWindowSize';
import EditBoard from './_component/EditBoard';
import InviteList from './_component/InviteList';
import MemberList from './_component/MemberList';

export default function BoardEdit() {
  const windowSize = useGetWindowSize();
  const isMobile = windowSize < 435 ? true : false;

  const handleDelete = () => {
    //dashboard 삭제 api
  };

  return (
    <div className='bg-white'>
      <EditBoard boardName='비브리지' dashboardId='123' />
      <MemberList />
      <InviteList />
      <div className='sm:item-center  flex  max-w-[38.75rem] flex-col gap-[1.25rem] p-[1.75rem]'>
        <DeleteDashboard screen={isMobile ? 'mobile' : 'desktop'} onClick={handleDelete} />
      </div>
    </div>
  );
}
