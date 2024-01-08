'use client';

import settingIcon from '@/public/icons/settings_icon.svg';
import Card from '@/src/app/(afterLogin)/_component/Card';
import AddTodo from '@/src/app/_component/Button/AddTodo';
import Number from '@/src/app/_component/Chip/Number';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import Image from 'next/image';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Colors } from '@/src/app/(afterLogin)/_constant/color';

import { CardInfo } from '@/src/app/(afterLogin)/_constant/type';
import useInfiniteScroll from '@/src/app/_hook/useInfiniteScroll';
import { DraggableStateSnapshot, DraggableProvided, Draggable } from 'react-beautiful-dnd';
import { cardStateAboutColumn, countAboutCardList } from '@/src/app/_recoil/CardAtom';
import { deleteColumnsForColumnId, updateColumnsForColumnId } from '@/src/app/_recoil/ModalAtom/columnAtom';
import UpdateColumn2 from '@/src/app/_component/modal2/column/update';
import { DeleteColumn2 } from '@/src/app/_component/modal2/column/delete';
interface CardListProps {
  id: number;
  title: string;
}

export function CardList({ id, title }: CardListProps) {
  const [cards, setCards] = useRecoilState<CardInfo[] | []>(cardStateAboutColumn(id));
  const [cardNumCount, setCardNumCount] = useRecoilState<number>(countAboutCardList(id));
  const [cursorId, setCursorId] = useState('');
  const [updateColumnState, setUpdateColumnState] = useRecoilState(updateColumnsForColumnId(id));
  const deleteColumnState = useRecoilValue(deleteColumnsForColumnId(id));
  const target = useRef<HTMLDivElement>(null);

  const getCard = useCallback(async () => {
    const query = cursorId ? `cursorId=${cursorId}&` : '';
    const { data } = await axiosInstance.get(`cards?${query}columnId=${id}`);
    setCards((prev) => [
      ...prev,
      ...(data.cards as CardInfo[]).sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()),
    ]);
    setCardNumCount(data.totalCount);
    setCursorId(data.cursorId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorId]);

  const openUpdateColumnModal = () => setUpdateColumnState(true);

  const onIntersect: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        getCard();
      }
    });
  };

  useInfiniteScroll({ target, onIntersect: onIntersect, size: cursorId });

  const getStyle = (style: DraggableProvided['draggableProps']['style'], snapshot: DraggableStateSnapshot) => {
    if (!snapshot.isDragging) return {};
    if (!snapshot.isDropAnimating) {
      return style;
    }

    return {
      ...style,
      transitionDuration: `0.001s`,
    };
  };

  useEffect(() => {
    return () => setCards([]);
  }, [setCards]);

  return (
    <div className='md:min-w-none hide-scrollbar relative flex flex-1 flex-col gap-[1.0625rem] bg-gray10 px-3 py-4 md:w-full md:gap-[1.5625rem] md:p-5 lg:h-full lg:min-w-[22.125rem] lg:flex-col lg:gap-0 lg:overflow-scroll lg:pt-0'>
      <div className='flex flex-col gap-4 bg-gray10 md:gap-6 lg:sticky lg:top-0 lg:z-10 lg:pb-4 lg:pt-5'>
        <div className='flex items-center gap-2'>
          <span
            className={`flex h-2 w-2 items-center justify-center rounded-3xl bg-violet text-[0.75rem] text-white`}
          ></span>
          <div className='flex items-center gap-3 text-[1rem] font-bold text-black md:text-[1.125rem]'>
            <h3>{title}</h3>
            <Number num={cardNumCount} />
          </div>
          <button
            className='relative ml-auto h-[1.375rem] w-[1.375rem] md:h-[1.5rem] md:w-[1.5rem]'
            onClick={openUpdateColumnModal}
          >
            <Image src={settingIcon.src} fill alt='설정 아이콘' />
          </button>
        </div>
        <div className='h-[2rem] md:h-[2.5rem]'>
          <AddTodo screen='mobile' onClick={() => {}} />
        </div>
      </div>
      <div className='flex flex-col justify-center gap-[0.625rem] md:gap-4'>
        {cards.map((card, index) => (
          <Draggable draggableId={card.id.toString()} index={index} key={card.id}>
            {({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
              <div ref={innerRef} {...draggableProps} style={getStyle(draggableProps.style, snapshot)}>
                <div {...dragHandleProps}>
                  <Card
                    id={card.id}
                    title={card.title}
                    columnId={id}
                    tags={card.tags}
                    dueDate={card.dueDate}
                    imageUrl={card.imageUrl}
                    bgColor={Colors[card.id % 5]}
                    nickname={card.assignee?.nickname}
                    profileImageUrl={card.assignee?.profileImageUrl}
                  />
                </div>
              </div>
            )}
          </Draggable>
        ))}
      </div>
      {cursorId !== null && <div className='h-4 flex-shrink-0' ref={target}></div>}
      {updateColumnState ? <UpdateColumn2 columnId={id} /> : null}
      {deleteColumnState ? <DeleteColumn2 columnId={id} /> : null}
    </div>
  );
}
