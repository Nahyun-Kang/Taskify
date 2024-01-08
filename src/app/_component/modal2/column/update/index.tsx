import { columnTitleValidate, requiredValidate } from '@/src/app/_constant/Input';
import InputForm from '../../../InputForm';
import ModalTitle from '../../_component/modalTitle';
import ModalLayout from '@/src/app/_component/modal2/_component/modalLayout';
import ModalOutside from '../../_component/modalOutside';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import ModalPortal from '../../_component/modalPortal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { updateColumnsForColumnId, deleteColumnsForColumnId } from '@/src/app/_recoil/ModalAtom/columnAtom';
import { columnState } from '@/src/app/_recoil/CardAtom';
import { axiosInstance } from '@/src/app/_util/axiosInstance';

export default function UpdateColumn2({ columnId }: { columnId: number }) {
  const [updateColumnState, setUpdateColumnState] = useRecoilState(updateColumnsForColumnId(columnId));
  const setDeleteColumnState = useSetRecoilState(deleteColumnsForColumnId(columnId));
  const setColumns = useSetRecoilState(columnState);

  const onClose = () => setUpdateColumnState(null);

  const openDeleteColumnModal = () => {
    setUpdateColumnState(false);
    setDeleteColumnState(true);
  };

  const onSubmit = async (form: FieldValues) => {
    try {
      const res = await axiosInstance.put(`columns/${columnId}`, { ...form });
      setColumns((oldColumns) => oldColumns.map((column) => (column.id === columnId ? { ...res.data } : column)));
    } catch (error) {
      alert(error);
    } finally {
      setUpdateColumnState(null);
    }
  };
  return (
    <>
      {updateColumnState && (
        <ModalPortal>
          <ModalOutside>
            <InputForm onSubmit={onSubmit as SubmitHandler<FieldValues>}>
              <ModalLayout btnName='생성' btnSize='large' sign={false} onClose={onClose}>
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
      )}
    </>
  );
}
