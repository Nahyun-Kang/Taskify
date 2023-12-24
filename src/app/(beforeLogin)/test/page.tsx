'use client';

import useRenderModal from '../../_hook/useRenderModal';
import { MODALTYPE } from '../../_constant/modalType';
import { FieldValues } from 'react-hook-form';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
export default function Test() {
  const [modalType, callModal] = useRenderModal();
  const onSubmit = async (form: FieldValues) => {
    try {
      const res = await axiosInstance.post(
        'https://sp-taskify-api.vercel.app/3/cards',
        { ...form, dashboardId: 179, columnId: 562 },
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE5LCJ0ZWFtSWQiOiIzIiwiaWF0IjoxNzAzNDI2MzE4LCJpc3MiOiJzcC10YXNraWZ5In0.XGNmV6eX2yDdPf6oMdi0549AwRmnIl8HYDF4dJCPI6k',
          },
        },
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRenderCreateTodoModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof callModal === 'function') {
      callModal({ name: (e.target as HTMLElement).id, onSubmit });
    }
  };

  return (
    <>
      <div>다른페이지임</div>

      <div onClick={handleRenderCreateTodoModal} id={MODALTYPE.TODO.CREATE}>
        할 일 생성
      </div>
      <div onClick={handleRenderCreateTodoModal} id={MODALTYPE.TODO.CREATE}>
        할 일 생성
      </div>
      {modalType}
    </>
  );
}
