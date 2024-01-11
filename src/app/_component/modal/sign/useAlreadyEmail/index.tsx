import ModalLayout from '@/src/app/_component/modal/_component/modalLayout';
import ModalOutside from '@/src/app/_component/modal/_component/modalOutside';
import ModalPortal from '@/src/app/_component/modal/_component/modalPortal';
import ModalMainContent from '@/src/app/_component/modal/_component/modalMainContent';
import { useSetRecoilState } from 'recoil';
import { useAlreadyEmailState } from '@/src/app/_recoil/ModalAtom/sign';

export default function UseAlreadyEmail() {
  const setIsOpenErrorModal = useSetRecoilState(useAlreadyEmailState);
  const handleClose = () => setIsOpenErrorModal(false);
  return (
    <ModalPortal>
      <ModalOutside closeModal={handleClose}>
        <ModalLayout btnName='확인' btnSize='large' sign={true} onClose={handleClose}>
          <ModalMainContent content='이미 사용 중인 이메일입니다.' />
        </ModalLayout>
      </ModalOutside>
    </ModalPortal>
  );
}
