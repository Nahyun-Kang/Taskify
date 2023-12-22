import { ReactNode } from 'react';
import Header from './_component/Header';
import SideMenu from './_component/SideMenu';

export default function AfterLoginLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='flex bg-gray10'>
        <SideMenu />
        <div className='mt-[4.3125rem] flex-1'>{children}</div>
      </div>
      <Header />
    </>
  );
}
