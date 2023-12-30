'use client';

import settingIcon from '@/public/icons/settings_icon.svg';
import Card from '@/src/app/(afterLogin)/_component/Card';
import AddTodo from '@/src/app/_component/Button/AddTodo';
import Number from '@/src/app/_component/Chip/Number';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CardType } from '@/src/app/(afterLogin)/_constant/type';
import { Colors } from '@/src/app/(afterLogin)/_constant/color';
import useInfiniteScroll from '@/src/app/_hook/useInfiniteScroll';

interface CardListProps {
  id: number;
  title: string;
}

type CardKey = {
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
  createdAt: Date;
  updatedAt: Date;
}[];

export default function CardList({ id, title }: CardListProps) {
  const [columnInfo, setColumnInfo] = useState<CardKey>([]);
  const [cursorId, setCursorId] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const target = useRef<HTMLDivElement>(null);

  const getCard = useCallback(async () => {
    const query = cursorId ? `cursorId=${cursorId}&` : '';
    const { data } = await axiosInstance.get(`cards?${query}columnId=${id}`);
    setColumnInfo((prev) => [...prev, ...data.cards]);
    setTotalCount(data.totalCount);
    setCursorId(data.cursorId);
  }, [cursorId]);

  const onIntersect: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        getCard();
      }
    });
  };

  useInfiniteScroll({ target, onIntersect: onIntersect, size: cursorId });

  return (
    <div className='border-gray-20 md:min-w-none lg:scrollbar-hide flex flex-1 flex-col gap-[1.0625rem] border-b bg-gray10 px-3 py-4 md:w-full md:gap-[1.5625rem] md:p-5 lg:min-w-[22.125rem] lg:flex-col lg:overflow-scroll lg:border-b-0 lg:border-r'>
      <div className='flex items-center gap-2'>
        <span
          className={`flex h-2 w-2 items-center justify-center rounded-3xl bg-violet text-[0.75rem] text-white`}
        ></span>
        <div className='flex items-center gap-3 text-[1rem] font-bold text-black md:text-[1.125rem]'>
          <h3>{title}</h3>
          <Number num={totalCount} />
        </div>
        <button className='relative ml-auto h-[1.375rem] w-[1.375rem] md:h-[1.5rem] md:w-[1.5rem]'>
          <Image src={settingIcon.src} fill alt='설정 아이콘' />
        </button>
      </div>
      <div className='flex flex-col justify-center gap-[0.625rem] md:gap-4'>
        <div className='h-[2rem] md:h-[2.5rem]'>
          <AddTodo screen='mobile' onClick={() => {}} />
        </div>
        {columnInfo.length !== 0 &&
          columnInfo.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              tags={card.tags}
              dueDate={card.dueDate}
              imageUrl={card.imageUrl}
              bgColor={Colors[card.id % 5]}
              nickname={card.assignee?.nickname}
              profileImageUrl={card.assignee?.profileImageUrl}
            />
          ))}
      </div>
      {cursorId !== null && <div className='h-4 flex-shrink-0 bg-red' ref={target}></div>}
    </div>
  );
}
