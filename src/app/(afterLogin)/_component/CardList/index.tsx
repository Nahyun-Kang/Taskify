'use client';

import settingIcon from '@/public/icons/settings_icon.svg';
import Card from '@/src/app/(afterLogin)/_component/Card';
import AddTodo from '@/src/app/_component/Button/AddTodo';
import CardCount from '@/src/app/_component/Chip/Number';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cardStateAboutColumn } from '@/src/app/_recoil/cardAtom';
import { Colors } from '@/src/app/(afterLogin)/_constant/color';
import { FieldValues } from 'react-hook-form';
import useRenderModal from '@/src/app/_hook/useRenderModal';
import { useSetRecoilState } from 'recoil';
import { columnState } from '@/src/app/_recoil/cardAtom';
import { MODALTYPE } from '@/src/app/_constant/modalType';
import { CardInfo } from '../../_constant/type';
import { showModalState } from '@/src/app/_recoil/cardAtom';
interface CardListProps {
  id: number;
  title: string;
  boardId: string;
}

export default function CardList({ id, title, boardId }: CardListProps) {
  const [cards, setCards] = useRecoilState<CardInfo[] | []>(cardStateAboutColumn(id));
  const [cardNumCount, setCardNumCount] = useState<number | null>(null);
  const [modalType, callModal, setModalType] = useRenderModal();
  const setColumns = useSetRecoilState(columnState);

  const setShow = useSetRecoilState(showModalState);

  const getCard = async () => {
    const { data } = await axiosInstance.get(`cards?size=10&columnId=${id}`);

    setCards(data.cards);
    setCardNumCount(data.totalCount);
  };
  // 할 일 카드 생성 모달 서브밋 함수
  const onSubmitForCreateToDo = async (form: FieldValues) => {
    try {
      const res = await axiosInstance.post('cards', { ...form, dashboardId: Number(boardId), columnId: Number(id) });
      setCards((prev) => [...(prev || []), res.data]);
      setCardNumCount((prev) => (prev ? prev + 1 : 1));
    } catch (error) {
      console.log(error);
    } finally {
      setModalType(null);
    }
  };
  // 할 일 카드 생성 모달 호출 함수
  const handleRenderCreateTodoModal = (e: React.MouseEvent<HTMLElement>) => {
    callModal({ name: (e.target as HTMLElement).id, onSubmit: onSubmitForCreateToDo, columnId: id });
  };

  // 칼럼 수정을 위한 서브밋 함수
  const onSubmitForUpdateColumn = async (form: FieldValues) => {
    try {
      const res = await axiosInstance.put(`columns/${id}`, { ...form });
      setColumns((oldColumns) => oldColumns.map((column) => (column.id === id ? { ...res.data } : column)));
    } catch (error) {
      console.log(error);
    } finally {
      setModalType(null);
    }
  };

  // 칼럼 수정 모달 호출을 위한 함수

  const handleRenderUpdateColumn = () => {
    setShow(true);
    console.log('왜 안뜨지');
    callModal({
      name: '칼럼 관리',
      onSubmit: onSubmitForUpdateColumn,
      columnId: id,
    });
  };

  useEffect(() => {
    getCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('cards', cards);

  return (
    <div className='border-gray-20 md:min-w-none flex flex-1 flex-col gap-[1.0625rem] rounded-[0.375rem] border-b bg-gray10 px-3 py-4 md:w-full md:gap-[1.5625rem] md:p-5 lg:min-h-screen lg:min-w-[22.125rem] lg:flex-col lg:border-b-0 lg:border-r'>
      <div className='flex items-center gap-2'>
        <span
          className={`flex h-2 w-2 items-center justify-center rounded-3xl bg-violet text-[0.75rem] text-white`}
        ></span>
        <div className='flex items-center gap-3 text-[1rem] font-bold text-black md:text-[1.125rem]'>
          <h3>{title}</h3>
          <CardCount num={cardNumCount} />
        </div>
        <button
          id={MODALTYPE.COLUMN.UPDATE}
          className='relative ml-auto h-[1.375rem] w-[1.375rem] md:h-[1.5rem] md:w-[1.5rem]'
          onClick={handleRenderUpdateColumn}
        >
          <Image src={settingIcon.src} fill alt='설정 아이콘' />
        </button>
      </div>
      <div className='flex flex-col justify-center gap-[0.625rem] md:gap-4'>
        <div className='h-[2rem] md:h-[2.5rem]'>
          <AddTodo screen='mobile' id={MODALTYPE.TODO.CREATE} onClick={handleRenderCreateTodoModal} />
        </div>
        {cards &&
          cards.map((card) => (
            <Card
              id={card.id}
              key={card.id}
              title={card.title}
              columnId={id}
              tags={card.tags}
              dueDate={card.dueDate}
              imageUrl={card.imageUrl}
              bgColor={Colors[card.id % 5]}
              nickname={card.assignee?.nickname}
              profileImageUrl={card.assignee?.profileImageUrl}
            />
          ))}
      </div>
      {modalType}
    </div>
  );
}
