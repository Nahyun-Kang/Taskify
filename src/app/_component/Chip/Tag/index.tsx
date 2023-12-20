import { TAG } from '@/src/app/_constant/Chip';

interface TagProps {
  size: 'large' | 'small';
  content: string;
}

export default function Tag({ size, content }: TagProps) {
  const sizes = {
    small: 'text-[0.625rem]',
    large: 'text-[0.75rem]',
  };

  const colors = {
    [TAG.PROJECT]: { bgColor: 'bg-orange10', color: 'text-orange20' },
    [TAG.NORMAL]: { bgColor: 'bg-green10', color: 'text-green20' },
    [TAG.BACKEND]: { bgColor: 'bg-pink10', color: 'text-pink20' },
    [TAG.HIGH]: { bgColor: 'bg-blue10', color: 'text-blue20' },
  };

  const { bgColor, color } = colors[content] || colors[TAG.PROJECT];
  const fontSize = sizes[size];

  return (
    <div
      className={`${bgColor} ${color} inline-flex items-center justify-center gap-[0.625rem] rounded-[0.25rem] px-[0.375rem] py-[0.25rem] ${fontSize}`}
    >
      {content}
    </div>
  );
}
