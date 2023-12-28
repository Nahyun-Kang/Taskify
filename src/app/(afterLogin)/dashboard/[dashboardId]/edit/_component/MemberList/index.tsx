'use client';
import Delete from '@/src/app/_component/Button/Delete';
import PageNation from '@/src/app/_component/Button/PageNation';
import { useState } from 'react';
import DefaultProfile from '@/src/app/(afterLogin)/_component/DefaultProfile';

interface membersProps {
  id: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  isOwner: boolean;
}
const members = {
  members: [
    {
      id: 1,
      userId: 1,
      nickname: '윤대호',
      profileImageUrl: '',
      isOwner: true,
    },
    {
      id: 2,
      userId: 2,
      nickname: '구혜지',
      profileImageUrl: '',
      isOwner: false,
    },
    {
      id: 3,
      userId: 3,
      nickname: '고민혁',
      profileImageUrl:
        'https://github.com/Codeit-Part3-Team3/Taskify/assets/72487120/579aff92-5731-4f7e-9276-83a5b7ab6252',
      isOwner: false,
    },
    {
      id: 4,
      userId: 4,
      nickname: '강나현',
      profileImageUrl: '',
      isOwner: false,
    },
  ],
  totalCount: 8,
};

export default function MemberList() {
  const [isActiveBack, setIsActiveBack] = useState(false);
  const [isActiveForward, setIsActiveForward] = useState(false);
  const handlePageNation = () => {
    console.log(setIsActiveBack, setIsActiveForward);
  };
  const handleDelete = (userId: number) => {
    console.log(userId);
  };

  return (
    <div className='item-center flex w-full flex-col gap-[1.25rem] p-[1.75rem]'>
      <div className='flex w-full justify-between'>
        <p className='font-bold text-black sm:text-[1.25rem] md:text-[1.5rem]'>구성원</p>
        <div className='flex items-center gap-[1rem]'>
          <span className=' text-black80 sm:text-[0.75rem] md:text-[0.875rem]'>1 페이지 중 1</span>
          <PageNation
            size='large'
            isActiveBack={isActiveBack}
            isActiveForward={isActiveForward}
            onClickBack={handlePageNation}
            onClickForward={handlePageNation}
          />
        </div>
      </div>
      <div>
        <p className='text-[1rem] text-gray40 sm:text-[0.875rem]'>이름</p>
        {members.members.map((val: membersProps, index) => (
          <div
            key={val.id}
            className='max-h[4.375rem] flex items-center justify-between border-b-[0.0625rem] border-gray20	py-[1.75rem]'
          >
            <div className='flex items-center justify-center gap-[0.75rem]'>
              {val.profileImageUrl === '' ? (
                <DefaultProfile nickName={val.nickname} index={index} />
              ) : (
                <div
                  className={`flex items-center justify-center rounded-full font-mon text-[1rem] font-semibold text-white sm:h-[2.125rem] sm:w-[2.125rem]  sm:text-[0.875rem]  md:h-[2.375rem] md:w-[2.375rem] md:text-[1rem]`}
                  style={{ backgroundImage: `url(${val.profileImageUrl})`, backgroundSize: 'contain' }}
                ></div>
              )}
              <span className='text-black80 sm:text-[0.875rem] md:text-[1rem]'>{val.nickname}</span>
            </div>
            <Delete size='large' onClick={() => handleDelete(val.userId)} />
          </div>
        ))}
      </div>
    </div>
  );
}
