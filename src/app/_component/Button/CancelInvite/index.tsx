interface CancelInviteProps {
  size: 'large' | 'small';
  onClick: () => void;
}
export default function CancelInvite({ size, onClick }: CancelInviteProps) {
  const sizes = {
    large: { width: 'w-[5.25rem]', height: 'h-[2rem]', paddingY: 'py-[0.4375rem]', paddingX: 'px-[0.75rem]' },
    small: { width: 'w-[3.25rem]', height: 'h-[1.75rem]', paddingY: 'py-[0.4375rem]', paddingX: 'px-[0.5625rem]' },
  };
  const { width, height, paddingY, paddingX } = sizes[size];
  return (
    <button
      className={`flex items-center justify-center rounded-[0.25rem] border border-gray30 bg-white ${paddingX} ${paddingY} ${height} ${width} text-nowrap text-[0.8125rem] text-violet dark:border-black60 dark:bg-black60 dark:text-white8`}
      onClick={onClick}
    >
      취소
    </button>
  );
}
