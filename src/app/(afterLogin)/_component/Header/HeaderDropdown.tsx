'use client';
import { accessTokenState, userInfoState } from '@/src/app/_recoil/AuthAtom';
import { useRouter } from 'next/navigation';
import { useResetRecoilState } from 'recoil';

interface Props {
  isActive: boolean;
  onClick: () => void;
}

export default function HeaderDropdown({ isActive, onClick }: Props) {
  const router = useRouter();
  const setUserInfoState = useResetRecoilState(userInfoState);
  const setAccessToken = useResetRecoilState(accessTokenState);
  const buttonClass = 'h-[1.875rem] w-full rounded text-[.875rem] text-black80 hover:bg-violet8 hover:text-violet';

  const handleClickLogOut = () => {
    setUserInfoState();
    setAccessToken();
    localStorage.removeItem('taskifyUserData');
    router.push('/');
    onClick();
  };
  const handleClickManageAccount = () => {
    router.push('/mypage');
    onClick();
  };

  return (
    <div
      className={`transform ${
        isActive ? 'translate-y-0.5' : 'invisible translate-y-0'
      } absolute right-5 top-[3.75rem] flex h-[4.625rem] w-[5.25rem] flex-col items-center gap-1 rounded border border-solid border-gray30 bg-white p-[.375rem] shadow-lg duration-500 ease-in-out md:right-10 lg:right-20`}
    >
      <button className={`${buttonClass}`} onClick={handleClickManageAccount}>
        계정관리
      </button>
      <button className={`${buttonClass}`} onClick={handleClickLogOut}>
        로그아웃
      </button>
    </div>
  );
}
