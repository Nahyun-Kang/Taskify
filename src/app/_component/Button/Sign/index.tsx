interface LoginProps {
  size: 'large' | 'small' | 'free';
  isActive: boolean;
  content?: string;
  onClick: () => void;
}

export default function Sign({ size, isActive, content = '로그인', onClick }: LoginProps) {
  const sizes = {
    large: {
      width: 'w-[32.5rem]',
      height: 'h-[3.125rem]',
      paddingY: 'py-[0.875rem]',
      paddingX: 'px-[13.75rem]',
    },
    small: {
      width: 'w-[21.9375rem]',
      height: 'h-[3.125rem]',
      paddingY: 'py-[0.875rem]',
      paddingX: 'px-[8.375rem]',
    },
    free: {
      width: 'w-full',
      height: 'h-full',
      paddingY: 'py-[0.875rem]',
      paddingX: 'px-[8.375rem]',
    },
  };
  const { width, height, paddingY, paddingX } = sizes[size];
  return (
    <button
      className={`flex ${width} ${height} items-center justify-center gap-[0.625rem] rounded-[0.5rem] bg-violet ${paddingX} ${paddingY} text-[1.125rem] text-white disabled:bg-gray40`}
      disabled={!isActive}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
