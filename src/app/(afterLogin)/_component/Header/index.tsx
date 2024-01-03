'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';

import Crown from '@/src/app/_component/Icons/Crown';
import HeaderButton from '@/src/app/(afterLogin)/_component/Header/HeaderButton';
import add from '@/public/images/add_box_icon.svg';
import manage from '@/public/images/manage_icon.svg';
import ProfileCollection from '@/src/app/(afterLogin)/_component/ProfileImgCollection';
import useRenderModal from '@/src/app/_hook/useRenderModal';
import submitInvitation from '@/src/app/(afterLogin)/_util/submitInvitation';
import HeaderDropdown from '@/src/app/(afterLogin)/_component/Header/HeaderDropdown';
import { userInfoState } from '@/src/app/_recoil/AuthAtom';
import HeaderProfile from '@/src/app/(afterLogin)/_component/Header/HeaderProfile';
import { UserDataType } from '@/src/app/_constant/type';
import { dashboardSelector } from '@/src/app/_recoil/dashboardAtom';

export default function Header() {
  const pathname = usePathname();
  const isDisabledButtons = pathname === '/myboard' || pathname === '/mypage' || pathname === '/';
  const [ModalType, callModal, setModalType] = useRenderModal();
  const [folderName, setFolderName] = useState('');
  const [createdByMe, setCreatedByMe] = useState(false);
  const [isActiveDropdown, setActiveDropdown] = useState(false);
  const [userName, setUserName] = useState('');
  const [userProfileImg, setUserProfileImg] = useState<string | null>(null);
  const userInfo = useRecoilValue(userInfoState);

  const dashboardId = pathname.replace(/[^0-9]/g, '');
  const titleClass = !isDisabledButtons ? 'hidden lg:block' : '';
  const marginClass = isDisabledButtons ? 'ml-[5.6875rem]' : '';
  const selectDashboard = useRecoilValue(dashboardSelector(dashboardId));

  const getFolderName = (pathname: string) => {
    switch (pathname) {
      case '/myboard':
        setFolderName('내 대시보드');
        setCreatedByMe(false);
        break;
      case '/mypage':
        setFolderName('계정 관리');
        setCreatedByMe(false);
        break;
    }
  };

  const handlePopUpDropdown = () => {
    setActiveDropdown((prev) => !prev);
  };
  useEffect(() => {
    if (selectDashboard) {
      setFolderName(selectDashboard.title);
      setCreatedByMe(selectDashboard.createdByMe);
    }
    getFolderName(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, selectDashboard]);

  // 하이드레이션 워닝을 방지하기 위한 코드
  useEffect(() => {
    const userDataObject = localStorage.getItem('taskifyUserData');
    if (userDataObject) {
      const userData: UserDataType = JSON.parse(userDataObject);
      const nickname = userData?.userInfo?.nickname;
      const profileImg = userData?.userInfo?.profileImageUrl;
      setUserName(nickname);
      setUserProfileImg(profileImg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const handleInvitation = () => {
    callModal({ name: '초대하기', onSubmit: submitInvitation(dashboardId, setModalType) });
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
            {!isDisabledButtons && (
              <div className='flex gap-[.375rem] md:gap-4'>
                <Link href={`${pathname.includes('edit') ? pathname : pathname + '/edit'}`}>
                  <HeaderButton imageSrc={manage}>관리</HeaderButton>
                </Link>
                <HeaderButton imageSrc={add} onClick={handleInvitation}>
                  초대하기
                </HeaderButton>
              </div>
            )}
            {!isDisabledButtons && (
              <div className='ml-3 mr-[3.75rem] md:ml-6 md:mr-[5.25rem] lg:ml-8 lg:mr-[9.5rem]'>
                <ProfileCollection dashboardId={dashboardId} userId={userInfo.id} />
              </div>
            )}
            {!isDisabledButtons && (
              <div className=' mr-3 h-[2.375rem] w-0 rounded-md border-[.0625rem] stroke-gray30 stroke-1 md:mr-6 lg:mr-8'></div>
            )}
            <div
              className='relative mr-3 flex cursor-pointer items-center gap-3 md:mr-10 lg:mr-20'
              onClick={handlePopUpDropdown}
            >
              <HeaderProfile nickName={userName} profileImg={userProfileImg} />
              <div className='text-1 text-black30 hidden font-medium md:block'>{userName}</div>
            </div>
          </div>
        </div>
      </div>
      {ModalType}
      {isActiveDropdown && <HeaderDropdown isActive={isActiveDropdown} onClick={handlePopUpDropdown} />}
    </div>
  );
}
