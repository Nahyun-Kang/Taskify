'use client';

import { columnTitleValidate, requiredValidate } from '@/src/app/_constant/Input';
import InputForm from '../../../InputForm';
import ModalTitle from '../../_component/modalTitle';
import ModalLayout from '@/src/app/_component/modal2/_component/modalLayout';
import ModalOutside from '../../_component/modalOutside';
import { SubmitHandler } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import ModalPortal from '../../_component/modalPortal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { createColumnState } from '@/src/app/_recoil/ModalAtom/columnAtom';
import { columnState } from '@/src/app/_recoil/CardAtom';
import { Column } from '@/src/app/(afterLogin)/_constant/type';
import { createColumn } from '@/src/app/_api/column';

export function CreateColumn2({ dashboardId }: { dashboardId: string }) {
  const setCreateColumn = useSetRecoilState(createColumnState);
  const [columns, setColumns] = useRecoilState(columnState);

  const handleClose = () => setCreateColumn(false);
  const onSubmit = async (form: FieldValues) => {
    const titleValue = form.title;
    try {
      if (columns.find((column) => column.title === titleValue)) {
        alert('중복된 컬럼 이름입니다.');
        return;
      }
      const newColumn = await createColumn(titleValue, +dashboardId);
      setColumns((oldColumns: Column[]) => [...oldColumns, newColumn]);
    } catch (error) {
      alert(error);
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
                validationRules={{ ...columnTitleValidate, ...requiredValidate }}
              />
            </ModalLayout>
          </InputForm>
        </ModalOutside>
      </ModalPortal>
    </>
  );
}
