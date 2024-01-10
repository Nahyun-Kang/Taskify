import ModalLayout from '@/src/app/_component/modal/_component/modalLayout';
import ModalOutside from '@/src/app/_component/modal/_component/modalOutside';
import ModalPortal from '@/src/app/_component/modal/_component/modalPortal';
import ModalMainContent from '@/src/app/_component/modal/_component/modalMainContent';

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
