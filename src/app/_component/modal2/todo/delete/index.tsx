import ModalTitle from '../../_component/modalTitle';
import ModalLayout from '@/src/app/_component/modal2/_component/modalLayout';
import ModalOutside from '../../_component/modalOutside';
import ModalMainContent from '../../_component/modalMainContent';
import ModalPortal from '../../_component/modalPortal';
export function DeleteTodo2() {
  const handleClose = () => {};
  return (
    <>
      <ModalPortal>
        <ModalOutside>
          <ModalLayout btnName='삭제' btnSize='large' sign={false} onClose={handleClose} onSubmit={() => {}}>
            <ModalTitle title='할 일 삭제' />
            <ModalMainContent content='할 일 카드가 삭제됩니다' />
          </ModalLayout>
        </ModalOutside>
      </ModalPortal>
    </>
  );
}
