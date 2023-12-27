'use client';

import useRenderModal from '@/src/app/_hook/useRenderModal';
import { MODALTYPE } from '../../_constant/modalType';
import { FieldValues } from 'react-hook-form';
import { axiosInstance } from '@/src/app/_util/axiosInstance';

export default function Test() {
  const [modalType, callModal] = useRenderModal();

  // 할 일 카드 생성을 위한 onSubmit 함수 및  호출 함수
  const onSubmitForCreateToDo = async (form: FieldValues) => {
    try {
      const res = await axiosInstance.post('cards', { ...form, dashboardId: 14, columnId: 50 });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRenderCreateTodoModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof callModal === 'function') {
      callModal({ name: (e.target as HTMLElement).id, onSubmit: onSubmitForCreateToDo });
    }
  };

  // 할 일 카드 상세 모달을 호출하기 위한 함수
  const handleRenderDetaildoModal = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof callModal === 'function') {
      callModal({ name: (e.target as HTMLElement).id, cardId: 59 });
    }
  };

  // 칼럼 생성을 위한 서브밋 함수

  const onSubmitForCreateColumn = async (form: FieldValues) => {
    try {
      await axiosInstance.post('columns', { ...form, dashboardId: 14 });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRenderCreateColumn = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof callModal === 'function') {
      callModal({ name: (e.target as HTMLElement).id, onSubmit: onSubmitForCreateColumn });
    }
  };
  // 칼럼 수정을 위한 서브밋 함수
  const onSubmitForUpdateColumn = async (form: FieldValues) => {
    try {
      await axiosInstance.put('columns/1233', { ...form });
    } catch (error) {
      console.log(error);
    }
  };

  // 칼럼 수정 모달 호출을 위한 함수

  const handleRenderUpdateColumn = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof callModal === 'function') {
      callModal({
        name: (e.target as HTMLElement).id,
        onSubmit: onSubmitForUpdateColumn,
        columnId: 1233,
      });
    }
  };

  return (
    <>
      <div>다른페이지임</div>

      <div onClick={handleRenderCreateTodoModal} id={MODALTYPE.TODO.CREATE}>
        할 일 생성
      </div>
      <div onClick={handleRenderCreateTodoModal} id={MODALTYPE.TODO.UPDATE}>
        할 일 수정
      </div>
      <div onClick={handleRenderDetaildoModal} id={MODALTYPE.TODO.DETAIL}>
        할 일 상세
      </div>

      <div className='border border-[black]'></div>

      <div id={MODALTYPE.COLUMN.CREATE} onClick={handleRenderCreateColumn}>
        칼럼 생성
      </div>
      <div id={MODALTYPE.COLUMN.UPDATE} onClick={handleRenderUpdateColumn}>
        칼럼 수정
      </div>
      <div>칼럼 삭제</div>

      {modalType}
    </>
  );
}
