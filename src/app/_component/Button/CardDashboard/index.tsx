import crown from '@/public/icons/crown_icon.svg';
import arrow from '@/public/icons/arrow_forward_icon.svg';
import Image from 'next/image';
interface CardDashboardProps {
  screen: 'desktop' | 'mobile' | 'tablet';
  title: string;
  color: string;
  createdByMe: boolean;
  onClick: () => void;
}

export default function CardDashboard({ screen = 'desktop', title, color, createdByMe, onClick }: CardDashboardProps) {
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
  };

  const { width, height, fontSize, image } = screens[screen];
  const circleColor = `bg-[${color}]`;

  return (
    <button
      className={`flex ${width} ${height} items-center justify-between rounded-[0.5rem] bg-white ${fontSize} border border-gray30 p-[1.875rem] font-semibold text-black80`}
      onClick={onClick}
    >
      <div className=' flex items-center justify-center'>
        <div className={`mr-[0.75rem] h-[0.5rem] w-[0.5rem] rounded-[0.25rem] ${circleColor}`} />
        {title}
        {createdByMe && (
          <Image className='ml-[0.5rem]' width={image.width} height={image.height} src={crown.src} alt='왕관' />
        )}
      </div>
      <Image width={18} height={18} src={arrow.src} alt='화살표' />
    </button>
  );
}
