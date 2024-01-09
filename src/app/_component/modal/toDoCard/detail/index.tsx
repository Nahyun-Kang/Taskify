// 'use client';
// import { useState, useEffect } from 'react';
// import { useRecoilState, useSetRecoilState } from 'recoil';

// import {
//   CommentType2,
//   DetailAssignee,
//   DetailCardComment,
//   DetailIconButton,
//   DetailMainContent,
// } from '@/src/app/_component/modal/toDoCard/detail/DetailComponent';
// import useRenderModal from '@/src/app/_hook/useRenderModal';
// import { axiosInstance } from '@/src/app/_util/axiosInstance';
// import { CardInfo } from '@/src/app/(afterLogin)/_constant/type';
// import {
//   showToDoModalStateAboutCard,
//   openPopOverState,
//   countAboutCardList,
//   commentsStateAboutCardId,
//   updateCardState,
//   cardListStateAboutColumn,
// } from '@/src/app/_recoil/CardAtom';
// import { usePutCard } from '@/src/app/_hook/usePutCard';
// import { useRef } from 'react';
// import Image from 'next/image';
// import { useParams } from 'next/navigation';
// import CommentInput from '@/src/app/_component/InputForm/CommentInput';
// import useObserver from '@/src/app/_hook/useObserver';
// import { SkeletonUIAboutComments } from '@/src/app/_component/modal/toDoCard/SkeletonForComments';
// import { useCallback } from 'react';
// import { isAxiosError } from 'axios';
// import { ToDoCardDetailProps } from '@/src/app/_component/modal/toDoCard/type';
// // 할 일 카드 상세 모달 내용
// export default function DetailToDo({
//   cardId,
//   onClose,
//   columnId,
// }: {
//   cardId: number;
//   onClose: () => void;
//   columnId: number;
// }) {
//   const [nowCursorId, setNowCursorId] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [observerLoading, setObserverLoading] = useState(false);
//   const [commentValue, setCommentValue] = useState<string>('');
//   // const [show, setShow] = useRecoilState(showToDoModalStateAboutCard(cardId));
//   // const setCardList = useSetRecoilState(cardListStateAboutColumn(columnId));
//   // const setCount = useSetRecoilState(countAboutCardList(columnId));
//   const [cardData, setCardData] = useState(null);
//   const [isOpenPopOver, setIsOpenPopOver] = useRecoilState(openPopOverState);
//   const [comments, setComments] = useRecoilState(commentsStateAboutCardId(cardId));

//   const { putCard, updatedCard } = usePutCard(cardId, columnId);
//   const setCardListOtherColumn = useSetRecoilState(cardListStateAboutColumn(updatedCard?.columnId as number));
//   const setCountOtherColumn = useSetRecoilState(countAboutCardList(updatedCard?.columnId as number));

//   const target = useRef(null);

//   const getComments = useCallback(async () => {
//     if (nowCursorId === null) return;
//     try {
//       setIsLoading(true);
//       const cursorQuery = nowCursorId ? `cursorId=${nowCursorId}&` : '';
//       const res = await axiosInstance.get(`comments?${cursorQuery}cardId=${cardId}`);
//       const { comments } = res.data;
//       const { cursorId } = res.data;
//       setComments((oldComments: CommentType2[]) => [...(oldComments || []), ...comments]);
//       setNowCursorId(cursorId);
//       setIsLoading(false);
//     } catch (error) {
//       alert(error);
//       setIsLoading(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [nowCursorId, cardId]);

//   // 카드 수정 모달 호출 함수
//   const RenderUpdatedoModal = (cardData: ToDoCardDetailProps) => {
//     callModal({ name: '할 일 수정', onSubmit: putCard, cardData: cardData });
//     setShow(false);
//     setIsOpenPopOver(false);
//   };

//   // 카드 삭제 서브밋 함수
//   const DeleteCard = async () => {
//     let errorOccurred = false;
//     try {
//       await axiosInstance.delete(`cards/${cardId}`);
//       setCardList((oldCards: CardInfo[]) => oldCards.filter((item) => item.id !== cardId));
//       setCount((prev: number) => prev - 1);
//     } catch (error) {
//       errorOccurred = true;
//       if (isAxiosError(error)) {
//         const serverErrorMessage = error.response?.data.message;
//         return callModal({ name: serverErrorMessage ? serverErrorMessage : error.message });
//       }
//     } finally {
//       if (!errorOccurred) {
//         setModalType(null);
//       }
//     }
//   };
//   // 카드 삭제 모달 호출 함수
//   const RenderDeleteModal = () => {
//     callModal({ name: '할 일 삭제', onSubmit: DeleteCard });
//     setShow(false);
//   };
//   // 특정 카드 클릭 시 할 일 카드 상세 모달에 데이터 바인딩하기 위한 api 요청
//   const handleRenderCard = async () => {
//     try {
//       const res = await axiosInstance.get(`cards/${cardId}`);

//       const newData = res.data;
//       setCardData(newData);
//     } catch (error) {
//       alert(error);
//     }
//   };
//   const params = useParams();

//   const createComment = async () => {
//     try {
//       const res = await axiosInstance.post('comments', {
//         content: commentValue,
//         columnId,
//         cardId: cardId,
//         dashboardId: Number(params.dashboardId),
//       });
//       setComments((prev: CommentType2[]) => [, ...(prev ? prev : []), res.data]);
//       setCommentValue('');
//     } catch (error) {
//     } finally {
//       setModalType(null);
//     }
//   };

//   const handleKebab = (e: React.MouseEvent<HTMLElement>) => {
//     e.stopPropagation();

//     setIsOpenPopOver((prev) => !prev);
//   };

//   const handleKebabClose = (e: React.MouseEvent<HTMLDivElement>) => {
//     e.stopPropagation();
//     setIsOpenPopOver(false);
//   };

//   const arriveAtIntersection: IntersectionObserverCallback = (entries) => {
//     if (entries[0].isIntersecting && !observerLoading) {
//       setObserverLoading(true);
//       getComments().then(() => {
//         setObserverLoading(false);
//       });
//     }
//   };

//   const modalRef = useRef<HTMLDivElement>(null);
//   const modalOutSideClick = (e: React.MouseEvent<HTMLElement>) => {
//     if (modalRef.current === e.target) {
//       onClose();
//     }
//   };

//   // 할 일 카드 상세 모달 마운트 시 해당 카드 및 댓글 데이터바인딩
//   useEffect(() => {
//     handleRenderCard();
//     return () => {
//       setNowCursorId('');
//       setComments([]);
//     };

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (updatedCard && updatedCard.columnId !== columnId) {
//       setCardList((oldCards: CardInfo[]) => oldCards.filter((card) => card.columnId === columnId));
//       setCount((prev: number) => prev - 1);
//       setCardListOtherColumn((oldCards: CardInfo[]) => [updatedCard, ...oldCards]);
//       setCountOtherColumn((prev: number) => prev + 1);
//     }
//   }, [updatedCard, setCardListOtherColumn, columnId, setCardList, setCount, setCountOtherColumn]);

//   useObserver({
//     target,
//     callback: arriveAtIntersection,
//     id: nowCursorId,
//   });

//   if (!cardData) return;

//   if (!show) {
//     return <>{modalType}</>;
//   }

//   return (
//     <>
//       {modalType ? (
//         <>{modalType}</>
//       ) : (
//         <>
//           <div onClick={modalOutSideClick}>
//             <div
//               ref={modalRef}
//               className='fixed left-0 top-0 z-[1000] flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-70'
//             >
//               <div
//                 className='hide-scrollbar relative flex max-h-[80%] flex-col gap-4 overflow-scroll rounded-lg border bg-white sm:w-[20.4375rem] sm:px-[1.25rem] sm:pb-[2.5rem] md:w-[42.5rem] md:gap-6 md:px-[1.75rem] md:pb-[2rem] lg:w-[45.625rem]'
//                 onClick={handleKebabClose}
//               >
//                 <div className='sticky top-0 z-[2] flex w-full justify-between bg-white sm:pt-[2.5rem] md:pt-[2rem]'>
//                   <span className='flex text-[1.5rem] font-bold text-black'>{cardData.title}</span>
//                   <DetailIconButton
//                     handleKebab={handleKebab}
//                     onUpdate={RenderUpdatedoModal}
//                     onDelete={RenderDeleteModal}
//                     isOpenPopOver={isOpenPopOver}
//                     onClose={onClose}
//                     cardData={cardData}
//                   />
//                 </div>
//                 <div className='flex flex-col-reverse justify-between md:flex-row'>
//                   <div className='md:w-[26.25rem] lg:w-[28.125rem]'>
//                     <DetailMainContent columnId={columnId} tags={cardData.tags} description={cardData.description} />
//                     <div className='mb-[1.1875rem] flex sm:w-[17.9375rem] md:mb-6 md:w-full'>
//                       {cardData.imageUrl && (
//                         <Image
//                           sizes='100vw'
//                           width={100}
//                           height={100}
//                           style={{ width: '100%', height: 'auto' }}
//                           src={cardData.imageUrl}
//                           alt='imageUrl'
//                           priority
//                         />
//                       )}
//                     </div>
//                     <CommentInput
//                       id='content'
//                       placeholder='댓글을 입력해주세요'
//                       onChange={(e) => setCommentValue((e.target as HTMLInputElement).value)}
//                       label='댓글'
//                       onSubmit={createComment}
//                       value={commentValue}
//                     ></CommentInput>
//                     {isLoading ? (
//                       <SkeletonUIAboutComments />
//                     ) : comments && Array.isArray(comments) ? (
//                       [...comments].map((comment, index) => (
//                         <DetailCardComment key={comment?.id || `comment-${index}`} data={comment} cardId={cardId} />
//                       ))
//                     ) : null}

//                     {nowCursorId === null ? null : <div ref={target}></div>}
//                   </div>
//                   <DetailAssignee assignee={cardData.assignee} dueDate={cardData.dueDate} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
// //   );
// // }
