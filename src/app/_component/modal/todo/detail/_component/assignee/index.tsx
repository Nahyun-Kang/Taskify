'use client';
import Image from 'next/image';
import DefaultProfile from '@/src/app/_component/DefaultProfile';

interface DetailAssignee {
  assignee: { profileImageUrl: string; nickname: string; id: number };
  dueDate: string;
}

export default function Assignee({ assignee, dueDate }: DetailAssignee) {
  return (
    <div className=' mb-4 h-fit rounded-[0.5rem] border border-gray30 p-[1rem] sm:flex sm:w-[100%] sm:items-center sm:justify-between md:flex md:w-[11.25rem] md:flex-col md:items-start md:justify-start md:gap-[1.25rem] lg:w-[12.5rem]'>
      <div className='flex flex-col gap-[0.375rem]'>
        <span className='text-[0.75rem] font-semibold leading-5'>담당자</span>
        <div className='flex items-center  gap-[0.3125rem]'>
          {assignee?.profileImageUrl ? (
            <div className='relative rounded-full border sm:h-[2.125rem] sm:w-[2.125rem] sm:text-[0.875rem] md:h-[2.375rem] md:w-[2.375rem]'>
              <Image src={assignee.profileImageUrl} fill alt='담당자 프로필' priority style={{ borderRadius: '50%' }} />
            </div>
          ) : (
            <DefaultProfile nickName={assignee?.nickname} index={assignee?.id as number} />
          )}
          <span>{assignee?.nickname}</span>
        </div>
      </div>
      <div className='flex flex-col gap-[0.375rem]'>
        <span className='text-[0.75rem] font-semibold leading-5'>마감일</span>
        <span>{dueDate}</span>
      </div>
    </div>
  );
}
