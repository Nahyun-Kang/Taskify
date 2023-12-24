import { useState } from 'react';
import returnModal from '../_util/returnModal';

// 특정 모달 컴포넌트가 담겨져있는 state와 모달호출함수를 리턴하는 커스텀 훅
export default function useRenderModal(): [React.ReactElement | null, (name: string) => void] {
  const [modalType, setModalType] = useState<React.ReactElement | null>(null);

  const callModal = (name: string) => {
    const newReturnModal = returnModal(name, setModalType);
    if (newReturnModal) setModalType(newReturnModal);
  };

  return [modalType, callModal];
}
