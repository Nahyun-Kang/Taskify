import { STATUS } from '@/src/app/_constant/Chip';

interface TagProps {
  size: 'large' | 'small';
  content: string;
}

function Tag({ size, content }: TagProps) {
  const sizes = {
    small: 'text-[0.625rem]',
    large: 'text-[0.75rem]',
  };

  const colors = {
    [STATUS.PROJECT]: { bgColor: 'bg-orange10', color: 'text-orange20' },
    [STATUS.NORMAL]: { bgColor: 'bg-green10', color: 'text-green20' },
    [STATUS.BACKEND]: { bgColor: 'bg-pink10', color: 'text-pink20' },
    [STATUS.HIGH]: { bgColor: 'bg-blue10', color: 'text-blue20' },
  };

  const { bgColor, color } = colors[content] || colors[STATUS.PROJECT];
  const fontSize = sizes[size];

  return (
    <div
      className={`${bgColor} ${color} inline-flex items-center justify-center gap-[0.625rem] rounded-[0.25rem] px-[0.375rem] py-[0.25rem] ${fontSize}`}
    >
      {content}
    </div>
  );
}

export default Tag;
