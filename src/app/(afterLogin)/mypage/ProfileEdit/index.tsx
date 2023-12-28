'use client';

import InputForm from '@/src/app/_component/InputForm';
import AddImageFile from '../../_component/AddImageFile';
import Confirm from '@/src/app/_component/Button/Confirm';
import { getInputClass, InputWrapper, Label } from '@/src/app/_component/InputForm/InputStyle';
import editUser from '@/src/app/_api/users/editUser';
import useRenderModal from '@/src/app/_hook/useRenderModal';

export default function ProfileEdit() {
  const inputClass = getInputClass(false) + ' text-gray40';
  const [modalType, callModal] = useRenderModal();

  return (
    <div>
      <div className='flex w-full'>
        <InputForm
          onSubmit={(data) => {
            editUser(data, callModal);
          }}
        >
          <div className='flex flex-col gap-6 md:flex-row md:gap-4'>
            <AddImageFile size='big' />
            <div className='flex w-full flex-col gap-4 md:gap-5'>
              <InputWrapper>
                <Label label='이메일' htmlFor='email' />
                <div className={inputClass}>사용자 이메일</div>
              </InputWrapper>
              <InputForm.TextInput
                label='닉네임'
                placeholder='닉네임 입력'
                id='nickname'
                validationRules={{ required: { value: true, message: '닉네임을 입력해주세요' } }}
                initialValue='유저 닉네임'
              />
            </div>
          </div>
          <div className='flex w-full justify-end'>
            <div className='mt-4 h-7 w-[5.25rem] md:mt-5 md:h-8 md:w-[5.25rem]'>
              <Confirm size='free' btnName='저장' onClick={() => {}} />
            </div>
          </div>
        </InputForm>
        <div className='flex flex-grow flex-col justify-center gap-4 md:ml-4'></div>
      </div>
      {modalType}
    </div>
  );
}
