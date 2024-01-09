import ModalLayout from '../../_component/modalLayout';
import ModalOutside from '../../_component/modalOutside';
import ModalPortal from '../../_component/modalPortal';
import ModalMainContent from '../../_component/modalMainContent';

export default function MismatchPW() {
  const handleClose = () => {};
  return (
    <ModalPortal>
      <ModalOutside closeModal={handleClose}>
        <ModalLayout btnName='확인' btnSize='large' sign={true} onClose={handleClose}>
          <ModalMainContent content='비밀번호가 일치하지 않습니다.' />
        </ModalLayout>
      </ModalOutside>
    </ModalPortal>
  );
}
