'use client';

import settingIcon from '@/public/icons/settings_icon.svg';
import Card from '@/src/app/(afterLogin)/_component/Card';
import AddTodo from '@/src/app/_component/Button/AddTodo';
import Number from '@/src/app/_component/Chip/Number';
import Image from 'next/image';

interface CardListProps {
  title: string;
  cursorId: number;
  totalCount: number;
  cards: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    dueDate: string;
    assignee: {
      profileImageUrl: string;
      nickname: string;
      id: number;
    };
    imageUrl: string;
    teamId: string;
    columnId: number;
    createdAt: string;
    updatedAt: string;
  }[];
  onClick: () => void;
  onSubmit: () => void;
}

const mockColors: { [key: string]: string } = {
  1: 'bg-[#86D549]',
  2: 'bg-[#ff7f50]',
  3: 'bg-[#5534DA]',
};

export default function CardList({ cards, totalCount, title, onClick }: CardListProps) {
  return (
    <div className='border-gray-20 md:min-w-none flex flex-1 flex-col gap-[1.0625rem] rounded-[0.375rem] border-b bg-gray10 px-3 py-4 md:gap-[1.5625rem] md:p-5 lg:min-h-screen lg:min-w-[22.125rem] lg:flex-col lg:border-b-0 lg:border-r'>
      <div className='flex items-center gap-2'>
        <span
          className={`flex h-2 w-2 items-center justify-center rounded-3xl bg-violet text-[0.75rem] text-white`}
        ></span>
        <div className='flex items-center gap-3 text-[1rem] font-bold text-black md:text-[1.125rem]'>
          <h3>{title}</h3>
          <Number num={totalCount} />
        </div>
        <button className='relative ml-auto h-[1.375rem] w-[1.375rem] md:h-[1.5rem] md:w-[1.5rem]' onClick={onClick}>
          <Image src={settingIcon.src} fill alt='설정 아이콘' />
        </button>
      </div>
      <div className='flex flex-col justify-center gap-[0.625rem] md:gap-4'>
        <div className='h-[2rem] md:h-[2.5rem]'>
          <AddTodo screen='mobile' onClick={() => {}} />
        </div>
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            tags={card.tags}
            dueDate={card.dueDate}
            imageUrl={card.imageUrl}
            bgColor={mockColors[card.id % 3 || 3]}
            nickname={card.assignee.nickname}
            profileImageUrl={card.assignee.profileImageUrl}
          />
        ))}
      </div>
    </div>
  );
}
