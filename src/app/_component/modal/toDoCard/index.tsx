'use client';
import DropdownAndFilter from '@/src/app/DropdownAndFilter';
import InputField from '../../Input/InputField';
import line from '@/public/icons/line.svg';
import Image from 'next/image';
import Tag from '../../Chip/Tag';
import circleProfile from '@/public/icons/circleProfile.svg';
import kebab from '@/public/icons/kebab.svg';
import close from '@/public/icons/close_icon.svg';
import { useState } from 'react';
import { MODALTYPE } from '@/src/app/_constant/modalType';
import useRenderModal from '@/src/app/_hook/useRenderModal';
interface TodoProps {
  mainTitle: string;
}

// 할 일 카드 생성 메인 내용
export function CreateToDo({ mainTitle }: TodoProps) {
  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <DropdownAndFilter />
      <InputField labelText='제목' placeholder='제목을 입력해주세요' id='title' isRequired={true} />
      <InputField labelText='설명' placeholder='설명을 입력해주세요' id='description' isRequired={true} />
      <InputField.DateInput labelText='마감일' id='dueDate' />
      <InputField.TagInput labelText='태그' id='tags' placeholder='입력 후 Enter' />
      <InputField.TagInput labelText='이미지' id='imageUrl' placeholder='아직 이미지인풋이 없네용' />
    </>
  );
}
// 할 일 카드 수정 메인 내용
export function UpdateToDo({ mainTitle }: TodoProps) {
  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <DropdownAndFilter />
      <InputField labelText='제목' placeholder='제목을 입력해주세요' id='title' isRequired={true} />
      <InputField labelText='설명' placeholder='설명을 입력해주세요' id='description' isRequired={true} />
      <InputField.DateInput labelText='마감일' id='dueDate' />
      <InputField.TagInput labelText='태그' id='tags' placeholder='입력 후 Enter' />
      <InputField.TagInput labelText='이미지' id='imageUrl' placeholder='아직 이미지인풋이 없네용' />
    </>
  );
}

export function DeleteTodo({ mainTitle }: TodoProps) {
  return (
    <>
      <span className='flex items-center justify-center text-[1rem] font-medium text-black'>{mainTitle}</span>
    </>
  );
}

export const ToDoCardDetail = {
  id: 1,
  title: '일정 관리 Taskify 프로젝트',
  description: 'string',
  tags: ['프론트엔드', '넥스트'],
  dueDate: '2022.12.31',
  assignee: {
    profileImageUrl: '/icons/circleProfile.svg',
    nickname: '미녀기',
    id: 0,
  },
  imageUrl: '/images/hero.png',
  columnId: 0,
  createdAt: '2023-12-21T04:12:30.578Z',
  updatedAt: '2023-12-21T04:12:30.578Z',
};
ToDoCardDetail;
interface ToDoCardDetailProps {
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

// 할 일 카드 모달 상세페이지
export function DetailToDo({ ToDoCardDetail, onClose }: { ToDoCardDetail: ToDoCardDetailProps; onClose: () => void }) {
  const { title, description, tags, dueDate, assignee, imageUrl } = ToDoCardDetail;
  const [isOpenPopOver, setIsOpenPopOver] = useState(false);
  const [modalType, callModal] = useRenderModal();

  const handleRenderModal = (e: React.MouseEvent<HTMLParagraphElement>) => {
    callModal(String((e.target as HTMLElement).id));
  };

  const handleKebab = () => setIsOpenPopOver(true);

  const handleClick = () => {};
  return (
    <>
      {modalType ? (
        <>{modalType}</>
      ) : (
        <>
          <div className='fixed left-0 top-0 z-[1000] flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-70'>
            <div className='relative rounded-[0.5rem] border border-white bg-white sm:w-[20.4375rem] sm:px-[1.25rem] sm:py-[2.5rem] md:w-[42.5rem] md:px-[1.75rem] md:py-[2rem] lg:w-[45.625rem]'>
              <div className=' absolute flex gap-[1.5rem] sm:right-[0.75rem] sm:top-[0.75rem] md:right-[1.75rem] md:top-[2rem]'>
                <span onClick={handleKebab} className=' relative h-[1.75rem] w-[1.75rem]'>
                  <Image src={kebab} alt='케밥' />
                  {isOpenPopOver ? (
                    <div className='h-[5.125rem] w-[5.8125rem] rounded-[0.375rem] border border-[#d9d9d9] bg-white p-[0.375rem] shadow-md'>
                      <p
                        onClick={handleRenderModal}
                        id={MODALTYPE.TODO.UPDATE}
                        className='m-auto whitespace-nowrap rounded-[0.25rem] border border-white px-[1rem] py-[0.25rem] text-[0.875rem]'
                      >
                        수정하기
                      </p>
                      <p
                        onClick={handleRenderModal}
                        id={MODALTYPE.TODO.DELETE}
                        className=' mt-[0.375rem] whitespace-nowrap rounded-[0.25rem] border border-white px-[1rem] py-[0.25rem] text-[0.875rem] '
                      >
                        삭제하기
                      </p>
                    </div>
                  ) : null}
                </span>
                <span onClick={onClose} className=' relative h-[2.125rem] w-[2.125rem]'>
                  <Image src={close} alt='닫기' />
                </span>
              </div>
              <span className='flex text-[1.5rem] font-bold text-black'>{title}</span>
              <div className=' sm:flex  sm:flex-col-reverse md:flex md:flex-row md:justify-between'>
                <div className='w-[60%]'>
                  <div className=' mb-[1rem] mt-[1.5rem] flex gap-[1.25rem]'>
                    <div className=' flex gap-[1.25rem]'>
                      <span>Todo</span>
                      <Image src={line} alt='line' width={0} height={20} />
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
                <div className=' rounded-[0.5rem] border border-gray30 p-[1rem] sm:flex sm:w-[100%] sm:items-center sm:justify-between md:flex md:w-[12.5rem] md:flex-col md:items-start md:justify-start md:gap-[1.25rem]'>
                  <div className='flex flex-col gap-[0.375rem]'>
                    <span className='text-[0.75rem] font-semibold leading-5'>담당자</span>
                    <div className='flex items-center  gap-[0.3125rem]'>
                      <Image src={assignee.profileImageUrl} width={34} height={34} alt='담당자 프로필' />
                      <span>{assignee.nickname}</span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-[0.375rem]'>
                    <span className='text-[0.75rem] font-semibold leading-5'>마감일</span>
                    <span>{dueDate}</span>
                  </div>
                </div>
              </div>
              <div className='relative flex sm:h-[8.3125rem] sm:w-[17.9375rem] md:h-[16.375rem] md:w-[28.125rem]'>
                <Image src={imageUrl} fill alt='imageUrl' />
              </div>
              <InputField.CommentInput
                id='comment'
                labelText='댓글'
                handleClick={handleClick}
                placeholder='댓글을 입력해 주세요'
              />
              <div className='flex gap-[0.625rem]'>
                <div className='flex flex-col items-start'>
                  <Image src={circleProfile} width={34} height={34} alt='댓글 프로필' />
                </div>
                <div className='flex flex-col gap-[0.375rem]'>
                  <div className='flex gap-[0.5rem]'>
                    <span className='text-[0.875rem] font-semibold text-black'>댓글 작성자</span>
                    <span className='text-[0.75rem] text-[#9fa6b2]'>날짜</span>
                  </div>
                  <p className='text-[0.875rem] text-black'>댓글 내용</p>
                  <div className='flex gap-[0.75rem]'>
                    <span className='text-[0.75rem] text-[#9fa6b2]'>수정</span>
                    <span className='text-[0.75rem] text-[#9fa6b2]'>삭제</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
