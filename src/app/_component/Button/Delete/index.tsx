interface DeleteProps {
  size: 'large' | 'small';
  onClick: () => void;
}
export default function Delete({ size, onClick }: DeleteProps) {
  const sizes = {
    large: { width: 'w-[5.25rem]', height: 'h-[2rem]', paddingY: 'py-[0.4375rem]', paddingX: 'px-[1.8125rem]' },
    small: { width: 'w-[3.25rem]', height: 'h-[1.75rem]', paddingY: 'py-[0.4375rem]', paddingX: 'px-[0.5625rem]' },
  };
  const { width, height, paddingY, paddingX } = sizes[size];
  return (
    <button
      className={`flex items-center justify-center rounded-[0.25rem] border border-gray30 bg-white ${paddingX} ${paddingY} ${height} ${width} text-[0.8125rem] text-violet`}
      onClick={onClick}
    >
      삭제
    </button>
  );
}
