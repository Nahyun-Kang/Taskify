'use client';
import { FormEvent } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Sign from '@/src/app/_component/Button/Sign';
import InputForm from '@/src/app/_component/InputForm';
import AuthLayout from '@/src/app/(beforeLogin)/_component/Auth/AuthLayout';
import { AUTH_MESSAGE } from '@/src/app/(beforeLogin)/_constants/auth';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import useRenderModal from '@/src/app/_hook/useRenderModal';
import { accessTokenState, userInfoState } from '@/src/app/_recoil/AuthAtom';

export default function LogIn() {
  const methods = useForm<FieldValues>({ mode: 'onBlur', reValidateMode: 'onChange' });
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [token, setToken] = useRecoilState(accessTokenState);
  const [modalType, callModal] = useRenderModal();
  const router = useRouter();

  //TODO: 에러 분기 처리
  const handleLogin = async () => {
    const { email, password } = methods.getValues();
    const BODY_DATA = {
      email: email,
      password: password,
    };
    try {
      const res = await axiosInstance.post('auth/login', BODY_DATA);
      const userInfo = res.data.user;
      const accessToken = res.data.accessToken;
      setToken(accessToken);
      setUserInfo(userInfo);

      router.push('/boards');
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const response = error.response;

        if (response && response.status === 400 && response.data.message === '비밀번호가 일치하지 않습니다.') {
          callModal({ name: '비밀번호가 일치하지 않습니다.', onSubmit: () => {} });
        }
      }
    }
  };

  console.log(userInfo);
  console.log(token);

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
