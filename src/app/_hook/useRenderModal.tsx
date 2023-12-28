import { useState, Dispatch, SetStateAction, ReactElement, JSXElementConstructor } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import returnModal from '../_util/returnModal';
import { ToDoCardDetailProps } from '../_component/modal/toDoCard';

interface CallModalType {
  (condition: {
    name: string;
    onSubmit?: SubmitHandler<FieldValues>;
    cardId?: number;
    cardData?: ToDoCardDetailProps;
    columnId?: number;
  }): void;
}

// 특정 모달 컴포넌트가 담겨져있는 state와 모달호출함수를 리턴하는 커스텀 훅
export default function useRenderModal(): [
  React.ReactElement | null,
  CallModalType,
  Dispatch<SetStateAction<ReactElement<unknown, string | JSXElementConstructor<unknown>> | null>>,
] {
  const [modalType, setModalType] = useState<React.ReactElement | null>(null);

  const callModal: CallModalType = (condition) => {
    const newReturnModal = returnModal({ ...condition, setModalType });
    if (newReturnModal) setModalType(newReturnModal);
  };
  return [modalType, callModal, setModalType];
}
