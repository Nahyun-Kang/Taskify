'use client';
import { ChangeEvent, FormEvent, useState } from 'react';

import AuthLayout from '@/src/app/(beforeLogin)/_component/Auth/AuthLayout';
import InputForm from '../../_component/InputForm';
import Sign from '@/src/app/_component/Button/Sign';
import { AUTH_MESSAGE } from '../_constants/auth';
import { nicknameValidate } from '@/src/app/_constant/Input';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { axiosInstance } from '../../_util/axiosInstance';

export default function SignUp() {
  const methods = useForm<FieldValues>({ mode: 'onChange', reValidateMode: 'onBlur' });
  const [isChecked, setChecked] = useState(false);
  const isActiveButton = methods.formState.isDirty && methods.formState.isValid && isChecked;

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSignUp = () => {
    console.log(methods.getValues());
    const { email, nickname, password } = methods.getValues();
    const BODY_DATA = {
      email: email,
      nickname: nickname,
      password: password,
    };
    try {
      const res = axiosInstance.post('users', BODY_DATA);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <AuthLayout message={AUTH_MESSAGE.signUp}>
      <FormProvider {...methods}>
        <div className='w-full'>
          <form onSubmit={handleSubmit} noValidate>
            <div className='mb-[1rem]'>
              <InputForm.EmailInput label='이메일' placeholder='이메일을 입력해 주세요' id='email' />
            </div>
            <div className='mb-[1rem]'>
              <InputForm.TextInput
                label='닉네임'
                placeholder='닉네임을 입력해 주세요'
                id='nickname'
                validationRules={nicknameValidate}
              />
            </div>
            <div className='mb-[1.25rem]'>
              <InputForm.PasswordInput label='비밀번호' placeholder='비밀번호를 입력해 주세요' id='password' />
            </div>
            <div className='mb-[1.25rem]'>
              <InputForm.PasswordCheck
                label='비밀번호 확인'
                placeholder='비밀번호를 한번 더 입력해 주세요'
                id='password_check'
                passwordId='password'
              />
            </div>
            <div className='mb-[21px]'>
              <label className='flex items-center gap-2 text-base font-normal'>
                <input
                  type='checkbox'
                  className={`h-[20px] w-[20px] appearance-none rounded border border-gray30 bg-contain checked:bg-[url('/images/custom-checkbox-icon.svg')] focus:outline-none`}
                  onChange={handleChangeCheckbox}
                ></input>
                이용약관에 동의합니다
              </label>
            </div>
            <Sign type='submit' size='free' isActive={isActiveButton} content='회원가입' />
          </form>
        </div>
      </FormProvider>
    </AuthLayout>
  );
}
