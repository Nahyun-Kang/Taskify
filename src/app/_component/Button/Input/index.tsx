interface InputProps {
  size: 'large' | 'small';
  onClick: () => void;
}
function Input({ size, onClick }: InputProps) {
  const sizes = {
    large: { width: 'w-[5.1875rem]', height: 'h-[2rem]', paddingY: 'py-[0.5625rem]' },
    small: { width: 'w-[84px]', height: 'h-[1.75rem]', paddingY: 'py-[0.4375rem]' },
  };
  const { width, height, paddingY } = sizes[size];
  return (
    <button
      className={`inline-flex items-center justify-center rounded-[0.25rem] border-gray30 bg-white px-[1.9375rem] ${paddingY} ${height} ${width} text-[0.75rem] text-violet`}
      onClick={onClick}
    >
      입력
    </button>
  );
}

export default Input;
