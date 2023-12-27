'use client';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import Sign from '../../_component/Button/Sign';
import InputForm from '../../_component/InputForm';
import AuthLayout from '../_component/Auth/AuthLayout';
import { AUTH_MESSAGE } from '../_constants/auth';

export default function LogIn() {
  const methods = useForm<FieldValues>({ mode: 'onBlur', reValidateMode: 'onChange' });
  const handleClick = () => {};

  return (
    <AuthLayout message={AUTH_MESSAGE.logIn}>
      <FormProvider {...methods}>
        <form className='w-full' noValidate>
          <div className='mb-[1rem]'>
            <InputForm.EmailInput label='이메일' placeholder='이메일을 입력해 주세요' id='email' />
          </div>
          <div className='mb-[1.25rem]'>
            <InputForm.PasswordInput label='비밀번호' placeholder='비밀번호를 입력해 주세요' id='password' />
          </div>
          <Sign size='small' isActive={false} onClick={handleClick} />
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
