'use client';

import Crown from '@/src/app/_component/Icons/Crown';
import HeaderButton from './HeaderButton';
import add from '@/public/images/add_box_icon.svg';
import manage from '@/public/images/manage_icon.svg';

const DUMMY = {
  folder: '강나현의 대시보드',
  userName: '강나현',
  profile: 'K',
};

export default function Header() {
  return (
    <div className='relative'>
      <div className='fixed left-0 right-0 top-0 h-[4.375rem] border-b-[.0625rem] bg-white'>
        <div className='mx-auto my-0 flex h-full w-full items-center justify-between'>
          {/* 헤더영역 왼쪽 */}
          <div className='ml-0 justify-end lg:ml-[21.25rem]'>
            <div className='flex items-center gap-2'>
              <div className='text-black30 hidden text-xl font-bold lg:block'>{DUMMY.folder}</div>
              <Crown className='hidden lg:block' />
            </div>
          </div>
          {/* 헤더영역 오른쪽 */}
          <div className='grow-1 flex'>
            <div className='flex gap-[.375rem] md:gap-4'>
              <HeaderButton imageSrc={manage}>관리</HeaderButton>
              <HeaderButton imageSrc={add}>초대하기</HeaderButton>
            </div>
            <div className='ml-4 md:ml-4'>프로필 영역</div>
            <div className='ml-4 mr-3 h-[2.375rem] w-0 rounded-md border-[.0625rem] stroke-gray30 stroke-1 md:ml-8 md:mr-6 lg:ml-10 lg:mr-8'></div>
            <div className='relative mr-3 flex items-center gap-3 md:mr-10 lg:mr-20'>
              <div className='flex items-center justify-center'>
                <div className='h-[2.375rem] w-[2.375rem] rounded-full border-2 border-white bg-[#A3C4A2] '></div>
                <div className='text-1 absolute font-mon font-bold text-white'>{DUMMY.profile}</div>
              </div>
              <div className='text-1 text-black30 hidden font-medium md:block'>{DUMMY.userName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
