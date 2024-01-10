'use client';
import Image from 'next/image';
import ModalOutside from '@/src/app/_component/modal/_component/modalOutside';
import Comment from '@/src/app/_component/modal/todo/detail/_component/comment';
import Assignee from '@/src/app/_component/modal/todo/detail/_component/assignee';
import MainContent from '@/src/app/_component/modal/todo/detail/_component/mainContent';
import IconButton from '@/src/app/_component/modal/todo/detail/_component/iconButton';
import { SkeletonUIAboutComments } from '@/src/app/_component/modal/todo/SkeletonForComments';
import ModalPortal from '@/src/app/_component/modal/_component/modalPortal';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { openPopOverState, commentsStateAboutCardId } from '@/src/app/_recoil/ModalAtom/todo';
import { getCommentInfo } from '@/src/app/_api/comment';
import useObserver from '@/src/app/_hook/useObserver';
import { ToDoCardDetailProps } from '@/src/app/_component/modal/todo/type';
import { detailTodoAboutCardId } from '@/src/app/_recoil/ModalAtom/todo';
import { CommentType } from '@/src/app/_component/modal/todo/type';
import { getDetailTodoCard } from '@/src/app/_api/todo';
import CreateCommentArea from '@/src/app/_component/modal/todo/detail/_component/createCommentArea';

export default function DetailToDo({ cardId, columnId }: { cardId: number; columnId: number }) {
  const [nowCursorId, setNowCursorId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [observerLoading, setObserverLoading] = useState(false);
  const [cardData, setCardData] = useState<ToDoCardDetailProps | null>(null);

  const setIsOpenPopOver = useSetRecoilState(openPopOverState);
  const [comments, setComments] = useRecoilState(commentsStateAboutCardId(cardId));
  const setIsOpenDetailTodoModal = useSetRecoilState(detailTodoAboutCardId(cardId));

  const target = useRef(null);

  const getComments = useCallback(async () => {
    if (nowCursorId === null) return;
    try {
      setIsLoading(true);
      const cursorQuery = nowCursorId ? `cursorId=${nowCursorId}&` : '';
      const newCommentList = await getCommentInfo(cursorQuery, cardId);
      const { comments } = newCommentList;
      const { cursorId } = newCommentList;
      setComments((oldComments: CommentType[]) => [...(oldComments || []), ...comments]);
      setNowCursorId(cursorId);
      setIsLoading(false);
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowCursorId, cardId]);

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsOpenDetailTodoModal(false);
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
  const handleRenderCard = async () => {
    try {
      const newCard = await getDetailTodoCard(cardId);
      setCardData(newCard);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    handleRenderCard();
    return () => {
      setNowCursorId('');
      setComments([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useObserver({
    target,
    callback: arriveAtIntersection,
    id: nowCursorId,
  });

  if (!cardData) return;
  return (
    <>
      <ModalPortal>
        <ModalOutside closeModal={closeModal}>
          <div
            className='hide-scrollbar dark:bg-black90 dark:text-white8 relative flex max-h-[80%] flex-col gap-4 overflow-scroll rounded-lg border bg-white sm:w-[20.4375rem] sm:px-[1.25rem] sm:pb-[2.5rem] md:w-[42.5rem] md:gap-6 md:px-[1.75rem]  md:pb-[2rem] lg:w-[45.625rem]'
            onClick={handleKebabClose}
          >
            <div className='sticky top-0 z-[2] flex w-full justify-between bg-white sm:pt-[2.5rem] md:pt-[2rem]'>
              <span className='flex text-[1.5rem] font-bold text-black'>{cardData.title}</span>
              <IconButton handleKebab={handleKebab} cardId={cardId} />
            </div>
            <div className='flex flex-col-reverse justify-between md:flex-row'>
              <div className='md:w-[26.25rem] lg:w-[28.125rem]'>
                <MainContent columnId={columnId} tags={cardData.tags} description={cardData.description} />
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
                <CreateCommentArea cardId={cardId} columnId={columnId} />
                {isLoading ? (
                  <SkeletonUIAboutComments />
                ) : comments && Array.isArray(comments) ? (
                  [...comments].map((comment, index) => (
                    <Comment key={comment?.id || `comment-${index}`} data={comment} cardId={cardId} />
                  ))
                ) : null}

                {nowCursorId === null ? null : <div ref={target}></div>}
              </div>
              <Assignee assignee={cardData.assignee} dueDate={cardData.dueDate} />
            </div>
          </div>
        </ModalOutside>
      </ModalPortal>
    </>
  );
}
