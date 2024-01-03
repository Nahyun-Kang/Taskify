'use client';
interface DefaultProfileProps {
  nickName: string;
  index?: number;
  colorCode?: string;
  profileImg: string | null;
}

export default function HeaderProfile({ nickName, index, colorCode, profileImg }: DefaultProfileProps) {
  const profileColors = ['bg-[#C4B1A2]', 'bg-[#9DD7ED]', 'bg-[#FDD446]', 'bg-[#FFC85A]'];
  let background = 'bg-[#C4B1A2]';

  if (index !== undefined) {
    background = profileColors[index % profileColors.length];
  }
  if (colorCode !== undefined) {
    background = `bg-[${colorCode}]`;
  }

  return (
    <>
      {profileImg?.length ? (
        <div
          className={`h-[2.125rem] w-[2.125rem] rounded-full border-2 border-white md:h-[2.375rem] md:w-[2.375rem]`}
          style={{
            backgroundImage: `url(${profileImg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      ) : (
        <div
          className={`flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full md:h-[2.375rem] md:w-[2.375rem] ${background} border-2 border-white font-mon text-[1rem] font-semibold text-white`}
        >
          {nickName?.charAt(0)}
        </div>
      )}
    </>
  );
}
