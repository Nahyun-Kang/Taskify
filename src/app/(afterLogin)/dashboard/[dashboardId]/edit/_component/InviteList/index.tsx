import Image from 'next/image';
import { useEffect, useState } from 'react';
import addBox from '@/public/icons/add_box.svg';
import PageNation from '@/src/app/_component/Button/PageNation';
import CancelInvite from '@/src/app/_component/Button/CancelInvite';
import { getInvitations } from '@/src/app/_api/Dashboards';

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
  const getInviteList = async (page: number, pageSize: number) => {
    const result = await getInvitations(dashboardId, page, pageSize);
    if (result) {
      setIsActiveBack(page > 1);
      setIsActiveForward(result.totalCount > page * pageSize);

      setInviteList(result.invitations);
      setTotalPage(Math.ceil(result.totalCount / pageSize));
    }
  };

  const handlePageNation = (direction: 'back' | 'forward') => {
    if (direction === 'back') {
      setPage((prevPage) => prevPage - 1);
    } else if (direction === 'forward') {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleInvite = () => {
    //modal
  };

  useEffect(() => {
    getInviteList(page, 4);
  }, [page]);

  // const { invitations } = invitationsRes;

  return (
    <div className='item-center flex w-full flex-col gap-[1.25rem] p-[1.75rem]'>
      <div className='flex'>
        <div className='grid flex-none grid-rows-2 md:w-auto md:grid-flow-col md:gap-[1.5rem]'>
          <p className='h-10 w-full text-[1.25rem] font-bold text-black md:flex md:h-[2.5rem] md:text-[1.5rem]'>
            초대 내역
          </p>
          <span className='flex w-full items-center text-[1rem] text-gray40 sm:text-[0.875rem]'>이메일</span>
        </div>
        <div className='flex w-full flex-row items-center justify-end gap-3 md:items-start md:gap-4'>
          <div className='flex w-full flex-col items-end gap-[1rem] md:flex-row md:items-center md:justify-end'>
            <div className='flex w-full items-center justify-end gap-[1rem] md:w-auto'>
              <span className='whitespace-nowrap text-black80 sm:text-[0.75rem] md:text-[0.875rem]'>
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
              onClick={handleInvite}
            >
              <Image src={addBox.src} width={16} height={16} alt='초대 버튼' /> 초대하기
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className='flex justify-between'></div>
        {inviteList &&
          inviteList.map((val: InviteListProps) => (
            <div
              key={val.id}
              className='max-h[4.375rem] flex items-center justify-between border-b-[0.0625rem] border-gray20 py-[1.75rem]'
            >
              <span className='text-black80 sm:text-[0.875rem] md:text-[1rem]'>{val.invitee.email}</span>
              <CancelInvite size='large' onClick={handleInvite} />
            </div>
          ))}
      </div>
    </div>
  );
}
