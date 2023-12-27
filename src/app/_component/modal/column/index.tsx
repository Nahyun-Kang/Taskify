'use client';

import InputForm from '../../InputForm';
import useRenderModal from '@/src/app/_hook/useRenderModal';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
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
export function UpdateAndDeleteColumn({ mainTitle, labelTitle }: { mainTitle: string; labelTitle: string }) {
  const [modalType, callModal] = useRenderModal();

  const deleteSubmit = async () => {
    try {
      await axiosInstance.delete(`columns/40`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRenderDeleteColumn = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (typeof callModal === 'function') {
      callModal({ name: (e.target as HTMLElement).id, onSubmit: deleteSubmit });
    }
  };

  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <InputForm.TextInput label={labelTitle} placeholder='컬럼 제목을 수정해주세요' id='title' isRequired={true} />
      <span
        id='칼럼 삭제'
        onClick={handleRenderDeleteColumn}
        className='font-Pretendard absolute text-[0.875rem] text-gray40 underline sm:bottom-[4.5rem] sm:left-[1.25rem] md:bottom-[1.75rem] md:left-[1.75rem]'
      >
        삭제하기
      </span>
      {modalType}
    </>
  );
}
// 컬럼 삭제 모달 메인 내용
export function DeleteColumn({ mainTitle }: { mainTitle: string }) {
  return (
    <>
      <span className='flex items-center justify-center text-[1rem] font-medium text-black'>{mainTitle}</span>
    </>
  );
}
