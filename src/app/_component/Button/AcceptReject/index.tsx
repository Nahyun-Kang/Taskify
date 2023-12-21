interface LoginProps {
  screen: 'desktop' | 'mobile' | 'tablet';
  onAccept: () => void;
  onReject: () => void;
}

export default function AcceptReject({ screen = 'desktop', onAccept, onReject }: LoginProps) {
  const screens = {
    desktop: {
      width: 'w-[5.25rem]',
      height: 'h-[2rem]',
      paddingY: 'py-[0.4375rem]',
      paddingX: 'px-[0.8125rem]',
      fontSize: 'text-[0.875rem]',
    },
    mobile: {
      width: 'w-[4.5rem]',
      height: 'h-[1.875rem]',
      paddingY: 'py-[0.375rem]',
      paddingX: 'px-[0.4375rem]',
      fontSize: 'text-[0.875rem]',
    },
    tablet: {
      width: 'w-[6.8125rem]',
      height: 'h-[1.75rem]',
      paddingY: 'py-[0.4375rem]',
      paddingX: 'px-[2.3125rem]',
      fontSize: 'text-[0.75rem]',
    },
  };
  const { width, height, paddingY, paddingX, fontSize } = screens[screen];
  return (
    <div className='flex flex-row gap-[0.625rem]'>
      <button
        className={`flex ${width} ${height} items-center justify-center gap-[0.625rem] rounded-[0.25rem] bg-violet ${paddingX} ${paddingY} ${fontSize} text-white disabled:bg-gray40`}
        onClick={onAccept}
      >
        수락
      </button>
      <button
        className={`flex ${width} ${height} items-center justify-center gap-[0.625rem] rounded-[0.25rem] border border-gray30 bg-white ${paddingX} ${paddingY} ${fontSize} text-violet disabled:bg-gray40`}
        onClick={onReject}
      >
        거절
      </button>
    </div>
  );
}
