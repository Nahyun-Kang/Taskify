import ellipse from '@/public/icons/status_ellipse.svg';
import Image from 'next/image';

interface StatusProps {
  size: 'large' | 'small';
  content: string;
}

export default function Status({ size, content }: StatusProps) {
  const fontSize = size === 'small' ? 'text-[0.625rem]' : 'text-[0.75rem]';
  return (
    <div
      className={`inline-flex items-center justify-center rounded-[0.6875rem] bg-violet8 px-[0.5rem] py-[0.25rem] ${fontSize} gap-[0.375rem] text-violet`}
    >
      <Image width={6} height={6} src={ellipse.src} alt='원형' />
      {content}
    </div>
  );
}
