import Add from '@/src/app/_component/Chip/Add';
interface AddTodoProps {
  screen: 'desktop' | 'mobile' | 'tablet' | 'free';
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function AddTodo({ screen = 'desktop', onClick }: AddTodoProps) {
  const screens = {
    desktop: {
      height: 'h-[2.5rem]',
    },
    mobile: {
      height: 'h-full',
    },
    tablet: {
      height: 'h-[2.5rem]',
    },
    free: {
      height: 'h-full',
    },
  };
  const { height } = screens[screen];
  const iconSize = screen === 'mobile' ? 'small' : 'large';
  return (
    <button
      className={`flex w-full ${height} items-center justify-center rounded-[0.375rem] border border-gray30 bg-white font-semibold text-black80`}
      onClick={onClick}
    >
      <Add size={iconSize} />
    </button>
  );
}
