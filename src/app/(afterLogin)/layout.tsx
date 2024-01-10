'use client';
import { ReactNode } from 'react';
import Header from '@/src/app/(afterLogin)/_component/Header';
import SideMenu from '@/src/app/(afterLogin)/_component/SideMenu';
import { useSetRecoilState } from 'recoil';
import { dropdownState } from '../_recoil/Dropdown';
import { Toaster } from 'react-hot-toast';

export default function AfterLoginLayout({ children }: { children: ReactNode }) {
  const setIsActiveDropdown = useSetRecoilState(dropdownState);
  return (
    <div
      onClick={() => {
        setIsActiveDropdown(false);
      }}
    >
      <Toaster position='top-center' reverseOrder={false} />
      <Header />
      <SideMenu />
      <div className='flex min-h-screen bg-gray10 pl-[4.1875rem] dark:bg-black md:pl-[10rem] lg:pl-[18.75rem]'>
        {children}
      </div>
    </div>
  );
}
