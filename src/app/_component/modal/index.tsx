'use client';
import React, { useEffect, useState } from 'react';
import ModalLayout from './ModalLayout';

import { createPortal } from 'react-dom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import InputForm from '../InputForm';
import { CreateColumn, UpdateColumn, DeleteColumn } from './column';
import { CreateDashboard, InviteDashboard } from './dashBoard';
import { CompleteSignUp, MismatchPW, UseAlreadyEmail } from './sign';
import { CreateToDo, DeleteTodo, DetailToDo, ToDoCardDetailProps, UpdateToDo } from './toDoCard';
import { Base } from './base';

interface ModalProps {
  detailToDo?: boolean;
  base?: boolean;
  createDashboard?: boolean;
  updateToDo?: boolean;
  createToDo?: boolean;
  deleteToDo?: boolean;
  createColumn?: boolean;
  btnName: string;
  updateColumn?: boolean;
  deleteColumn?: boolean;
  setModalType: React.Dispatch<React.SetStateAction<React.ReactElement | null>>;
  btnSize: 'small' | 'large';
  sign: boolean;
  signUpComplete?: boolean;
  mismatchPW?: boolean;
  alreadyUseEmail?: boolean;
  inviteDashBoard?: boolean;
  onSubmit?: SubmitHandler<FieldValues>;
  cardId?: number;
  cardData?: ToDoCardDetailProps;
  columnId?: number;
  content?: string;
}

// 모달 컴포넌트 특정 프롭스에 따라 조건부 렌더링
export function Modal({
  mismatchPW,
  alreadyUseEmail,
  sign,
  detailToDo,
  createColumn,
  btnName,
  updateColumn,
  deleteColumn,
  setModalType,
  btnSize,
  deleteToDo,
  createToDo,
  updateToDo,
  createDashboard,
  base,
  signUpComplete,
  inviteDashBoard,
  onSubmit,
  cardId,
  cardData,
  columnId,
  content,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const closeModal = () => {
    setModalType(null);
  };

  useEffect(() => setMounted(true), []);

  return mounted
    ? createPortal(
        <>
          {!detailToDo ? (
            !deleteColumn ? (
              <ModalLayout btnName={btnName} onClose={closeModal} btnSize={btnSize} sign={sign}>
                {createColumn ? <CreateColumn mainTitle='새 칼럼 생성' labelTitle='이름' /> : null}
                {updateColumn && columnId ? (
                  <UpdateColumn mainTitle='칼럼 관리' labelTitle='이름' columnId={columnId} />
                ) : null}

                {createToDo ? <CreateToDo mainTitle='할 일 생성' /> : null}
                {updateToDo && cardData ? <UpdateToDo mainTitle='할 일 수정' cardData={cardData} /> : null}
                {createDashboard ? <CreateDashboard mainTitle='새로운 대시보드' /> : null}
                {inviteDashBoard ? <InviteDashboard mainTitle='초대하기' /> : null}
                {wrongPW ? <MyPageWrongPW mainTitle='비밀번호가 일치하지 않습니다' /> : null}
                {deleteToDo ? <DeleteTodo mainTitle='할 일 카드가 삭제됩니다' /> : null}
                <InputForm onSubmit={onSubmit as SubmitHandler<FieldValues>}>
                  {signUpComplete ? <CompleteSignUp mainTitle='가입이 완료되었습니다!' /> : null}
                  {mismatchPW ? <MismatchPW mainTitle='비밀번호가 일치하지 않습니다.' /> : null}
                  {alreadyUseEmail ? <UseAlreadyEmail mainTitle='이미 사용 중인 이메일입니다.' /> : null}
                </InputForm>
              </ModalLayout>
            ) : (
              <DeleteColumn
                mainTitle='칼럼의 모든 카드가 삭제됩니다'
                btnName={btnName}
                btnSize={btnSize}
                onClose={closeModal}
                columnId={columnId as number}
              />
            )
          ) : (
            <InputForm onSubmit={onSubmit as SubmitHandler<FieldValues>}>
              <DetailToDo onClose={closeModal} cardId={cardId as number} />
            </InputForm>
          )}
        </>,
        document.getElementById('modal') as HTMLElement,
      )
    : null;
}
