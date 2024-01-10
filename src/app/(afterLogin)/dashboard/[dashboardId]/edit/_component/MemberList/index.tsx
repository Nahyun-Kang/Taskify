'use client';
import Delete from '@/src/app/_component/Button/Delete';
import PageNation from '@/src/app/_component/Button/PageNation';
import { useEffect, useState } from 'react';
import { deleteMember, getMembers } from '@/src/app/_api/Dashboards';
import crown from '@/public/images/crown_icon.svg';
import Image from 'next/image';
import ProfileImageContainer from '@/src/app/(afterLogin)/_component/ProfileImage/ProfileImageContainer';
import ProfileImage from '@/src/app/(afterLogin)/_component/ProfileImage';

interface membersProps {
  id: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  isOwner: boolean;
}

export default function MemberList({ dashboardId }: { dashboardId: string | undefined }) {
  const [memberList, setMemberList] = useState([]);
  const [isActiveBack, setIsActiveBack] = useState(false);
  const [isActiveForward, setIsActiveForward] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isChange, setIsChange] = useState(false);

  const handlePageNation = (direction: 'back' | 'forward') => {
    if (direction === 'back') {
      setPage((prevPage) => prevPage - 1);
    } else if (direction === 'forward') {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleDelete = (memberId: number) => {
    deleteMember(memberId, setIsChange);
  };

  useEffect(() => {
    const getMemberList = async (page: number, pageSize: number) => {
      const result = await getMembers(dashboardId, page, pageSize);
      if (result) {
        setIsActiveBack(page > 1);
        setIsActiveForward(result.totalCount > page * pageSize);

        setMemberList(result.members);
        setTotalPage(Math.ceil(result.totalCount / pageSize));
      }
    };
    getMemberList(page, 4);
  }, [page, dashboardId, isChange]);

  return (
    <div className='item-center flex w-full flex-col gap-[1.25rem] rounded-lg bg-white p-[1.75rem] dark:bg-black90'>
      <div className='flex w-full justify-between'>
        <p className='font-bold sm:text-[1.25rem] md:text-[1.5rem]'>구성원</p>
        <div className='flex items-center gap-[1rem]'>
          <span className=' text-black80 dark:text-gray35 sm:text-[0.75rem] md:text-[0.875rem]'>
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
      </div>
      <div>
        <p className='text-[1rem] text-gray40 sm:text-[0.875rem]'>이름</p>
        {memberList &&
          memberList.map((val: membersProps, index) => (
            <div
              key={val.id}
              className={`max-h[4.375rem] flex items-center justify-between  border-gray20	py-[1.75rem] ${
                memberList.length !== index + 1 ? 'border-b-[0.0625rem] dark:border-black60' : ''
              }`}
            >
              <div className='flex items-center justify-center gap-[0.75rem]'>
                <ProfileImageContainer userId={val.userId} size='large'>
                  <ProfileImage profileImageUrl={val.profileImageUrl} nickname={val.nickname} />
                </ProfileImageContainer>
                <span className='text-black80 dark:text-white8 sm:text-[0.875rem] md:text-[1rem] '>{val.nickname}</span>
              </div>
              {val.isOwner ? (
                <div className='flex h-[2rem] w-[5.25rem] items-center justify-center'>
                  <Image width={30} height={30} src={crown} alt='왕관' />
                </div>
              ) : (
                <Delete size='large' onClick={() => handleDelete(val.id)} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
