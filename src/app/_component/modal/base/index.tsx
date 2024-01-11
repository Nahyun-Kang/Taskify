import ModalLayout from '@/src/app/_component/modal/_component/modalLayout';
import ModalOutside from '@/src/app/_component/modal/_component/modalOutside';
import ModalPortal from '@/src/app/_component/modal/_component/modalPortal';
import ModalMainContent from '@/src/app/_component/modal/_component/modalMainContent';
import { useSetRecoilState } from 'recoil';
import { editPasswordState } from '@/src/app/_recoil/ModalAtom/sign';

interface BaseProps {
  content: string;
}

export default function Base({ content }: BaseProps) {
  const setIsOpenUpdatedModal = useSetRecoilState(editPasswordState);
  const handleClose = () => setIsOpenUpdatedModal(false);
  return (
    <ModalPortal>
      <ModalOutside closeModal={handleClose}>
        <ModalLayout btnName='확인' btnSize='large' sign={true} onClose={handleClose}>
          <ModalMainContent content={content} />
        </ModalLayout>
      </ModalOutside>
    </ModalPortal>
  );
}
