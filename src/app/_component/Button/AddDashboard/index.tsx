import Add from '@/src/app/_component/Chip/Add';
interface AddDashboardProps {
  screen: 'desktop' | 'mobile' | 'tablet' | 'free';
  onClick: () => void;
}

export default function AddDashboard({ screen = 'desktop', onClick }: AddDashboardProps) {
  const screens = {
    desktop: {
      width: 'w-[20.75rem]',
      height: 'h-[4.375rem]',
      fontSize: 'text-[1rem]',
    },
    mobile: {
      width: 'w-full',
      height: 'h-[3.625rem]',
      fontSize: 'text-[0.875rem]',
    },
    tablet: {
      width: 'w-[15.4375rem]',
      height: 'h-[4.25rem]',
      fontSize: 'text-[1rem]',
    },
    free: {
      width: 'w-full',
      height: 'h-full',
      fontSize: 'text-[1rem]',
    },
  };
  const { width, height, fontSize } = screens[screen];
  const iconSize = screen === 'mobile' ? 'small' : 'large';
  return (
    <button
      className={`flex ${width} ${height} items-center justify-center gap-[0.75rem] rounded-[0.5rem] bg-white ${fontSize} border border-gray30 font-semibold text-black80`}
      onClick={onClick}
    >
      새로운 대시보드
      <Add size={iconSize} />
    </button>
  );
}
