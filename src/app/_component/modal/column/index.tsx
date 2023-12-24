'use client';

import { useState } from 'react';
import InputForm from '../../InputForm';

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
  const [isDeleted, setIsDeleted] = useState(false);
  const handleRenderDeleteColumn = () => setIsDeleted(true);
  return (
    <>
      {!isDeleted ? (
        <>
          <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
          <InputForm.TextInput label={labelTitle} placeholder='컬럼 제목을 수정해주세요' id='title' isRequired={true} />
          <span
            onClick={handleRenderDeleteColumn}
            className='font-Pretendard absolute text-[0.875rem] text-gray40 underline sm:bottom-[4.5rem] sm:left-[1.25rem] md:bottom-[1.75rem] md:left-[1.75rem]'
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
export function DeleteColumn({ mainTitle }: { mainTitle: string }) {
  return (
    <>
      <span className='flex items-center justify-center text-[1rem] font-medium text-black'>{mainTitle}</span>
    </>
  );
}
