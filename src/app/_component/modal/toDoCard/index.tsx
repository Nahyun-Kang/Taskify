'use client';
import useRenderModal from '@/src/app/_hook/useRenderModal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DropdownAndFilter from '@/src/app/_component/dropdown/filter';
import InputForm from '@/src/app/_component/InputForm';
import {
  DetailAssignee,
  DetailIconButton,
  DetailMainContent,
  DetailCardComment,
} from '@/src/app/_component/modal/toDoCard/DetailComponent';
import AddImageFile from '@/src/app/(afterLogin)/_component/AddImageFile';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { useFormContext } from 'react-hook-form';
import Dropdown from '@/src/app/_component/dropdown';
// import { SubmitHandler } from 'react-hook-form';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { cardStateAboutColumn } from '@/src/app/_recoil/cardAtom';
import { CardInfo } from '@/src/app/(afterLogin)/_constant/type';
import {
  showToDoModalState,
  openPopOverState,
  countAboutCardList,
  commentsState,
  updateCardState,
} from '@/src/app/_recoil/cardAtom';
import { usePutCard } from '@/src/app/_hook/usePutCard';
import { useRef } from 'react';

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
  const { watch, setValue } = useFormContext();
  const title = watch('title');
  const description = watch('description');
  const assigneeUserId = watch('assigneeUserId');
  const dueDate = watch('dueDate');
  const imageUrl = watch('imageUrl');
  const tags = watch('tags');

  const isButtonDisabled = !(title && description && assigneeUserId && dueDate && imageUrl && tags.length >= 1);
  setValue('isDisabled2', isButtonDisabled);
  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <DropdownAndFilter />
      <InputForm.TextInput label='제목' placeholder='제목을 입력해주세요' id='title' isRequired={true} />
      <InputForm.TextInput label='설명' placeholder='설명을 입력해주세요' id='description' isRequired={true} />
      <InputForm.DateInput label='마감일' id='dueDate' placeholder='날짜 선택' />
      <InputForm.TagInput label='태그' id='tags' placeholder='입력 후 Enter' />
      <AddImageFile size='big' />
    </>
  );
}
// 할 일 카드 수정 모달 내용
export function UpdateToDo({ mainTitle, cardData }: { mainTitle: string; cardData: ToDoCardDetailProps }) {
  // const { watch, setValue } = useFormContext();
  // const title = watch('title');
  // const description = watch('description');

  // const isButtonDisabled = !(title && description);
  // setValue('isDisabled', isButtonDisabled);

  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <div className='flex justify-between'>
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
      <AddImageFile size='big' profileImageUrl={cardData.imageUrl} />
    </>
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
  const [comments, setComments] = useRecoilState(commentsState);
  const [modalType, callModal, setModalType] = useRenderModal();
  const { putCard, updatedCard } = usePutCard(cardId, columnId, setModalType, callModal);
  const setCardsOtherColumn = useSetRecoilState(cardStateAboutColumn(updatedCard?.columnId as number));
  const setCountOtherColumn = useSetRecoilState(countAboutCardList(updatedCard?.columnId as number));

  const target = useRef(null);

  const getComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const cursorQuery = nowCursorId ? `cursorId=${nowCursorId}&` : '';
      const res = await axiosInstance.get(`comments?${cursorQuery}cardId=${cardId}`);
      const { comments } = res.data;
      const { cursorId } = res.data;
      setComments((oldComments) => [...(oldComments || []), ...comments]);
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
  }, [nowCursorId]);

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
      setComments((prev) => [, ...(prev ? prev : []), res.data]);
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
    setIsOpenPopOver(true);
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

  useObserver({ target, callback: arriveAtIntersection, id: nowCursorId });

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
                className='hide-scrollbar relative flex h-[47.5rem] flex-col gap-[1rem] overflow-y-scroll rounded-[0.5rem] border
              border-white bg-white sm:w-[20.4375rem] sm:px-[1.25rem] sm:py-[2.5rem] md:w-[42.5rem] md:px-[1.75rem] md:py-[2rem] lg:w-[45.625rem]'
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
                <div className=' sm:flex  sm:flex-col-reverse md:flex md:flex-row md:justify-between'>
                  <DetailMainContent columnId={columnId} tags={cardData.tags} description={cardData.description} />
                  <DetailAssignee assignee={cardData.assignee} dueDate={cardData.dueDate} />
                </div>
                <div className=' flex flex-col gap-[1.5rem]  sm:w-[17.9375rem] md:w-[28.125rem]'>
                  <div className='relative flex sm:h-[8.3125rem] sm:w-[17.9375rem] md:h-[16.375rem] md:w-[28.125rem]'>
                    {cardData.imageUrl && (
                      <Image
                        src={cardData.imageUrl}
                        alt='imageUrl'
                        fill
                        sizes='(min-width: 768px) 28.125rem, 17.9375rem'
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
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
                      <DetailCardComment key={comment?.id || `comment-${index}`} data={comment} />
                    ))
                  ) : null}
                  {nowCursorId === null ? null : <div ref={target}></div>}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
