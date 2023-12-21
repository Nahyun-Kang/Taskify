'use client';

import Cancel from '@/src/app/_component/Button/Cancel';
import React, { ReactNode, useEffect } from 'react';
import Confirm from '../Button/Corfirm';
import { MouseEvent } from 'react';
import { CreateColumn, UpdateAndDeleteColumn } from './column';
import { CreateToDo, DeleteTodo, DetailToDo, UpdateToDo, ToDoCardDetail } from './toDoCard';
import { CreateDashboard } from './dashBoard';
import { PasswordMismatch } from './mismatchPW';
import { createPortal } from 'react-dom';
interface ModalLayoutrProps {
  children: ReactNode;
  btnName: string;
  onClose: (e: MouseEvent<HTMLButtonElement>) => void;
  btnSize: 'small' | 'large';
  layout?: string;
}

interface ModalProps {
  layout?: string;
  detailToDo?: boolean;
  passwordMismatch?: boolean;
  createDashboard?: boolean;
  updateToDo?: boolean;
  createToDo?: boolean;
  deleteToDo?: boolean;
  createColumn?: boolean;
  btnName: string;
  updateOrDeleteColumn?: boolean;
  setModalType: React.Dispatch<React.SetStateAction<React.ReactElement | null>>;
  btnSize: 'small' | 'large';
}

// 모달 레이아웃 + cancelBtn은 커스텀 훅의 modalType을 null로 만들어서 렌더링안되도록 confirmBtn은 api연동할 때 자유롭게 만들 수 있도록
function ModalLayout({ children, btnName, btnSize, onClose, layout }: ModalLayoutrProps) {
  const size = layout
    ? 'lg:w-[45.625rem] md:w-[42.5rem] md:py-[2rem] md:px-[1.75rem] relative rounded-[0.5rem] border border-white sm:w-[20.4375rem] sm:py-[2.5rem] sm:px-[1.25rem] bg-white'
    : 'relative gap-[1.5rem] rounded-[0.5rem] border border-white sm:w-[20.4375rem] sm:px-[1.25rem] sm:pb-[1.25rem] sm:pt-[1.75rem] lg:w-[33.75rem] lg:px-[1.75rem] lg:pt-[2rem] bg-white';

  const handleComfirm = () => {};
  return (
    <div className='fixed left-0 top-0 z-[1000] flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-70'>
      <div className={size}>
        <div className=' flex flex-col gap-[2rem]'>
          {children}
          <div className='flex gap-[0.75rem] sm:justify-center lg:justify-end '>
            {layout ? null : <Cancel size={btnSize} onClick={onClose} />}
            {layout ? null : <Confirm btnName={btnName} size={btnSize} onClick={handleComfirm} />}
          </div>
        </div>
      </div>
    </div>
  );
}
// 모달 컴포넌트 특정 프롭스에 따라 조건부 렌더링
export function Modal({
  layout,
  detailToDo,
  createColumn,
  btnName,
  updateOrDeleteColumn,
  setModalType,
  btnSize,
  deleteToDo,
  createToDo,
  updateToDo,
  createDashboard,
  passwordMismatch,
}: ModalProps) {
  const [mounted, setMounted] = React.useState(false);
  const closeModal = () => setModalType(null);

  useEffect(() => setMounted(true), []);

  return mounted
    ? createPortal(
        <>
          <ModalLayout btnName={btnName} onClose={closeModal} btnSize={btnSize} layout={layout}>
            {createColumn ? <CreateColumn mainTitle='새 칼럼 생성' labelTitle='이름' /> : null}
            {updateOrDeleteColumn ? <UpdateAndDeleteColumn mainTitle='칼럼 관리' labelTitle='이름' /> : null}
            {createToDo ? <CreateToDo mainTitle='할 일 생성' /> : null}
            {updateToDo ? <UpdateToDo mainTitle='할 일 수정' /> : null}
            {createDashboard ? <CreateDashboard mainTitle='새로운 대시보드' /> : null}
            {passwordMismatch ? <PasswordMismatch mainTitle='비밀번호가 일치하지 않습니다' /> : null}
            {deleteToDo ? <DeleteTodo mainTitle='할 일 카드가 삭제됩니다' /> : null}
            {detailToDo ? <DetailToDo onClose={closeModal} ToDoCardDetail={ToDoCardDetail} /> : null}
          </ModalLayout>
        </>,
        document.getElementById('modal') as HTMLElement,
      )
    : null;
}
