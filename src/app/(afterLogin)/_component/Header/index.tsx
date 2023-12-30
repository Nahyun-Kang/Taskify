'use client';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';

import Crown from '@/src/app/_component/Icons/Crown';
import HeaderButton from './HeaderButton';
import add from '@/public/images/add_box_icon.svg';
import manage from '@/public/images/manage_icon.svg';
import ProfileCollection from '../ProfileImgCollection';
import useRenderModal from '@/src/app/_hook/useRenderModal';
import submitInvitation from '../../_util/submitInvitation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import HeaderDropdown from './HeaderDropdown';
import { userInfoState } from '@/src/app/_recoil/AuthAtom';
import HeaderProfile from '@/src/app/(afterLogin)/_component/Header/HeaderProfile';

export default function Header() {
  const pathname = usePathname();
  const isMyDashboard = pathname === '/myboard';
  const [ModalType, callModal] = useRenderModal();
  const [folderName, setFolderName] = useState('');
  const [createdByMe, setCreatedByMe] = useState(false);
  const [isActiveDropdown, setActiveDropdown] = useState(false);
  const userInfo = useRecoilValue(userInfoState);

  const dashboardId = pathname.replace(/[^0-9]/g, '');
  const titleClass = !isMyDashboard ? 'hidden lg:block' : '';
  const marginClass = isMyDashboard ? 'ml-[5.6875rem]' : '';

  const getFolderName = async () => {
    if (isMyDashboard) {
      setFolderName('내 대시보드');
      setCreatedByMe(false);
    } else {
      const id = pathname.replace('dashboard/', '');
      const { data } = await axiosInstance.get(`dashboards${id}`);
      setFolderName(data?.title);
      setCreatedByMe(data?.createdByMe);
    }
  };

  const handlePopUpDropdown = () => {
    setActiveDropdown((prev) => !prev);
  };

  const userData = localStorage.getItem('taskifyUserData');
  console.log(userData);

  useEffect(() => {
    getFolderName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleInvitation = () => {
    callModal({ name: '초대하기', onSubmit: submitInvitation(dashboardId) });
  };

  return (
    <div className='relative z-10'>
      <div className='fixed left-0 right-0 top-0 h-[4.375rem] border-b-[.0625rem] bg-white'>
        <div className=' flex h-full items-center justify-between'>
          {/* 헤더영역 왼쪽 */}
          <div className={`${marginClass} justify-end md:ml-[12.5rem] lg:ml-[21.25rem]`}>
            <div className='flex items-center gap-2'>
              <div className={`text-black30 text-xl font-bold ${titleClass}`}>{folderName}</div>
              {createdByMe && <Crown className='hidden lg:block' />}
            </div>
          </div>
          {/* 헤더영역 오른쪽 */}
          <div className='flex'>
            {!isMyDashboard && (
              <div className='flex gap-[.375rem] md:gap-4'>
                <Link href={`${pathname.includes('edit') ? pathname : pathname + '/edit'}`}>
                  <HeaderButton imageSrc={manage}>관리</HeaderButton>
                </Link>
                <HeaderButton imageSrc={add} onClick={handleInvitation}>
                  초대하기
                </HeaderButton>
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
            <div
              className='relative mr-3 flex cursor-pointer items-center gap-3 md:mr-10 lg:mr-20'
              onClick={handlePopUpDropdown}
            >
              <HeaderProfile nickName={userInfo.nickname} profileImg={userInfo.profileImageUrl} />
              <div className='text-1 text-black30 hidden font-medium md:block'>{userInfo.nickname}</div>
            </div>
          </div>
        </div>
      </div>
      {ModalType}
      {isActiveDropdown && <HeaderDropdown isActive={isActiveDropdown} />}
    </div>
  );
}
