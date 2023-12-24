'use client';

import useRenderModal from '../../_hook/useRenderModal';
import { MODALTYPE } from '../../_constant/modalType';
import { FieldValues } from 'react-hook-form';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { useEffect, useState } from 'react';
import { ToDoCardDetailProps } from '../../_component/modal/toDoCard';

export default function Test() {
  const [modalType, callModal] = useRenderModal();
  const [cardData, setCardData] = useState(null);
  const onSubmit = async (form: FieldValues) => {
    try {
      const res = await axiosInstance.post('cards', { ...form, dashboardId: 14, columnId: 50 });

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

  const handleRenderDetaildoModal = async (e: React.MouseEvent<HTMLDivElement>, cardData: ToDoCardDetailProps) => {
    if (typeof callModal === 'function') {
      callModal({ name: (e.target as HTMLElement).id, cardData: cardData });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('cards/60');
        const cardData = res.data;
        console.log(cardData);
        setCardData(cardData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); // 비동기 함수 호출
  }, []);
  if (!cardData) return;
  return (
    <>
      <div>다른페이지임</div>

      <div onClick={handleRenderCreateTodoModal} id={MODALTYPE.TODO.CREATE}>
        할 일 생성
      </div>
      <div onClick={handleRenderCreateTodoModal} id={MODALTYPE.TODO.UPDATE}>
        할 일 수정
      </div>
      <div onClick={(e) => handleRenderDetaildoModal(e, cardData)} id={MODALTYPE.TODO.DETAIL}>
        할 일 상세
      </div>
      {modalType}
    </>
  );
}
