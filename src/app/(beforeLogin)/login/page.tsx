'use client';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Sign from '@/src/app/_component/Button/Sign';
import InputForm from '@/src/app/_component/InputForm';
import AuthLayout from '@/src/app/(beforeLogin)/_component/Auth/AuthLayout';
import { AUTH_MESSAGE } from '@/src/app/(beforeLogin)/_constants/auth';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { accessTokenState, userInfoState } from '@/src/app/_recoil/AuthAtom';
import { getAccessToken } from '@/src/app/_util/getAccessToken';

export default function LogIn() {
  const methods = useForm<FieldValues>({ mode: 'onBlur', reValidateMode: 'onChange' });
  const setUserInfo = useSetRecoilState(userInfoState);
  const setToken = useSetRecoilState(accessTokenState);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const values = methods.watch();
  const handleSubmit = methods.handleSubmit;

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post('auth/login', values);
      const userInfo = res.data.user;
      const accessToken = res.data.accessToken;
      setToken(accessToken);
      setUserInfo(userInfo);
      router.push('/myboard');
      setIsLoading(false);
    } catch (error: unknown) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      router.push('/myboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthLayout message={AUTH_MESSAGE.logIn}>
      <FormProvider {...methods}>
        <form
          method='post'
          action={'/api/auth/callback/credentials'}
          onSubmit={handleSubmit(handleLogin)}
          className='w-full'
          noValidate
        >
          <div className='mb-[1rem]'>
            <InputForm.EmailInput label='이메일' placeholder='이메일을 입력해 주세요' id='email' />
          </div>
          <div className='mb-[1.25rem]'>
            <InputForm.PasswordInput label='비밀번호' placeholder='비밀번호를 입력해 주세요' id='password' />
          </div>
          <Sign size='small' isActive={!isLoading} type='submit' />
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
