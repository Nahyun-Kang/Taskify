import Image from 'next/image';
import { useState } from 'react';
import addBox from '@/public/icons/add_box.svg';
import PageNation from '@/src/app/_component/Button/PageNation';
import CancelInvite from '@/src/app/_component/Button/CancelInvite';
import useGetWindowSize from '@/src/app/_hook/useGetWindowSize';

const invitationsRes = {
  totalCount: 0,
  invitations: [
    {
      id: 1,
      inviterUserId: 1,
      teamId: 'string',
      dashboard: {
        title: 'string',
        id: 1,
      },
      invitee: {
        nickname: '하나',
        email: 'testA@gmail.com',
        id: 1,
      },
      inviteAccepted: true,
    },
    {
      id: 2,
      inviterUserId: 2,
      teamId: 'string',
      dashboard: {
        title: 'string',
        id: 2,
      },
      invitee: {
        nickname: '둘',
        email: 'testB@gmail.com',
        id: 2,
      },
      inviteAccepted: true,
    },
    {
      id: 3,
      inviterUserId: 3,
      teamId: 'string',
      dashboard: {
        title: 'string',
        id: 3,
      },
      invitee: {
        nickname: '셋',
        email: 'testC@gmail.com',
        id: 3,
      },
      inviteAccepted: true,
    },
    {
      id: 4,
      inviterUserId: 4,
      teamId: 'string',
      dashboard: {
        title: 'string',
        id: 4,
      },
      invitee: {
        nickname: '넷',
        email: 'testD@gmail.com',
        id: 4,
      },
      inviteAccepted: true,
    },
    {
      id: 5,
      inviterUserId: 5,
      teamId: 'string',
      dashboard: {
        title: 'string',
        id: 5,
      },
      invitee: {
        nickname: '다섯',
        email: 'testE@gmail.com',
        id: 5,
      },
      inviteAccepted: true,
    },
  ],
};

export default function InviteList() {
  const [isActiveBack, setIsActiveBack] = useState(false);
  const [isActiveForward, setIsActiveForward] = useState(false);
  const windowSize = useGetWindowSize();

  const handlePageNation = () => {
    console.log(setIsActiveBack, setIsActiveForward);
  };
  const handleInvite = () => {
    //modal
  };

  const { invitations } = invitationsRes;

  return (
    <div className='item-center flex w-full flex-col gap-[1.25rem] p-[1.75rem]'>
      <div className='flex w-full justify-between'>
        <p className='font-bold text-black sm:text-[1.25rem] md:text-[1.5rem]'>초대 내역</p>
        <div className='flex items-center gap-[1rem] sm:grow-0'>
          <span className=' text-black80 sm:text-[0.75rem] md:text-[0.875rem]'>1 페이지 중 1</span>
          <PageNation
            size='large'
            isActiveBack={isActiveBack}
            isActiveForward={isActiveForward}
            onClickBack={handlePageNation}
            onClickForward={handlePageNation}
          />
          {windowSize > 510 && (
            <button
              className='flex h-[2rem] w-[6.5625rem] items-center justify-center gap-[0.5625rem] rounded-[0.25rem] bg-violet text-white'
              onClick={handleInvite}
            >
              <Image src={addBox.src} width={16} height={16} alt='초대 버튼' /> 초대하기
            </button>
          )}
        </div>
      </div>
      <div>
        <div className='flex justify-between'>
          <span className='text-[1rem] text-gray40 sm:text-[0.875rem]'>이메일</span>
          {windowSize < 510 && (
            <button
              className='flex h-[2rem] w-[6.5625rem] items-center justify-center gap-[0.5625rem] rounded-[0.25rem] bg-violet text-white'
              onClick={handleInvite}
            >
              <Image src={addBox.src} width={16} height={16} alt='초대 버튼' /> 초대하기
            </button>
          )}
        </div>
        {invitations.map((val) => (
          <div
            key={val.id}
            className='max-h[4.375rem] flex items-center justify-between border-b-[0.0625rem] border-gray20	py-[1.75rem]'
          >
            <span className='text-black80 sm:text-[0.875rem] md:text-[1rem]'>{val.invitee.email}</span>
            <CancelInvite size='large' onClick={handleInvite} />
          </div>
        ))}
      </div>
    </div>
  );
}
