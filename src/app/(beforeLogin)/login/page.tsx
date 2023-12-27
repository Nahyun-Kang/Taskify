'use client';
import { FormEvent } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Sign from '../../_component/Button/Sign';
import InputForm from '../../_component/InputForm';
import AuthLayout from '../_component/Auth/AuthLayout';
import { AUTH_MESSAGE } from '../_constants/auth';
import { axiosInstance } from '../../_util/axiosInstance';
import useRenderModal from '../../_hook/useRenderModal';

export default function LogIn() {
  const methods = useForm<FieldValues>({ mode: 'onBlur', reValidateMode: 'onChange' });
  const [modalType, callModal] = useRenderModal();
  // const router = useRouter();

  const handleLogin = async () => {
    const { email, password } = methods.getValues();
    const BODY_DATA = {
      email: email,
      password: password,
    };
    try {
      const res = await axiosInstance.post('auth/login', BODY_DATA);
      console.log(res);
      // router.push('/boards');
    } catch (error) {
      console.log(error);
      if (error.response.status === 400 && error.response.data.message === '비밀번호가 일치하지 않습니다.') {
        callModal('비밀번호가 일치하지 않습니다.', () => {});
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <AuthLayout message={AUTH_MESSAGE.logIn}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} className='w-full' noValidate>
          <div className='mb-[1rem]'>
            <InputForm.EmailInput label='이메일' placeholder='이메일을 입력해 주세요' id='email' />
          </div>
          <div className='mb-[1.25rem]'>
            <InputForm.PasswordInput label='비밀번호' placeholder='비밀번호를 입력해 주세요' id='password' />
          </div>
          <Sign size='small' isActive={true} type='submit' />
        </form>
        {modalType}
      </FormProvider>
    </AuthLayout>
  );
}
