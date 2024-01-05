import Link from 'next/link';
import { ReactElement } from 'react';
import ArrowBack from '@/src/app/_component/Icons/ArrowBack';

export default function EditLayout({ children, dashboardId = '' }: { children: ReactElement; dashboardId?: string }) {
  const href = dashboardId === '' ? '/myboard' : `/dashboard/${dashboardId}`;
  return (
    <div className='mt-[4.375rem] w-full px-3 pt-4 dark:bg-black dark:text-white8 md:p-5'>
      <Link href={href} className='mb-5 flex w-fit items-center gap-[0.375rem]'>
        <ArrowBack />
        돌아가기
      </Link>
      {children}
    </div>
  );
}
