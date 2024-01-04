import arrow from '@/public/icons/arrow_forward_icon.svg';
import crown from '@/public/icons/crown_icon.svg';
import IdxIcon from '@/src/app/(afterLogin)/_component/Icons/IdxIcon';
import Image from 'next/image';
import Link from 'next/link';
interface CardDashboardProps {
  screen: 'desktop' | 'mobile' | 'tablet' | 'free';
  title: string;
  color: string;
  createdByMe: boolean;
  id: number;
}

export default function CardDashboard({ screen = 'desktop', title, color, createdByMe, id }: CardDashboardProps) {
  const screens = {
    desktop: {
      width: 'w-[20.75rem]',
      height: 'h-[4.375rem]',
      fontSize: 'text-[1.125rem]',
      image: {
        width: 20,
        height: 16,
      },
    },
    mobile: {
      width: 'w-full',
      height: 'h-[3.875rem]',
      fontSize: 'text-[1.125rem]',
      image: {
        width: 18,
        height: 14,
      },
    },
    tablet: {
      width: 'w-[15.4375rem]',
      height: 'h-[4.25rem]',
      fontSize: 'text-[1rem]',
      image: {
        width: 15,
        height: 12,
      },
    },
    free: {
      width: 'w-full',
      height: 'h-full',
      fontSize: 'text-[1.125rem]',
      image: {
        width: 20,
        height: 16,
      },
    },
  };

  const { width, height, fontSize, image } = screens[screen];

  return (
    <Link href={`/dashboard/${id}`} className={`${width} ${height} flex truncate`}>
      <div
        className={`flex ${width} ${height} items-center rounded-[0.5rem] bg-white ${fontSize} border border-gray30 p-[1.875rem] font-semibold text-black80  md:p-[1.875rem]`}
      >
        <IdxIcon color={color} className='mr-[0.75rem] block h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-[0.25rem]' />
        <span className='truncate'>{title}</span>

        {createdByMe && (
          <Image className='ml-[0.5rem]' width={image.width} height={image.height} src={crown.src} alt='왕관 아이콘' />
        )}
        <Image className='ml-auto' width={18} height={18} src={arrow.src} alt='화살표' />
      </div>
    </Link>
  );
}
