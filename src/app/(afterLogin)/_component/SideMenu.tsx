import Link from 'next/link';
import Image from 'next/image';

import textLogo from '@/public/logo/logo_text_only.svg';
import smallLogo from '@/public/logo/nav_lgoo_small.svg';
import addIcon from '@/public/images/add_box_icon.svg';

export default function SideMenu() {
  return (
    <div className='relative'>
      <div className='h-screen w-[4.1875rem] bg-white pl-[1.375rem] pr-[1.335rem] pt-[1.1875rem] sm:w-[10rem] md:w-[18.75rem]'>
        <Link href='/myboard'>
          <div className='mb-[3.7456rem] flex items-center'>
            <Image src={smallLogo} alt='로고' className='h-[33.069px] w-[1.8009rem] sm:flex-shrink-0' />
            <Image src={textLogo} alt='텍스트 로고' className='hidden sm:block' />
          </div>
          <div className='flex items-center justify-between'>
            <div className='hidden text-[.75rem] font-bold text-gray50 sm:block'>Dash Board</div>
            <Image src={addIcon} alt='대시보드 추가 버튼' className='h-[1.25rem] w-[1.25rem]' />
          </div>
        </Link>
      </div>
    </div>
  );
}
