interface DeleteDashboardProps {
  screen: 'desktop' | 'mobile' | 'tablet' | 'free';
  onClick: () => void;
}

export default function DeleteDashboard({ screen = 'desktop', onClick }: DeleteDashboardProps) {
  const screens = {
    desktop: {
      width: 'w-[20rem]',
      height: 'h-[3.875rem]',
      paddingY: 'py-[1.25rem]',
      paddingX: 'px-[4.9375rem]',
      fontSize: 'text-[1.125rem]',
    },
    mobile: {
      width: 'w-[20rem]',
      height: 'h-[3.875rem]',
      paddingY: 'py-[1.25rem]',
      paddingX: 'px-[4.9375rem]',
      fontSize: 'text-[1.125rem]',
    },
    tablet: {
      width: 'w-[17.75rem]',
      height: 'h-[3.25rem]',
      paddingY: 'py-[1rem]',
      paddingX: 'px-[4.25rem]',
      fontSize: 'text-[1rem]',
    },
    free: {
      width: 'w-full',
      height: 'h-full',
      paddingY: 'py-[1.25rem]',
      paddingX: 'px-[4.9375rem]',
      fontSize: 'text-[1.125rem]',
    },
  };
  const { width, height, fontSize, paddingX, paddingY } = screens[screen];

  return (
    <button
      className={`flex ${width} ${height} items-center justify-center rounded-[0.5rem] bg-gray10 ${fontSize} border border-gray30 font-medium text-black80 ${paddingX} ${paddingY}`}
      onClick={onClick}
    >
      대시보드 삭제하기
    </button>
  );
}
