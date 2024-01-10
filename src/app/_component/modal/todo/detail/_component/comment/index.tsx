'use client';

import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { commentsStateAboutCardId } from '@/src/app/_recoil/ModalAtom/todo';
import formatTime from '@/src/app/_util/formatTime';
import { deleteCommentInfo } from '@/src/app/_api/comment';
import ProfileImage from '@/src/app/(afterLogin)/_component/ProfileImage';
import ProfileImageContainer from '@/src/app/(afterLogin)/_component/ProfileImage/ProfileImageContainer';
import { UserDataType } from '@/src/app/_constant/type';
import { updateCommentInfo } from '@/src/app/_api/comment';
import { CommentType } from '@/src/app/_component/modal/todo/type';

export default function Comment({ data, cardId }: { data: CommentType; cardId: number }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [value, setValue] = useState(data ? data.content : '');
  const [isUpdate, setIsUpdate] = useState(false);
  const setComments = useSetRecoilState(commentsStateAboutCardId(cardId));

  const updateComments = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newComment = await updateCommentInfo(data.id, value);
    setComments((oldComments: CommentType[]) => {
      if (oldComments) {
        return oldComments.map((comment) => (comment?.id === data?.id ? { ...newComment } : comment));
      }
      return null;
    });
    setIsUpdate(false);
  };

  const deleteComments = async () => {
    await deleteCommentInfo(data.id);
    setComments((oldComments: CommentType[]) =>
      oldComments ? oldComments.filter((comment) => comment?.id !== data?.id) : [],
    );
  };

  const handleRenderUpdateComment = () => {
    setIsUpdate(true);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLElement>) => {
    e.stopPropagation();
    setValue((e.target as HTMLInputElement).value);
  };

  const userDataObject = localStorage.getItem('taskifyUserData');
  useEffect(() => {
    if (userDataObject) {
      const userData: UserDataType = JSON.parse(userDataObject);
      const loginId = userData.userInfo.id;
      setUserId(loginId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return;

  return (
    <div className='mt-4 flex gap-[0.625rem] md:mt-5'>
      <div className='flex flex-col items-start'>
        {data?.author?.profileImageUrl && (
          <ProfileImageContainer userId={data?.author.id} size='large'>
            <ProfileImage profileImageUrl={data?.author.profileImageUrl} nickname={data?.author.nickname} />
          </ProfileImageContainer>
        )}
      </div>
      <div className='flex w-full flex-col gap-[0.375rem]'>
        <div className='flex gap-[0.5rem]'>
          <span className='text-[0.875rem] font-semibold text-black'>{data?.author?.nickname}</span>
          <span className='text-[0.75rem] text-[#9fa6b2]'>{formatTime(data && (data.createdAt as string))}</span>
        </div>
        {isUpdate ? (
          <div className='my-2 flex flex-col items-center gap-[0.375rem] md:w-[37.5rem] lg:w-[40.625rem]'>
            <input
              id='content2'
              type='text'
              className='w-full border-b-2  border-black focus:outline-none'
              placeholder='댓글을 입력해 주세요'
              defaultValue={data.content}
              onBlur={handleOnBlur}
            />
            <div className='flex w-full justify-end gap-2'>
              <button
                type='button'
                className='w-14 rounded-full px-2 py-1 text-black hover:bg-gray20'
                onClick={() => {
                  setIsUpdate(false);
                }}
              >
                취소
              </button>
              <button className='w-14 rounded-full bg-violet px-2 py-1   text-white' onClick={updateComments}>
                수정
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className='text-[0.875rem] text-black'>{data?.content}</p>
            <div className='flex gap-[0.75rem]'>
              {data?.author?.id === (userId as number) ? (
                <>
                  <span className='text-[0.75rem] text-[#9fa6b2] underline' onClick={handleRenderUpdateComment}>
                    수정
                  </span>
                  <span className='text-[0.75rem] text-[#9fa6b2] underline' onClick={deleteComments}>
                    삭제
                  </span>
                </>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
