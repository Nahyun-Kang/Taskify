import { FieldValues, SubmitHandler } from 'react-hook-form';
import InputForm from '../../../InputForm';
import ModalLayout from '../../_component/modalLayout';
import ModalOutside from '../../_component/modalOutside';
import ModalPortal from '../../_component/modalPortal';
import ModalTitle from '../../_component/modalTitle';
import { dashboardTitleValidate } from '@/src/app/_constant/Input';

export default function CreateDashboard() {
  const handleClose = () => {};
  return (
    <ModalPortal>
      <ModalOutside closeModal={handleClose}>
        <InputForm onSubmit={onsubmit as SubmitHandler<FieldValues>}>
          <ModalLayout btnName='생성' btnSize='large' sign={false} onClose={handleClose}>
            <ModalTitle title='새로운 대시보드' />
            <InputForm.TextInput
              label='대시보드 이름'
              placeholder='대시보드 제목을 입력해주세요'
              id='title'
              validationRules={dashboardTitleValidate}
            />
          </ModalLayout>
        </InputForm>
      </ModalOutside>
    </ModalPortal>
  );
}
