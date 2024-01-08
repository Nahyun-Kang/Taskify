// 'use client';
// import Image from 'next/image';
// import ModalOutside from '../../_component/modalOutside';
// import ModalLayout from '../../_component/modalLayout';
// import { DetailIconButton } from '../../../modal/toDoCard/detail/DetailComponent';
// import { DetailMainContent } from '../../../modal/toDoCard/detail/DetailComponent';
// import { DetailAssignee } from '../../../modal/toDoCard/detail/DetailComponent';
// import CommentInput from '../../../InputForm/CommentInput';
// import { DetailCardComment } from '../../../modal/toDoCard/detail/DetailComponent';
// import { SkeletonUIAboutComments } from '../../../modal/toDoCard/SkeletonForComments';
// import ModalPortal from '../../_component/modalPortal';
// export default function DetailToDo2({
//   cardId,
//   onClose,
//   columnId,
// }: {
//   cardId: number;
//   onClose: () => void;
//   columnId: number;
// }) {
//   const handleClose = () => {};
//   return (
//     <>
//       <ModalPortal>
//         <ModalOutside>
//           <ModalLayout btnName='생성' btnSize='large' sign={false} onClose={handleClose} onSubmit={() => {}}>
//             <div className='sticky top-0 z-[2] flex w-full justify-between bg-white sm:pt-[2.5rem] md:pt-[2rem]'>
//               <span className='flex text-[1.5rem] font-bold text-black'>{cardData.title}</span>
//               <DetailIconButton
//                 handleKebab={handleKebab}
//                 onUpdate={RenderUpdatedoModal}
//                 onDelete={RenderDeleteModal}
//                 isOpenPopOver={isOpenPopOver}
//                 onClose={onClose}
//                 cardData={cardData}
//               />
//             </div>
//             <div className='flex flex-col-reverse justify-between md:flex-row'>
//               <div className='md:w-[26.25rem] lg:w-[28.125rem]'>
//                 <DetailMainContent columnId={columnId} tags={cardData.tags} description={cardData.description} />
//                 <div className='mb-[1.1875rem] flex sm:w-[17.9375rem] md:mb-6 md:w-full'>
//                   {cardData.imageUrl && (
//                     <Image
//                       sizes='100vw'
//                       width={100}
//                       height={100}
//                       style={{ width: '100%', height: 'auto' }}
//                       src={cardData.imageUrl}
//                       alt='imageUrl'
//                       priority
//                     />
//                   )}
//                 </div>
//                 <CommentInput
//                   id='content'
//                   placeholder='댓글을 입력해주세요'
//                   onChange={(e) => setCommentValue((e.target as HTMLInputElement).value)}
//                   label='댓글'
//                   onSubmit={createComment}
//                   value={commentValue}
//                 ></CommentInput>
//                 {isLoading ? (
//                   <SkeletonUIAboutComments />
//                 ) : comments && Array.isArray(comments) ? (
//                   [...comments].map((comment, index) => (
//                     <DetailCardComment key={comment?.id || `comment-${index}`} data={comment} cardId={cardId} />
//                   ))
//                 ) : null}

//                 {nowCursorId === null ? null : <div ref={target}></div>}
//               </div>
//               <DetailAssignee assignee={cardData.assignee} dueDate={cardData.dueDate} />
//             </div>
//           </ModalLayout>
//         </ModalOutside>
//       </ModalPortal>
//     </>
//   );
// }
