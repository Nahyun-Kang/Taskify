'use client';
import ProfileImage from '@/src/app/(afterLogin)/_component/ProfileImage';
import ProfileImageContainer from '@/src/app/(afterLogin)/_component/ProfileImage/ProfileImageContainer';

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
          <ProfileImageContainer userId={assignee.id} size='large'>
            <ProfileImage profileImageUrl={assignee.profileImageUrl} nickname={assignee.nickname} />
          </ProfileImageContainer>
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
