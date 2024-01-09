import { FieldValues, SubmitHandler } from 'react-hook-form';
import InputForm from '../../../InputForm';
import ModalLayout from '../../_component/modalLayout';
import ModalOutside from '../../_component/modalOutside';
import ModalPortal from '../../_component/modalPortal';
import ModalTitle from '../../_component/modalTitle';

export default function InviteDashboard() {
  const handleClose = () => {};
  return (
    <ModalPortal>
      <ModalOutside closeModal={handleClose}>
        <InputForm onSubmit={onsubmit as SubmitHandler<FieldValues>}>
          <ModalLayout btnName='초대' btnSize='large' sign={false} onClose={handleClose}>
            <ModalTitle title='초대하기' />
            <InputForm.TextInput label='이메일' placeholder='이메일을 입력해주세요' id='title' isRequired={true} />
          </ModalLayout>
        </InputForm>
      </ModalOutside>
    </ModalPortal>
  );
}
