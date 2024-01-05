import { columnTitleValidate, requiredValidate } from '@/src/app/_constant/Input';
import InputForm from '../../../InputForm';
import ModalTitle from '../../_component/modalTitle';
import ModalLayout from '@/src/app/_component/modal2/_component/modalLayout';
import ModalOutside from '../../_component/modalOutside';

export function CreateColumn() {
  const handleClose = () => {};
  return (
    <>
      <ModalOutside>
        <ModalLayout btnName='생성' btnSize='large' sign={false} onClose={handleClose} onSubmit={() => {}}>
          <ModalTitle title='칼럼 생성' />
          <InputForm.TextInput
            label='이름'
            placeholder='컬럼 제목을 입력해주세요'
            id='title'
            validationRules={{ ...columnTitleValidate, ...requiredValidate }}
          />
        </ModalLayout>
      </ModalOutside>
    </>
  );
}
