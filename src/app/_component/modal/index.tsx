'use client';
import ModalLayout from './ModalLayout';
import React, { useState, useEffect } from 'react';

import { CreateColumn, UpdateAndDeleteColumn } from './column';
import { CreateToDo, DeleteTodo, DetailToDo, UpdateToDo, ToDoCardDetail } from './toDoCard';
import { CreateDashboard, InviteDashboard } from './dashBoard';
import { MyPageWrongPW } from './wrongPW';
import { createPortal } from 'react-dom';
import { CompleteSignUp, MismatchPW, UseAlreadyEmail } from './sign';

interface ModalProps {
  detailToDo?: boolean;
  wrongPW?: boolean;
  createDashboard?: boolean;
  updateToDo?: boolean;
  createToDo?: boolean;
  deleteToDo?: boolean;
  createColumn?: boolean;
  btnName: string;
  updateOrDeleteColumn?: boolean;
  setModalType: React.Dispatch<React.SetStateAction<React.ReactElement | null>>;
  btnSize: 'small' | 'large';
  sign: boolean;
  signUpComplete?: boolean;
  mismatchPW?: boolean;
  alreadyUseEmail?: boolean;
  inviteDashBoard?: boolean;
}

// 모달 컴포넌트 특정 프롭스에 따라 조건부 렌더링
export function Modal({
  mismatchPW,
  alreadyUseEmail,
  sign,
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
  wrongPW,
  signUpComplete,
  inviteDashBoard,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const closeModal = () => setModalType(null);

  useEffect(() => setMounted(true), []);

  return mounted
    ? createPortal(
        <>
          {!detailToDo ? (
            <ModalLayout btnName={btnName} onClose={closeModal} btnSize={btnSize} sign={sign}>
              {createColumn ? <CreateColumn mainTitle='새 칼럼 생성' labelTitle='이름' /> : null}
              {updateOrDeleteColumn ? <UpdateAndDeleteColumn mainTitle='칼럼 관리' labelTitle='이름' /> : null}
              {createToDo ? <CreateToDo mainTitle='할 일 생성' /> : null}
              {updateToDo ? <UpdateToDo mainTitle='할 일 수정' /> : null}
              {createDashboard ? <CreateDashboard mainTitle='새로운 대시보드' /> : null}
              {inviteDashBoard ? <InviteDashboard mainTitle='초대하기' /> : null}
              {wrongPW ? <MyPageWrongPW mainTitle='비밀번호가 일치하지 않습니다' /> : null}
              {deleteToDo ? <DeleteTodo mainTitle='할 일 카드가 삭제됩니다' /> : null}
              {signUpComplete ? <CompleteSignUp mainTitle='가입이 완료되었습니다!' /> : null}
              {mismatchPW ? <MismatchPW mainTitle='비밀번호가 일치하지 않습니다.' /> : null}
              {alreadyUseEmail ? <UseAlreadyEmail mainTitle='이미 사용 중인 이메일입니다.' /> : null}
            </ModalLayout>
          ) : (
            <DetailToDo onClose={closeModal} ToDoCardDetail={ToDoCardDetail} />
          )}
        </>,
        document.getElementById('modal') as HTMLElement,
      )
    : null;
}
