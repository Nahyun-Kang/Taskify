import ModalLayout from '../_component/modalLayout';
import ModalOutside from '../_component/modalOutside';
import ModalPortal from '../_component/modalPortal';
import ModalMainContent from '../_component/modalMainContent';

export default function Base({ content }: { content: string }) {
  const handleClose = () => {};
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
