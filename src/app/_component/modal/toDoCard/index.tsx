'use client';
import AddImageFile from '@/src/app/(afterLogin)/_component/AddImageFile';
import InputForm from '@/src/app/_component/InputForm';
import Dropdown from '@/src/app/_component/dropdown';
import DropdownAndFilter from '@/src/app/_component/dropdown/filter';
import {
  DetailAssignee,
  DetailCardComment,
  DetailIconButton,
  DetailMainContent,
} from '@/src/app/_component/modal/toDoCard/DetailComponent';
import useRenderModal from '@/src/app/_hook/useRenderModal';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { CardInfo } from '@/src/app/(afterLogin)/_constant/type';
import { usePutCard } from '@/src/app/_hook/usePutCard';
import {
  cardStateAboutColumn,
  commentsState,
  countAboutCardList,
  openPopOverState,
  showModalState,
} from '@/src/app/_recoil/cardAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface TodoProps {
  mainTitle: string;
}

export interface ToDoCardDetailProps {
  columnId?: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  imageUrl: string;
  assignee: { profileImageUrl: string; nickname: string; id: number };
}
// 할 일 카드 생성 모달 내용
export function CreateToDo({ mainTitle }: TodoProps) {
  return (
    <div className='flex flex-col gap-6'>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <DropdownAndFilter />
      <InputForm.TextInput label='제목' placeholder='제목을 입력해주세요' id='title' isRequired={true} />
      <InputForm.TextInput label='설명' placeholder='설명을 입력해주세요' id='description' isRequired={true} />
      <InputForm.DateInput label='마감일' id='dueDate' placeholder='날짜 선택' />
      <InputForm.TagInput label='태그' id='tags' placeholder='입력 후 Enter' />
      <div className='flex flex-col gap-[0.625rem]'>
        <span>이미지</span>
        <AddImageFile size='small' />
      </div>
    </div>
  );
}
// 할 일 카드 수정 모달 내용
export function UpdateToDo({ mainTitle, cardData }: { mainTitle: string; cardData: ToDoCardDetailProps }) {
  return (
    <div className='flex flex-col gap-6 md:max-w-[28.125rem]'>
      <span className='font-Pretendard font-bold md:text-[1.5rem]'>{mainTitle}</span>
      <div className='flex flex-col gap-6 md:flex-row md:justify-between md:gap-4'>
        <Dropdown column={cardData.columnId} />
        <DropdownAndFilter assignee={cardData.assignee} />
      </div>
      <InputForm.TextInput
        label='제목'
        placeholder='제목을 입력해주세요'
        id='title'
        isRequired={true}
        initialValue={cardData.title}
      />
      <InputForm.TextInput
        label='설명'
        placeholder='설명을 입력해주세요'
        id='description'
        isRequired={true}
        initialValue={cardData.description}
      />
      <InputForm.DateInput label='마감일' id='dueDate' placeholder='날짜 입력' initialDate={new Date('2023-12-24')} />
      <InputForm.TagInput label='태그' id='tags' placeholder='입력 후 Enter' initialTags={cardData.tags} />
      <div className='flex flex-col gap-[0.625rem]'>
        <span>이미지</span>
        <AddImageFile size='small' profileImageUrl={cardData.imageUrl} />
      </div>
    </div>
  );
}

// 할 일 카드 삭제 모달 내용
export function DeleteTodo({ mainTitle }: TodoProps) {
  return (
    <>
      <span className='flex items-center justify-center text-[1rem] font-medium text-black'>{mainTitle}</span>
    </>
  );
}

export interface commentType {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl?: string;
    nickname?: string;
    id?: number;
  };
}

// 할 일 카드 상세 모달 내용
export function DetailToDo({ cardId, onClose, columnId }: { cardId: number; onClose: () => void; columnId: number }) {
  const [show, setShow] = useRecoilState(showModalState);

  const setCards = useSetRecoilState(cardStateAboutColumn(columnId));
  const setCount = useSetRecoilState(countAboutCardList(columnId));
  const [cardData, setCardData] = useState<ToDoCardDetailProps | null>(null);
  const [isOpenPopOver, setIsOpenPopOver] = useRecoilState(openPopOverState);
  const [comments, setComments] = useRecoilState(commentsState);
  const [modalType, callModal, setModalType] = useRenderModal();

  const { putCard, updatedCard } = usePutCard(cardId, columnId, setModalType);
  const setCardsOtherColumn = useSetRecoilState(cardStateAboutColumn(updatedCard?.columnId as number));
  const setCountOtherColumn = useSetRecoilState(countAboutCardList(updatedCard?.columnId as number));

  const getComments = async () => {
    const res = await axiosInstance.get(`comments?cardId=${cardId}`);
    const { comments } = res.data;
    setComments(comments);
  };

  // 카드 수정 모달 호출 함수
  const RenderUpdatedoModal = (e: React.MouseEvent<HTMLDivElement>, cardData: ToDoCardDetailProps) => {
    callModal({ name: (e.target as HTMLElement).id, onSubmit: putCard, cardData: cardData });
    setShow(false);
  };

  // 카드 삭제 서브밋 함수
  const DeleteCard = async () => {
    try {
      await axiosInstance.delete(`cards/${cardId}`);
      setCards((oldCards: CardInfo[]) => oldCards.filter((item) => item.id !== cardId));
      setCount((prev: number) => prev - 1);
    } finally {
      setModalType(null);
    }
  };
  // 카드 삭제 모달 호출 함수
  const RenderDeleteModal = (e: React.MouseEvent<HTMLDivElement>) => {
    callModal({ name: (e.target as HTMLElement).id, onSubmit: DeleteCard });
    setShow(false);
  };
  // 특정 카드 클릭 시 할 일 카드 상세 모달에 데이터 바인딩하기 위한 api 요청
  const handleRenderCard = async () => {
    try {
      const res = await axiosInstance.get(`cards/${cardId}`);

      const newData = res.data;
      setCardData(newData);
    } catch (error) {}
  };

  const handleKebab = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpenPopOver((prev) => !prev);
  };

  const handleKebabClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpenPopOver(false);
  };
  // 할 일 카드 상세 모달 마운트 시 해당 카드 및 댓글 데이터바인딩
  useEffect(() => {
    handleRenderCard();
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (updatedCard && updatedCard.columnId !== columnId) {
      setCards((oldCards: CardInfo[]) => oldCards.filter((card) => card.columnId === columnId));
      setCount((prev: number) => prev - 1);
      setCardsOtherColumn((oldCards: CardInfo[]) => [updatedCard, ...oldCards]);
      setCountOtherColumn((prev: number) => prev + 1);
    }
  }, [updatedCard, setCardsOtherColumn, columnId, setCards, setCount, setCountOtherColumn]);

  if (!cardData) return;

  if (!show) {
    return <>{modalType}</>;
  }

  return (
    <>
      {modalType ? (
        <>{modalType}</>
      ) : (
        <>
          <div className='fixed left-0 top-0 z-[1000] flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-70'>
            <div
              className='hide-scrollbar relative flex h-[75%] flex-col gap-4 overflow-scroll rounded-lg border bg-white sm:w-[20.4375rem] sm:px-[1.25rem] sm:py-[2.5rem] md:w-[42.5rem] md:gap-6 md:px-[1.75rem] md:py-[2rem] lg:w-[45.625rem]'
              onClick={handleKebabClose}
            >
              <DetailIconButton
                handleKebab={handleKebab}
                onUpdate={RenderUpdatedoModal}
                onDelete={RenderDeleteModal}
                isOpenPopOver={isOpenPopOver}
                onClose={onClose}
                cardData={cardData}
              />
              <span className='flex text-[1.5rem] font-bold text-black'>{cardData.title}</span>
              <div className='flex flex-col-reverse justify-between md:flex-row'>
                <div className='md:w-[26.25rem] lg:w-[28.125rem]'>
                  <DetailMainContent columnId={columnId} tags={cardData.tags} description={cardData.description} />
                  <div className='mb-[1.1875rem] flex sm:w-[17.9375rem] md:mb-6 md:w-full'>
                    {cardData.imageUrl && (
                      <Image
                        sizes='100vw'
                        width={100}
                        height={100}
                        style={{ width: '100%', height: 'auto' }}
                        src={cardData.imageUrl}
                        alt='imageUrl'
                        priority
                      />
                    )}
                  </div>
                  <InputForm.CommentInput id='content' placeholder='댓글을 입력해주세요' label='댓글' />
                  {comments && Array.isArray(comments)
                    ? [...comments]
                        .sort(
                          (a, b) =>
                            new Date(a.createdAt as string).getTime() - new Date(b.createdAt as string).getTime(),
                        )
                        .map((comment) => <DetailCardComment key={comment.id} data={comment} />)
                    : null}
                </div>
                <DetailAssignee assignee={cardData.assignee} dueDate={cardData.dueDate} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
