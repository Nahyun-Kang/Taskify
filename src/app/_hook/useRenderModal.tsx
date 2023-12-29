import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import returnModal from '@/src/app/_util/returnModal';
import { ToDoCardDetailProps } from '@/src/app/_component/modal/toDoCard';
import { modalNameState } from '@/src/app/_recoil/ModalNameAtom';

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
export default function useRenderModal(): [React.ReactElement | null, CallModalType] {
  const [modalType, setModalType] = useState<React.ReactElement | null>(null);
  const setRecoilModalType = useSetRecoilState(modalNameState);

  const callModal: CallModalType = (condition) => {
    const newReturnModal = returnModal({ ...condition, setModalType });
    const modalName = condition.name;
    if (newReturnModal) {
      setModalType(newReturnModal);
      setRecoilModalType(modalName);
    }
  };
  return [modalType, callModal];
}
