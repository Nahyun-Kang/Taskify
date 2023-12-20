'use client';

import Cancel from '@/src/app/_component/Button/Cancel';
import React, { ReactNode, useState } from 'react';
import Confirm from '../Button/Corfirm';
import InputField from '../Input/InputField';
import { MouseEvent } from 'react';
import DropdownAndFilter from '../../DropdownAndFilter';
import SelectColor from '../Chip/SelectColor';

interface ModalWrapperProps {
  children: ReactNode;
  btnName: string;
  onClose: (e: MouseEvent<HTMLButtonElement>) => void;
  btnSize: 'small' | 'large';
}

// 모달 레이아웃 + cancelBtn은 커스텀 훅의 modalType을 null로 만들어서 렌더링안되도록 confirmBtn은 api연동할 때 자유롭게 만들 수 있도록
function ModalWrapper({ children, btnName, btnSize, onClose }: ModalWrapperProps) {
  const handleComfirm = () => {};
  return (
    <div className='relative w-[33.75rem] gap-[2rem]'>
      <div className=' flex flex-col'>
        {children}
        <div className='flex justify-end'>
          <Cancel size={btnSize} onClick={onClose} />
          <Confirm btnName={btnName} size={btnSize} onClick={handleComfirm} />
        </div>
      </div>
    </div>
  );
}
ModalWrapper;

// 컬럼 생성 모달 메인내용
function CreateColumn({ mainTitle, labelTitle }: { mainTitle: string; labelTitle: string }) {
  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <InputField labelText={labelTitle} placeholder='컬럼 제목을 입력해주세요' id='columnName' isRequired={true} />
    </>
  );
}
// 컬럼 수정 모달 메인 내용 (요구사항에서 컬럼 수정 모달 내에 삭제하기 문구  클릭 시 컬럼 삭제 모달 렌더링하라고 요구해서 아래와 같이 구현  )
function UpdateAndDeleteColumn({ mainTitle, labelTitle }: { mainTitle: string; labelTitle: string }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const handleRenderDeleteColumn = () => setIsDeleted(true);
  return (
    <>
      {!isDeleted ? (
        <>
          <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
          <InputField labelText={labelTitle} placeholder='컬럼 제목을 수정해주세요' id='columnName' isRequired={true} />
          <span
            onClick={handleRenderDeleteColumn}
            className='font-Pretendard absolute bottom-[1.75rem] left-[1.75rem]  text-[0.875rem] text-gray40 underline'
          >
            삭제하기
          </span>
        </>
      ) : (
        <DeleteColumn mainTitle='컬럼의 모든 카드가 삭제됩니다.' />
      )}
    </>
  );
}
// 컬럼 삭제 모달 메인 내용
function DeleteColumn({ mainTitle }: { mainTitle: string }) {
  return (
    <>
      <span className='flex items-center justify-center text-[1rem]'>{mainTitle}</span>
    </>
  );
}
DeleteColumn;

// 할 일 카드 생성 메인 내용
function CreateToDo({ mainTitle }: { mainTitle: string }) {
  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>;
      <DropdownAndFilter />;
      <InputField labelText='제목' placeholder='제목을 입력해주세요' id='제목' isRequired={true} />
      <InputField labelText='설명' placeholder='설명을 입력해주세요' id='설명' isRequired={true} />
      <InputField.DateInput labelText='마감일' id='날짜' />
      <InputField.TagInput labelText='태그' id='태그' placeholder='입력 후 Enter' />
      <InputField.TagInput labelText='이미지' id='이미지' placeholder='아직 이미지인풋이 없네용' />
    </>
  );
}

function UpdateToDo({ mainTitle }: { mainTitle: string }) {
  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>;
      <DropdownAndFilter />;
      <InputField labelText='제목' placeholder='제목을 입력해주세요' id='제목' isRequired={true} />
      <InputField labelText='설명' placeholder='설명을 입력해주세요' id='설명' isRequired={true} />
      <InputField.DateInput labelText='마감일' id='날짜' />
      <InputField.TagInput labelText='태그' id='태그' placeholder='입력 후 Enter' />
      <InputField.TagInput labelText='이미지' id='이미지' placeholder='아직 이미지인풋이 없네용' />
    </>
  );
}

export function CreateDashboard({ mainTitle }: { mainTitle: string }) {
  const handleSelect = () => {};
  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <InputField
        labelText='대시보드 이름'
        placeholder='대시보드 제목을 입력해주세요'
        id='dashboardName'
        isRequired={true}
      />
      <SelectColor onSelect={handleSelect} />
    </>
  );
}

//비밀번호 불일치 모달
function PasswordMismatch({ mainTitle }: { mainTitle: string }) {
  return (
    <>
      <span className='flex items-center justify-center text-[1rem]'>{mainTitle}</span>
    </>
  );
}

interface ModalProps {
  passwordMismatch?: boolean;
  createDashboard?: boolean;
  updateToDo?: boolean;
  createToDo?: boolean;
  create?: boolean;
  btnName: string;
  update?: boolean;
  setModalType: React.Dispatch<React.SetStateAction<React.ReactElement | null>>;
  btnSize: 'small' | 'large';
}

// 모달 컴포넌트 특정 프롭스에 따라 조건부 렌더링
export function Modal({
  create,
  btnName,
  update,
  setModalType,
  btnSize,
  createToDo,
  updateToDo,
  createDashboard,
  passwordMismatch,
}: ModalProps) {
  const closeModal = () => setModalType(null);

  return (
    <ModalWrapper btnName={btnName} onClose={closeModal} btnSize={btnSize}>
      {create ? <CreateColumn mainTitle='새 칼럼 생성' labelTitle='이름' /> : null}
      {update ? <UpdateAndDeleteColumn mainTitle='칼럼 관리' labelTitle='이름' /> : null}
      {createToDo ? <CreateToDo mainTitle='할 일 생성' /> : null}
      {updateToDo ? <UpdateToDo mainTitle='할 일 수정' /> : null}
      {createDashboard ? <CreateDashboard mainTitle='새로운 대시보드' /> : null}
      {passwordMismatch ? <PasswordMismatch mainTitle='비밀번호가 일치하지 않습니다' /> : null}
    </ModalWrapper>
  );
}
// 모달 생성 함수 (특정 태그의 이벤트 아이디 값에 따라 조건부 렌더링)
function createModal(modalName: string, setModalType: React.Dispatch<React.SetStateAction<React.ReactElement | null>>) {
  switch (modalName) {
    case '새 칼럼 생성':
      return <Modal create btnName='생성' setModalType={setModalType} btnSize='large' />;
    case '칼럼 관리':
      return <Modal update btnName='변경' setModalType={setModalType} btnSize='large' />;
    case '할 일 생성':
      return <Modal createToDo btnName='생성' setModalType={setModalType} btnSize='large' />;
    case '할 일 수정':
      return <Modal updateToDo btnName='수정' setModalType={setModalType} btnSize='large' />;
    case '새로운 대시보드':
      return <Modal createDashboard btnName='생성' setModalType={setModalType} btnSize='large' />;
    case '비밀번호 불일치':
      return <Modal passwordMismatch btnName='확인' setModalType={setModalType} btnSize='large' />;
  }
}

// 특정 모달과 모달호출함수를 리턴하는 커스텀 훅
export default function useRenderModal(): [React.ReactElement | null, (name: string) => void] {
  const [modalType, setModalType] = useState<React.ReactElement | null>(null);

  const callModal = (name: string) => {
    const returnModal = createModal(name, setModalType);
    if (returnModal) setModalType(returnModal);
  };

  return [modalType, callModal];
}
