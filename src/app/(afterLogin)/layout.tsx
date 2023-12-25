import { ReactNode } from 'react';
import Header from './_component/Header';
import SideMenu from './_component/SideMenu';

export default function AfterLoginLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='flex'>
        <SideMenu />
        {children}
      </div>
      <Header />
    </>
  );
}
