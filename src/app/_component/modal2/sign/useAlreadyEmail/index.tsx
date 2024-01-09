import ModalLayout from '../../_component/modalLayout';
import ModalOutside from '../../_component/modalOutside';
import ModalPortal from '../../_component/modalPortal';
import ModalMainContent from '../../_component/modalMainContent';
import { useSetRecoilState } from 'recoil';
import { useAlreadyEmailState } from '@/src/app/_recoil/ModalAtom/signAtom';
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
