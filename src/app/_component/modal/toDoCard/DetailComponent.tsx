'use client';
import Image from 'next/image';
import kebab from '@/public/icons/kebab.svg';
import close from '@/public/icons/close_icon.svg';
import line from '@/public/icons/line.svg';
import React, { useState } from 'react';
import Tag from '@/src/app/_component/Chip/Tag';
import { ToDoCardDetailProps } from '.';
import circle from '@/public/icons/Ellipse 54.svg';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { columnState, commentsState } from '@/src/app/_recoil/cardAtom';
import formatTime from '@/src/app/_util/formatTime';
// import CommentUpdateInput from '@/src/app/_component/InputForm/commentUpdateInput';
// import { FieldValues } from 'react-hook-form';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
// 할 일 카드 상세 모달은 내용이 너무 많아서 일단 분리해 놓았습니다
import DefaultProfile from '../../DefaultProfile';

interface DetailIconButtonProps {
  handleKebab: (e: React.MouseEvent<HTMLElement>) => void;
  onUpdate: (cardData: ToDoCardDetailProps) => void;
  isOpenPopOver: boolean;
  onClose: () => void;
  onDelete: (e: React.MouseEvent<HTMLDivElement>) => void;
  cardData: ToDoCardDetailProps;
}

export function DetailIconButton({
  handleKebab,
  isOpenPopOver,
  onUpdate,
  onDelete,
  onClose,
  cardData,
}: DetailIconButtonProps) {
  return (
    <div className=' absolute flex gap-[1.5rem] sm:right-[0.75rem] sm:top-[0.75rem] md:right-[1.75rem] md:top-[2rem]'>
      <span onClick={handleKebab} className=' relative h-[1.75rem] w-[1.75rem]'>
        {kebab && <Image src={kebab} alt='케밥' fill priority />}
        {isOpenPopOver ? (
          <div className='h-[5.125rem] w-[5.8125rem] rounded-[0.375rem] border border-[#d9d9d9] bg-white p-[0.375rem] shadow-md'>
            <p
              onClick={() => onUpdate(cardData)}
              className='m-auto whitespace-nowrap rounded-[0.25rem] border border-white px-[1rem] py-[0.25rem] text-[0.875rem]'
            >
              수정하기
            </p>
            <p
              onClick={onDelete}
              className=' mt-[0.375rem] whitespace-nowrap rounded-[0.25rem] border border-white px-[1rem] py-[0.25rem] text-[0.875rem] '
            >
              삭제하기
            </p>
          </div>
        ) : null}
      </span>
      <span onClick={onClose} className=' relative h-[2.125rem] w-[2.125rem]'>
        {close && <Image src={close} alt='닫기' fill priority />}
      </span>
    </div>
  );
}
// column 넣을려면 대쉬보드아이디를 내려줘야됨
export function DetailMainContent({
  tags,
  description,
  columnId,
}: {
  tags: string[];
  description: string;
  columnId: number;
}) {
  const columns = useRecoilValue(columnState);
  const newColumn = columns.find((column) => column.id === columnId);
  return (
    <div className='w-[60%]'>
      <div className=' mb-[1rem] mt-[1.5rem] flex gap-[1.25rem]'>
        <div className=' flex gap-[1.25rem]'>
          <span>
            {
              <div className='flex items-center rounded-[0.6875rem] border bg-[#F1EFFD] px-[0.5rem] py-[0.25rem]'>
                <div className='flex  gap-[0.375rem] overflow-hidden'>
                  <Image src={circle} alt='circle' width={6} height={6} priority />
                  <span className='whitespace-nowrap text-[1rem]'>{newColumn?.title}</span>
                </div>
              </div>
            }
          </span>
          {line && <Image src={line} alt='line' width={1} height={20} priority />}
        </div>
        <div className='flex flex-nowrap gap-[0.375rem]'>
          {tags.map((tag) => (
            <Tag size='large' content={tag} key={tag} />
          ))}
        </div>
      </div>
      <div className='flex flex-wrap text-[0.875rem] text-black sm:w-[17.9375rem] md:w-[26.25rem] lg:w-[28.125rem]'>
        {description}
      </div>
    </div>
  );
}

interface DetailAssignee {
  assignee: { profileImageUrl: string; nickname: string; id: number };
  dueDate: string;
}

export function DetailAssignee({ assignee, dueDate }: DetailAssignee) {
  return (
    <div className=' rounded-[0.5rem] border border-gray30 p-[1rem] sm:flex sm:w-[100%] sm:items-center sm:justify-between md:flex md:w-[12.5rem] md:flex-col md:items-start md:justify-start md:gap-[1.25rem]'>
      <div className='flex flex-col gap-[0.375rem]'>
        <span className='text-[0.75rem] font-semibold leading-5'>담당자</span>
        <div className='flex items-center  gap-[0.3125rem]'>
          {assignee?.profileImageUrl ? (
            <Image src={assignee.profileImageUrl} width={34} height={34} alt='담당자 프로필' priority />
          ) : (
            <DefaultProfile nickName={assignee?.nickname} index={assignee?.id as number} />
          )}
          <span>{assignee?.nickname}</span>
        </div>
      </div>
      <div className='flex flex-col gap-[0.375rem]'>
        <span className='text-[0.75rem] font-semibold leading-5'>마감일</span>
        <span>{dueDate}</span>
      </div>
    </div>
  );
}

export interface CommentType2 {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}
export function DetailCardComment({ data }: { data: CommentType2 }) {
  const [value, setValue] = useState(data ? data.content : '');
  const [isUpdate, setIsUpdate] = useState(false);
  const setComments = useSetRecoilState(commentsState);

  const updateComments = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const res = await axiosInstance.put(`comments/${data.id}`, {
      content: value,
    });

    setComments((oldComments) => {
      if (oldComments) {
        return oldComments.map((comment) => (comment?.id === data?.id ? { ...res.data } : comment));
      }
      return null;
    });
    setIsUpdate(false);
  };

  const deleteComments = async () => {
    await axiosInstance.delete(`comments/${data.id}`);
    setComments((oldComments) => (oldComments ? oldComments.filter((comment) => comment?.id !== data?.id) : []));
  };

  const handleRenderUpdateComment = () => {
    setIsUpdate(true);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLElement>) => {
    e.stopPropagation();
    setValue((e.target as HTMLInputElement).value);
  };

  if (!data) return;
  return (
    <div className='flex gap-[0.625rem]'>
      <div className='flex flex-col items-start'>
        {data?.author?.profileImageUrl ? (
          <Image src={data?.author?.profileImageUrl} width={34} height={34} alt='댓글 프로필' priority />
        ) : (
          <DefaultProfile nickName={data?.author?.nickname} index={data?.author?.id} />
        )}
      </div>
      <div className='flex flex-col gap-[0.375rem]'>
        <div className='flex gap-[0.5rem]'>
          <span className='text-[0.875rem] font-semibold text-black'>{data?.author?.nickname}</span>
          <span className='text-[0.75rem] text-[#9fa6b2]'>{formatTime(data && (data.createdAt as string))}</span>
        </div>
        {isUpdate ? (
          <div className='my-2 flex w-[39.0625rem] flex-col items-center gap-[0.375rem]'>
            <input
              id='content2'
              type='text'
              className='w-full border-b-2  border-black focus:outline-none'
              placeholder='댓글을 입력해 주세요'
              defaultValue={data.content}
              onBlur={handleOnBlur}
            />
            <div className=' flex w-full justify-end'>
              <button className='mr-1 rounded px-2 py-1 text-black hover:bg-blue' onClick={updateComments}>
                수정
              </button>
              <button
                type='button'
                className='rounded  px-2 py-1 text-black hover:bg-red'
                onClick={() => {
                  setIsUpdate(false);
                }}
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className='text-[0.875rem] text-black'>{data?.content}</p>
            <div className='flex gap-[0.75rem]'>
              <span className='text-[0.75rem] text-[#9fa6b2] underline' onClick={handleRenderUpdateComment}>
                수정
              </span>
              <span className='text-[0.75rem] text-[#9fa6b2] underline' onClick={deleteComments}>
                삭제
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// 댓글 수정 누르면 해당 댓글 부분의 내용영역만 input 필드로 바꿔야될까 음... input 위치가 좀 애매하네요
