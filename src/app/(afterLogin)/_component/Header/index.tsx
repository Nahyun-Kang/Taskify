'use client';
import { usePathname } from 'next/navigation';

import Crown from '@/src/app/_component/Icons/Crown';
import HeaderButton from './HeaderButton';
import add from '@/public/images/add_box_icon.svg';
import manage from '@/public/images/manage_icon.svg';
import ProfileCollection from '../ProfileImgCollection';

const DUMMY = {
  folder: '강나현의 대시보드',
  userName: '강나현',
  profile: 'K',
};

export default function Header() {
  const pathname = usePathname();
  const isMyDashboard = pathname === '/mydashboard';

  const titleClass = !isMyDashboard ? 'hidden lg:block' : '';
  const crownClass = !isMyDashboard ? 'lg:block' : '';
  const folderName = isMyDashboard ? '내 대시보드' : DUMMY.folder;

  return (
    <div className='relative'>
      <div className='fixed left-0 right-0 top-0 h-[4.375rem] border-b-[.0625rem] bg-white'>
        <div className=' flex h-full items-center justify-between'>
          {/* 헤더영역 왼쪽 */}
          <div className='ml-[5.6875rem] justify-end md:ml-[12.5rem] lg:ml-[21.25rem]'>
            <div className='flex items-center gap-2'>
              <div className={`text-black30 text-xl font-bold ${titleClass}`}>{folderName}</div>
              <Crown className={`hidden ${crownClass}`} />
            </div>
          </div>
          {/* 헤더영역 오른쪽 */}
          <div className='flex'>
            {!isMyDashboard && (
              <div className='flex gap-[.375rem] md:gap-4'>
                <HeaderButton imageSrc={manage}>관리</HeaderButton>
                <HeaderButton imageSrc={add}>초대하기</HeaderButton>
              </div>
            )}
            {!isMyDashboard && (
              <div className='ml-3 mr-[3.75rem] md:ml-6 md:mr-[5.25rem] lg:ml-8 lg:mr-[9.5rem]'>
                <ProfileCollection />
              </div>
            )}
            {!isMyDashboard && (
              <div className=' mr-3 h-[2.375rem] w-0 rounded-md border-[.0625rem] stroke-gray30 stroke-1 md:mr-6 lg:mr-8'></div>
            )}
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
