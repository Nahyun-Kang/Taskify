import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import arrowBack from '@/public/icons/arrow_backward_icon.svg';

export default function EditLayout({ children, dashboardId = '' }: { children: ReactElement; dashboardId?: string }) {
  const href = dashboardId === '' ? '/myboard' : `/dashboard/${dashboardId}`;
  return (
    <div className='mt-[4.375rem] w-full px-3 pt-4 md:p-5'>
      <Link href={href} className='mb-5 flex w-fit items-center gap-[0.375rem] text-black'>
        <Image src={arrowBack} alt='대시보드로 돌아가기' />
        돌아가기
      </Link>
      {children}
    </div>
  );
}
