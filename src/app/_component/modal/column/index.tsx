'use client';

import InputForm from '@/src/app/_component/InputForm';
import useRenderModal from '@/src/app/_hook/useRenderModal';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import Cancel from '@/src/app/_component/Button/Cancel';
import Confirm from '@/src/app/_component/Button/Confirm';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { showColumnModalState, columnState } from '@/src/app/_recoil/cardAtom';
import { useRef } from 'react';
import { isAxiosError } from 'axios';
// 컬럼 생성 모달 내용
export function CreateColumn({ mainTitle, labelTitle }: { mainTitle: string; labelTitle: string }) {
  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <InputForm.TextInput label={labelTitle} placeholder='컬럼 제목을 입력해주세요' id='title' isRequired={true} />
    </>
  );
}
// 컬럼 수정 모달  내용 (요구사항에서 컬럼 수정 모달 내에 삭제하기 문구  클릭 시 컬럼 삭제 모달 렌더링하라고 요구해서 아래와 같이 구현  )
export function UpdateColumn({
  mainTitle,
  labelTitle,
  columnId,
  btnName,
  btnSize,
  onClose,
}: {
  mainTitle: string;
  labelTitle: string;
  columnId: number;
  btnName: string;
  btnSize: 'small' | 'large';
  onClose: () => void;
}) {
  const [modalType, callModal] = useRenderModal();
  const [show, setShow] = useRecoilState(showColumnModalState);

  const handleRenderDeleteColumn = () => {
    callModal({ name: '칼럼 삭제', columnId: columnId });
    setShow(false);
  };

  const modalRef = useRef<HTMLDivElement>(null);
  const modalOutSideClick = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current === e.target) {
      console.log(modalRef.current);
      onClose();
    }
  };

  if (!show) return <>{modalType}</>;

  return (
    <>
      <div onClick={modalOutSideClick}>
        <div
          ref={modalRef}
          className='fixed left-0 top-0 z-[1000] flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-70'
        >
          <div className='relative gap-[1.5rem] rounded-[0.5rem] border border-white bg-white sm:w-[20.4375rem] sm:px-[1.25rem] sm:pb-[1.25rem] sm:pt-[1.75rem] md:w-[33.75rem] md:px-[1.75rem] md:pt-[2rem]'>
            <div className=' flex flex-col gap-[2rem]'>
              <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
              <InputForm.TextInput
                label={labelTitle}
                placeholder='컬럼 제목을 수정해주세요'
                id='title'
                isRequired={true}
              />
              <span
                id='칼럼 삭제'
                onClick={handleRenderDeleteColumn}
                className='font-Pretendard absolute text-[0.875rem] text-gray40 underline sm:bottom-[4.5rem] sm:left-[1.25rem] md:bottom-[1.75rem] md:left-[1.75rem]'
              >
                삭제하기
              </span>

              <div className='flex gap-[0.75rem]  sm:justify-between md:justify-end'>
                <Cancel size={btnSize} onClick={onClose} />
                <Confirm btnName={btnName} size={btnSize} onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// 컬럼 삭제 모달 메인 내용

interface DeleteColumnProps {
  mainTitle: string;
  btnName: string;
  btnSize: 'small' | 'large';
  onClose: () => void;
  columnId: number;
}

export function DeleteColumn({ mainTitle, btnName, btnSize, onClose, columnId }: DeleteColumnProps) {
  const [modalType, callModal] = useRenderModal();

  const setColumns = useSetRecoilState(columnState);
  const deleteSubmit = async () => {
    try {
      await axiosInstance.delete(`columns/${columnId}`);
      setColumns((oldColumns) => oldColumns.filter((column) => column.id != columnId));
    } catch (error) {
      if (isAxiosError(error)) {
        const serverErrorMessage = error.response?.data.message;
        return callModal({ name: serverErrorMessage ? serverErrorMessage : error.message });
      }
    } finally {
      onClose();
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);
  const modalOutSideClick = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current === e.target) {
      console.log(modalRef.current);
      onClose();
    }
  };

  return (
    <>
      <div onClick={modalOutSideClick}>
        <div
          ref={modalRef}
          className='fixed left-0 top-0 z-[1000] flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-70'
        >
          <div className='relative gap-[1.5rem] rounded-[0.5rem] border border-white bg-white sm:w-[20.4375rem] sm:px-[1.25rem] sm:pb-[1.25rem] sm:pt-[1.75rem] md:w-[33.75rem] md:px-[1.75rem] md:pt-[2rem]'>
            <div className=' flex flex-col gap-[2rem]'>
              <span className='mb-[3.125rem] flex items-center justify-center text-[1rem] font-medium text-black'>
                {mainTitle}
              </span>
              <div className='flex gap-[0.75rem]  sm:justify-between md:justify-end'>
                <Cancel size={btnSize} onClick={onClose} />
                <Confirm btnName={btnName} size={btnSize} onClick={deleteSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalType}
    </>
  );
}
