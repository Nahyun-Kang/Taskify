'use client';
import Image from 'next/image';
import kebab from '@/public/icons/kebab.svg';
import close from '@/public/icons/close_icon.svg';
import { MODALTYPE } from '@/src/app/_constant/modalType';
import line from '@/public/icons/line.svg';
import React from 'react';
import Tag from '../../Chip/Tag';
import { ToDoCardDetailProps } from '.';
import { commentType } from '@/src/app/_component/modal/toDoCard/index';
// 할 일 카드 상세 모달은 내용이 너무 많아서 일단 분리해 놓았습니다
interface DetailIconButtonProps {
  handleKebab: () => void;
  onUpdate: (e: React.MouseEvent<HTMLParagraphElement>, cardData: ToDoCardDetailProps) => void;
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
        {kebab && <Image src={kebab} alt='케밥' />}
        {isOpenPopOver ? (
          <div className='h-[5.125rem] w-[5.8125rem] rounded-[0.375rem] border border-[#d9d9d9] bg-white p-[0.375rem] shadow-md'>
            <p
              onClick={(e) => onUpdate(e, cardData)}
              id={MODALTYPE.TODO.UPDATE}
              className='m-auto whitespace-nowrap rounded-[0.25rem] border border-white px-[1rem] py-[0.25rem] text-[0.875rem]'
            >
              수정하기
            </p>
            <p
              onClick={onDelete}
              id={MODALTYPE.TODO.DELETE}
              className=' mt-[0.375rem] whitespace-nowrap rounded-[0.25rem] border border-white px-[1rem] py-[0.25rem] text-[0.875rem] '
            >
              삭제하기
            </p>
          </div>
        ) : null}
      </span>
      <span onClick={onClose} className=' relative h-[2.125rem] w-[2.125rem]'>
        {close && <Image src={close} alt='닫기' />}
      </span>
    </div>
  );
}
// column 넣을려면 대쉬보드아이디를 내려줘야됨
export function DetailMainContent({ tags, description }: { tags: string[]; description: string }) {
  return (
    <div className='w-[60%]'>
      <div className=' mb-[1rem] mt-[1.5rem] flex gap-[1.25rem]'>
        <div className=' flex gap-[1.25rem]'>
          <span>Todo</span>
          {line && <Image src={line} alt='line' width={0} height={20} />}
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
          {assignee?.profileImageUrl && (
            <Image src={assignee?.profileImageUrl} width={34} height={34} alt='담당자 프로필' />
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

export function DetailCardComment({ data }: { data: commentType }) {
  return (
    <div className='flex gap-[0.625rem]'>
      <div className='flex flex-col items-start'>
        <Image src={data?.author?.profileImageUrl} width={34} height={34} alt='댓글 프로필' />
      </div>
      <div className='flex flex-col gap-[0.375rem]'>
        <div className='flex gap-[0.5rem]'>
          <span className='text-[0.875rem] font-semibold text-black'>{data.author.nickname}</span>
          <span className='text-[0.75rem] text-[#9fa6b2]'>{data.createdAt}</span>
        </div>
        <p className='text-[0.875rem] text-black'>{data.content}</p>
        <div className='flex gap-[0.75rem]'>
          <span className='text-[0.75rem] text-[#9fa6b2]'>수정</span>
          <span className='text-[0.75rem] text-[#9fa6b2]'>삭제</span>
        </div>
      </div>
    </div>
  );
}
