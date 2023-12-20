import addIcon from '@/public/icons/add_icon.svg';
import Image from 'next/image';

interface AddProps {
  size: 'large' | 'small';
}

export default function Add({ size }: AddProps) {
  const divSize = size === 'small' ? 'w-[1.25rem] h-[1.25rem]' : 'w-[1.375rem] h-[1.375rem]';
  const imageSize = size === 'small' ? 14.545 : 16;

  return (
    <div className={`flex ${divSize} shrink-0 items-center justify-center rounded-[0.25rem] bg-violet8 p-[0.1875rem]`}>
      <Image width={imageSize} height={imageSize} src={addIcon.src} alt='추가' />
    </div>
  );
}
