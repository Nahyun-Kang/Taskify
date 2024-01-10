import ModalLayout from '@/src/app/_component/modal/_component/modalLayout';
import ModalOutside from '@/src/app/_component/modal/_component/modalOutside';
import ModalMainContent from '@/src/app/_component/modal/_component/modalMainContent';
import InputForm from '@/src/app/_component/InputForm';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import ModalPortal from '@/src/app/_component/modal/_component/modalPortal';
import { useSetRecoilState } from 'recoil';
import { deleteColumnsForColumnId } from '@/src/app/_recoil/ModalAtom/column';
import { columnState } from '@/src/app/_recoil/ModalAtom/todo';
import { deleteColumn } from '@/src/app/_api/column';

export default function DeleteColumn({ columnId }: { columnId: number }) {
  const setIsOpenDeleteColumn = useSetRecoilState(deleteColumnsForColumnId(columnId));
  const handleClose = () => setIsOpenDeleteColumn(false);
  const setColumns = useSetRecoilState(columnState);

  const onSubmit = async () => {
    try {
      await deleteColumn(columnId);
      setColumns((oldColumns) => oldColumns.filter((column) => column.id != columnId));
    } catch (error) {
    } finally {
      setIsOpenDeleteColumn(false);
    }
  };
  return (
    <>
      <ModalPortal>
        <ModalOutside closeModal={handleClose}>
          <InputForm onSubmit={onSubmit as SubmitHandler<FieldValues>}>
            <ModalLayout btnName='삭제' btnSize='large' sign={false} onClose={handleClose}>
              <ModalMainContent content='칼럼의 모든 카드가 삭제됩니다.' />
            </ModalLayout>
          </InputForm>
        </ModalOutside>
      </ModalPortal>
    </>
  );
}
