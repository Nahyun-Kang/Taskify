import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import returnModal from '../_util/returnModal';
import { ToDoCardDetailProps } from '../_component/modal/toDoCard';

interface CallModalType {
  (condition: { name: string; onSubmit?: SubmitHandler<FieldValues>; cardData?: ToDoCardDetailProps }): void;
}

// 특정 모달 컴포넌트가 담겨져있는 state와 모달호출함수를 리턴하는 커스텀 훅
export default function useRenderModal() {
  const [modalType, setModalType] = useState<React.ReactElement | null>(null);

  const callModal: CallModalType = ({ name, onSubmit, cardData }) => {
    const newReturnModal = returnModal(setModalType, name, onSubmit, cardData);
    if (newReturnModal) setModalType(newReturnModal);
  };
  return [modalType, callModal];
}
