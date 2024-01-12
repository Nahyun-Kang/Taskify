'use client';
import { columnTitleValidate, requiredValidate } from '@/src/app/_constant/Input';
import InputForm from '@/src/app/_component/InputForm';
import ModalTitle from '@/src/app/_component/modal/_component/modalTitle';
import ModalLayout from '@/src/app/_component/modal/_component/modalLayout';
import ModalOutside from '@/src/app/_component/modal/_component/modalOutside';
import { SubmitHandler } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import ModalPortal from '@/src/app/_component/modal/_component/modalPortal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { createColumnState } from '@/src/app/_recoil/ModalAtom/column';
import { columnState } from '@/src/app/_recoil/ModalAtom/todo';
import { createColumn } from '@/src/app/_api/column';

export default function CreateColumn({ dashboardId }: { dashboardId: string }) {
  const setCreateColumn = useSetRecoilState(createColumnState);
  const [columns, setColumns] = useRecoilState(columnState);
  const handleClose = () => setCreateColumn(false);

  const checkDuplicated = (value: string) => {
    return columns.find((column) => column.title === value) ? '중복된 칼럼 이름입니다.' : true;
  };
  const onSubmit = async (form: FieldValues) => {
    const titleValue = form.title;
    try {
      const newColumn = await createColumn(titleValue, +dashboardId);
      setColumns((oldColumns) => [...oldColumns, newColumn]);
    } catch (error) {
    } finally {
      setCreateColumn(false);
    }
  };
  return (
    <>
      <ModalPortal>
        <ModalOutside closeModal={handleClose}>
          <InputForm onSubmit={onSubmit as SubmitHandler<FieldValues>}>
            <ModalLayout btnName='생성' btnSize='large' sign={false} onClose={handleClose}>
              <ModalTitle title='칼럼 생성' />
              <InputForm.TextInput
                label='이름'
                placeholder='컬럼 제목을 입력해주세요'
                id='title'
                validationRules={{
                  ...columnTitleValidate,
                  ...requiredValidate,
                  validate: {
                    checkDuplicated,
                  },
                }}
              />
            </ModalLayout>
          </InputForm>
        </ModalOutside>
      </ModalPortal>
    </>
  );
}
