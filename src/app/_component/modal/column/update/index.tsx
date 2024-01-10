import { columnTitleValidate, requiredValidate } from '@/src/app/_constant/Input';
import InputForm from '@/src/app/_component/InputForm';
import ModalTitle from '@/src/app/_component/modal/_component/modalTitle';
import ModalLayout from '@/src/app/_component/modal/_component/modalLayout';
import ModalOutside from '@/src/app/_component/modal/_component/modalOutside';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import ModalPortal from '@/src/app/_component/modal/_component/modalPortal';
import { useSetRecoilState } from 'recoil';
import { updateColumnsForColumnId, deleteColumnsForColumnId } from '@/src/app/_recoil/ModalAtom/column';
import { columnState } from '@/src/app/_recoil/ModalAtom/todo';
import { updateColumn } from '@/src/app/_api/column';

export default function UpdateColumn({ columnId }: { columnId: number }) {
  const setUpdateColumnState = useSetRecoilState(updateColumnsForColumnId(columnId));
  const setDeleteColumnState = useSetRecoilState(deleteColumnsForColumnId(columnId));
  const setColumns = useSetRecoilState(columnState);

  const onClose = () => setUpdateColumnState(false);

  const openDeleteColumnModal = () => {
    setUpdateColumnState(false);

    setDeleteColumnState(true);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const newColumn = await updateColumn(data, columnId);
      setColumns((oldColumns) => oldColumns.map((column) => (column.id === columnId ? { ...newColumn } : column)));
    } catch (error) {
      alert(error);
    } finally {
      setUpdateColumnState(null);
    }
  };
  return (
    <>
      <ModalPortal>
        <ModalOutside closeModal={onClose}>
          <InputForm onSubmit={onSubmit as SubmitHandler<FieldValues>}>
            <ModalLayout btnName='변경' btnSize='large' sign={false} onClose={onClose}>
              <ModalTitle title='칼럼 관리' />
              <InputForm.TextInput
                label='이름'
                placeholder='컬럼 제목을 수정해주세요'
                id='title'
                isRequired={true}
                validationRules={{ ...columnTitleValidate, ...requiredValidate }}
              />
              <span
                id='칼럼 삭제'
                onClick={openDeleteColumnModal}
                className='font-Pretendard absolute text-[0.875rem] text-gray40 underline sm:bottom-[4.5rem] sm:left-[1.25rem] md:bottom-[1.75rem] md:left-[1.75rem]'
              >
                삭제하기
              </span>
            </ModalLayout>
          </InputForm>
        </ModalOutside>
      </ModalPortal>
    </>
  );
}
