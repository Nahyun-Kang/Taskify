import { useState, Dispatch } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

import returnModal from '@/src/app/_util/returnModal';
import { ToDoCardDetailProps } from '@/src/app/_component/modal/toDoCard/type';

export interface CallModalType {
  (condition: {
    name: string;
    onSubmit?: SubmitHandler<FieldValues>;
    cardId?: number;
    cardData?: ToDoCardDetailProps;
    columnId?: number;
  }): void;
}

export default function useRenderModal(): [
  React.ReactElement | null,
  CallModalType,
  Dispatch<React.SetStateAction<React.ReactElement | null>>,
] {
  const [modalType, setModalType] = useState<React.ReactElement | null>(null);

  const callModal: CallModalType = (condition) => {
    const newReturnModal = returnModal({ ...condition, setModalType });
    if (newReturnModal) {
      setModalType(newReturnModal);
    }
  };
  return [modalType, callModal, setModalType];
}
