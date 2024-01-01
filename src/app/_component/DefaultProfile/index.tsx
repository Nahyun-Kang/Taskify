interface DefaultProfileProps {
  nickName: string;
  index?: number;
  colorCode?: string;
}

export default function DefaultProfile({ nickName, index, colorCode }: DefaultProfileProps) {
  const profileColors = ['bg-[#C4B1A2]', 'bg-[#9DD7ED]', 'bg-[#FDD446]', 'bg-[#FFC85A]'];
  let background = 'bg-[#C4B1A2]';

  if (index !== undefined) {
    background = profileColors[index % profileColors.length];
  }
  if (colorCode !== undefined) {
    background = `bg-[${colorCode}]`;
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full sm:h-[2.125rem] sm:w-[2.125rem] sm:text-[0.875rem] md:h-[2.375rem] md:w-[2.375rem] md:text-[1rem] ${background} font-mon  text-[1rem] font-semibold text-white`}
    >
      {nickName?.charAt(0)}
    </div>
  );
}
