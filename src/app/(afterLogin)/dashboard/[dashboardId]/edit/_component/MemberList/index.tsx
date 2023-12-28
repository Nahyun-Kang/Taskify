'use client';
import Delete from '@/src/app/_component/Button/Delete';
import PageNation from '@/src/app/_component/Button/PageNation';
import { useEffect, useState } from 'react';
import DefaultProfile from '@/src/app/(afterLogin)/_component/DefaultProfile';
import { getMembers } from '@/src/app/_api/Dashboards';

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

  const handlePageNation = (direction: 'back' | 'forward') => {
    if (direction === 'back') {
      setPage((prevPage) => prevPage - 1);
    } else if (direction === 'forward') {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleDelete = (userId: number) => {
    console.log(userId);
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
  }, [page, dashboardId]);

  return (
    <div className='item-center flex w-full flex-col gap-[1.25rem] p-[1.75rem]'>
      <div className='flex w-full justify-between'>
        <p className='font-bold text-black sm:text-[1.25rem] md:text-[1.5rem]'>구성원</p>
        <div className='flex items-center gap-[1rem]'>
          <span className=' text-black80 sm:text-[0.75rem] md:text-[0.875rem]'>
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
              className='max-h[4.375rem] flex items-center justify-between border-b-[0.0625rem] border-gray20	py-[1.75rem]'
            >
              <div className='flex items-center justify-center gap-[0.75rem]'>
                {val.profileImageUrl === null ? (
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
