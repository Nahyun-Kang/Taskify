'use client';
import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import AddImageFile from '@/src/app/(afterLogin)/_component/AddImageFile';
import InputForm from '@/src/app/_component/InputForm';
import Dropdown from '@/src/app/_component/dropdown';
import DropdownAndFilter from '@/src/app/_component/dropdown/filter';
import {
  CommentType2,
  DetailAssignee,
  DetailCardComment,
  DetailIconButton,
  DetailMainContent,
} from '@/src/app/_component/modal/toDoCard/DetailComponent';
import useRenderModal from '@/src/app/_hook/useRenderModal';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { CardInfo } from '@/src/app/(afterLogin)/_constant/type';
import {
  showToDoModalState,
  openPopOverState,
  countAboutCardList,
  commentsStateAboutCardId,
  updateCardState,
  cardStateAboutColumn,
} from '@/src/app/_recoil/CardAtom';
import { usePutCard } from '@/src/app/_hook/usePutCard';
import { useRef } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import CommentInput from '../../InputForm/CommentInput';
import useObserver from '@/src/app/_hook/useObserver';
import { SkeletonUIAboutComments } from './SkeletonForComments';
import { useCallback } from 'react';
import { isAxiosError } from 'axios';

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

// 할 일 카드 상세 모달 내용
export function DetailToDo({ cardId, onClose, columnId }: { cardId: number; onClose: () => void; columnId: number }) {
  const [nowCursorId, setNowCursorId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [observerLoading, setObserverLoading] = useState(false);
  const [commentValue, setCommentValue] = useState<string>('');
  const [show, setShow] = useRecoilState(showToDoModalState);
  const setCards = useSetRecoilState(cardStateAboutColumn(columnId));
  const setCount = useSetRecoilState(countAboutCardList(columnId));
  const [cardData, setCardData] = useRecoilState(updateCardState);
  const [isOpenPopOver, setIsOpenPopOver] = useRecoilState(openPopOverState);
  const [comments, setComments] = useRecoilState(commentsStateAboutCardId(cardId));
  const [modalType, callModal, setModalType] = useRenderModal();
  const { putCard, updatedCard } = usePutCard(cardId, columnId, setModalType, callModal);
  const setCardsOtherColumn = useSetRecoilState(cardStateAboutColumn(updatedCard?.columnId as number));
  const setCountOtherColumn = useSetRecoilState(countAboutCardList(updatedCard?.columnId as number));

  const target = useRef(null);

  const getComments = useCallback(async () => {
    if (nowCursorId === null) return;
    try {
      setIsLoading(true);
      const cursorQuery = nowCursorId ? `cursorId=${nowCursorId}&` : '';
      const res = await axiosInstance.get(`comments?${cursorQuery}cardId=${cardId}`);
      const { comments } = res.data;
      const { cursorId } = res.data;
      setComments((oldComments: CommentType2[]) => [...(oldComments || []), ...comments]);
      setNowCursorId(cursorId);
      setIsLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        const serverErrorMessage = error.response?.data.message;
        return callModal({ name: serverErrorMessage ? serverErrorMessage : error.message });
      }
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowCursorId, cardId]);

  // 카드 수정 모달 호출 함수
  const RenderUpdatedoModal = (cardData: ToDoCardDetailProps) => {
    callModal({ name: '할 일 수정', onSubmit: putCard, cardData: cardData });
    setShow(false);
  };

  // 카드 삭제 서브밋 함수
  const DeleteCard = async () => {
    try {
      await axiosInstance.delete(`cards/${cardId}`);
      setCards((oldCards: CardInfo[]) => oldCards.filter((item) => item.id !== cardId));
      setCount((prev: number) => prev - 1);
    } catch (error) {
      if (isAxiosError(error)) {
        const serverErrorMessage = error.response?.data.message;
        return callModal({ name: serverErrorMessage ? serverErrorMessage : error.message });
      }
    } finally {
      setModalType(null);
    }
  };
  // 카드 삭제 모달 호출 함수
  const RenderDeleteModal = () => {
    callModal({ name: '할 일 삭제', onSubmit: DeleteCard });
    setShow(false);
  };
  // 특정 카드 클릭 시 할 일 카드 상세 모달에 데이터 바인딩하기 위한 api 요청
  const handleRenderCard = async () => {
    try {
      const res = await axiosInstance.get(`cards/${cardId}`);

      const newData = res.data;
      setCardData(newData);
    } catch (error) {
      if (isAxiosError(error)) {
        const serverErrorMessage = error.response?.data.message;
        return callModal({ name: serverErrorMessage ? serverErrorMessage : error.message });
      }
    }
  };
  const params = useParams();

  const createComment = async () => {
    try {
      const res = await axiosInstance.post('comments', {
        content: commentValue,
        columnId,
        cardId: cardId,
        dashboardId: Number(params.dashboardId),
      });
      setComments((prev: CommentType2[]) => [, ...(prev ? prev : []), res.data]);
      setCommentValue('');
    } catch (error) {
      if (isAxiosError(error)) {
        const serverErrorMessage = error.response?.data.message;
        return callModal({ name: serverErrorMessage ? serverErrorMessage : error.message });
      }
    } finally {
      setModalType(null);
    }
  };

  const handleKebab = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    setIsOpenPopOver((prev) => !prev);
  };

  const handleKebabClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpenPopOver(false);
  };

  const arriveAtIntersection: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting && !observerLoading) {
      setObserverLoading(true);
      getComments().then(() => {
        setObserverLoading(false);
      });
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);
  const modalOutSideClick = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  // 할 일 카드 상세 모달 마운트 시 해당 카드 및 댓글 데이터바인딩
  useEffect(() => {
    handleRenderCard();
    return () => {
      setNowCursorId('');
      setComments([]);
    };
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

  useObserver({
    target,
    callback: arriveAtIntersection,
    id: nowCursorId,
  });

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
          <div onClick={modalOutSideClick}>
            <div
              ref={modalRef}
              className='fixed left-0 top-0 z-[1000] flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-70'
            >
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
                    <CommentInput
                      id='content'
                      placeholder='댓글을 입력해주세요'
                      onChange={(e) => setCommentValue((e.target as HTMLInputElement).value)}
                      label='댓글'
                      onSubmit={createComment}
                      value={commentValue}
                    ></CommentInput>
                    {isLoading ? (
                      <SkeletonUIAboutComments />
                    ) : comments && Array.isArray(comments) ? (
                      [...comments].map((comment, index) => (
                        <DetailCardComment key={comment?.id || `comment-${index}`} data={comment} cardId={cardId} />
                      ))
                    ) : null}

                    {nowCursorId === null ? null : <div ref={target}></div>}
                  </div>
                  <DetailAssignee assignee={cardData.assignee} dueDate={cardData.dueDate} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
