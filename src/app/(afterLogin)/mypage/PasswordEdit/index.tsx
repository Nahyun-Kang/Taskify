'use client';

import Confirm from '@/src/app/_component/Button/Confirm';
import InputForm from '@/src/app/_component/InputForm';
import Base from '@/src/app/_component/modal/base';
import { useRecoilState } from 'recoil';
import { editPasswordState } from '@/src/app/_recoil/ModalAtom/sign';
import { editPassword } from '@/src/app/_api/users';
import { FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function PasswordEdit() {
  const [isOpenUpdatedModal, setIsOpenUpdatedModal] = useRecoilState(editPasswordState);

  const onSubmit = async (data: FieldValues) => {
    try {
      await editPassword(data);
    } catch (error) {
    } finally {
      setIsOpenUpdatedModal(true);
    }
  };

  return (
    <div className=''>
      <div className='mb-6 flex flex-col gap-4'>
        <InputForm onSubmit={onSubmit}>
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
      {isOpenUpdatedModal ? <Base content='비밀번호가 변경되었습니다.' /> : null}
    </div>
  );
}
