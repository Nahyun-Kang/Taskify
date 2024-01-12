import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import toast from 'react-hot-toast';
import { inviteListChange } from '@/src/app/_recoil/dashboardAtom';
import { inviteDashboardForList } from '@/src/app/_recoil/ModalAtom/dashboard';
import InviteDashboard from '@/src/app/_component/modal/dashboard/invite';
import SelectAlert from '@/src/app/_util/SelectAlert';
import addBox from '@/public/icons/add_box.svg';
import PageNation from '@/src/app/_component/Button/PageNation';
import CancelInvite from '@/src/app/_component/Button/CancelInvite';
import { deleteInvitation, getInvitations } from '@/src/app/_api/Dashboards';

interface InviteListProps {
  id: number;
  invitee: {
    id: number;
    email: string;
    nickname: string;
  };
}

export default function InviteList({ dashboardId }: { dashboardId: string | undefined }) {
  const [inviteList, setInviteList] = useState([]);
  const [isActiveBack, setIsActiveBack] = useState(false);
  const [isActiveForward, setIsActiveForward] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isChange, setIsChange] = useRecoilState(inviteListChange);
  const [isOpenInviteDashboard, setIsOpenInviteDashboard] = useRecoilState(inviteDashboardForList);
  const handlePageNation = (direction: 'back' | 'forward') => {
    if (direction === 'back') {
      setPage((prevPage) => prevPage - 1);
    } else if (direction === 'forward') {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const openInviteModal = () => setIsOpenInviteDashboard(true);

  const handleCancelInvite = async (inviteId: number) => {
    const answer = await SelectAlert({ work: 'Cancel' });
    if (answer) {
      deleteInvitation(dashboardId, inviteId, setIsChange);
      toast.success('멤버 초대가 취소 되었습니다.');
    }
  };

  useEffect(() => {
    const getInviteList = async (page: number, pageSize: number) => {
      const result = await getInvitations(dashboardId, page, pageSize);
      if (result) {
        setIsActiveBack(page > 1);
        setIsActiveForward(result.totalCount > page * pageSize);

        setInviteList(result.invitations);
        setTotalPage(Math.ceil(result.totalCount / pageSize));
      }
    };

    getInviteList(page, 4);
  }, [page, dashboardId, isChange]);

  return (
    <div className='item-center flex w-full flex-col gap-[1.25rem] rounded-lg bg-white p-[1.75rem] dark:bg-black90'>
      <div className='flex'>
        <div className='grid flex-none grid-rows-2 md:w-auto md:grid-flow-col md:gap-[1.5rem]'>
          <p className='h-10 w-full text-[1.25rem] font-bold md:flex md:h-[2.5rem] md:text-[1.5rem]'>초대 내역</p>
          <span className='flex w-full items-center text-[1rem] text-gray40 sm:text-[0.875rem]'>이메일</span>
        </div>
        <div className='flex w-full flex-row items-center justify-end gap-3 md:items-start md:gap-4'>
          <div className='flex w-full flex-col items-end gap-[1rem] md:flex-row md:items-center md:justify-end'>
            <div className='flex w-full items-center justify-end gap-[1rem] md:w-auto'>
              <span className='whitespace-nowrap text-black80 dark:text-gray35 sm:text-[0.75rem] md:text-[0.875rem]'>
                {totalPage} 페이지 중 {page}
              </span>
              <PageNation
                size='large'
                isActiveBack={isActiveBack}
                isActiveForward={isActiveForward}
                onClickBack={() => handlePageNation('back')}
                onClickForward={() => handlePageNation('forward')}
              />
            </div>
            <button
              className='flex h-[1.75rem] w-[5.375rem] items-center justify-center gap-[0.5625rem] rounded-[0.25rem] bg-violet text-[0.75rem] text-white md:h-[2rem] md:w-[105px]'
              onClick={openInviteModal}
            >
              <Image src={addBox.src} width={16} height={16} alt='초대 버튼' /> 초대하기
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className='flex justify-between'></div>
        {inviteList &&
          inviteList.map((val: InviteListProps, idx) => (
            <div
              key={val.id}
              className={`max-h[4.375rem] flex items-center justify-between border-gray20 py-[1.75rem] ${
                inviteList.length !== idx + 1 ? 'border-b-[0.0625rem]' : ''
              }`}
            >
              <span className='overflow-hidden text-ellipsis text-black80 dark:text-white8 sm:text-[0.875rem] md:text-[1rem]'>
                {val.invitee.email}
              </span>
              <CancelInvite size='large' onClick={() => handleCancelInvite(val.id)} />
            </div>
          ))}
      </div>
      {isOpenInviteDashboard && <InviteDashboard dashboardId={dashboardId} setIsChange={setIsChange} list />}
    </div>
  );
}
