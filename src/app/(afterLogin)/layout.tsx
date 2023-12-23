import { ReactNode } from 'react';

export default function AfterLoginLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <div className='flex'> */}
      {/* <SideMenu /> */}
      {children}
      {/* </div> */}
      {/* <Header /> */}
    </>
  );
}
