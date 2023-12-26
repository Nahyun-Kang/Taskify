import { ReactNode } from 'react';
import Header from './_component/Header';
import SideMenu from './_component/SideMenu';

export default function AfterLoginLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <SideMenu />
      <div className='flex pl-[4.1875rem] md:pl-[10rem] lg:pl-[18.75rem]'>{children}</div>
    </>
  );
}
