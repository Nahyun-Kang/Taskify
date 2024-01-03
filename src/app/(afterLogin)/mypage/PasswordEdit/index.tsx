'use client';

import Confirm from '@/src/app/_component/Button/Confirm';
import InputForm from '@/src/app/_component/InputForm';
import { editPassword } from '@/src/app/_api/users';
import useRenderModal from '@/src/app/_hook/useRenderModal';

export default function PasswordEdit() {
  const [modalType, callModal] = useRenderModal();
  return (
    <div className=''>
      <div className='mb-6 flex flex-col gap-4'>
        <InputForm
          onSubmit={(data) => {
            editPassword(data, callModal);
          }}
        >
          <div className='flex flex-col gap-4 md:gap-5'>
            <InputForm.PasswordInput label='현재 비밀번호' id='password' placeholder='현재 비밀번호 입력' />
            <InputForm.PasswordInput label='새 비밀번호' id='newPassword' placeholder='새 비밀번호 입력' />
            <InputForm.PasswordCheck
              label='새 비밀번호 입력'
              id='new-password-check'
              placeholder='비밀번호 입력'
              passwordId='newPassword'
            />
          </div>
          <div className='flex justify-end'>
            <div className='mt-4 h-7 w-[5.25rem] md:mt-5 md:h-8 md:w-[5.25rem]'>
              <Confirm size='free' btnName='변경' onClick={() => {}} />
            </div>
          </div>
        </InputForm>
      </div>
      {modalType}
    </div>
  );
}
