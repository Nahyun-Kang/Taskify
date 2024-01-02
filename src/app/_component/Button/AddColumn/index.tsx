import Add from '@/src/app/_component/Chip/Add';
interface AddColumnProps {
  screen: 'desktop' | 'mobile' | 'tablet' | 'free';
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  id: string;
}

export default function AddColumn({ screen = 'desktop', onClick, id }: AddColumnProps) {
  const screens = {
    desktop: {
      width: 'w-[22.125rem]',
      height: 'h-[4.375rem]',
      fontSize: 'text-[1.125rem]',
    },
    mobile: {
      width: 'w-full',
      height: 'h-full',
      fontSize: 'text-[1rem]',
    },
    tablet: {
      width: 'w-[34rem]',
      height: 'h-[4.375rem]',
      fontSize: 'text-[1.125rem]',
    },
    free: {
      width: 'w-full',
      height: 'h-full',
      fontSize: 'text-[1.125rem]',
    },
  };
  const { width, height, fontSize } = screens[screen];
  const iconSize = screen === 'mobile' ? 'small' : 'large';
  return (
    <button
      className={`flex ${width} ${height} items-center justify-center gap-[0.75rem] rounded-[0.25rem] bg-white ${fontSize} border border-gray30 font-bold text-black80`}
      onClick={onClick}
      id={id}
    >
      새로운 컬럼 추가하기
      <Add size={iconSize} />
    </button>
  );
}
