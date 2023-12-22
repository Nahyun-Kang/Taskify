'use client';
import AuthLayout from '@/src/app/(beforeLogin)/_component/Auth/AuthLayout';
import InputField from '@/src/app/_component/Input/InputField';
import Sign from '@/src/app/_component/Button/Sign';
import { MESSAGE } from '../_constants/auth';

export default function SignUp() {
  const handleClick = () => {};
  return (
    <AuthLayout message={MESSAGE.signUp}>
      <form className='w-full'>
        <div className='mb-[16px]'>
          <InputField.EmailInput labelText='이메일' placeholder='이메일을 입력해 주세요' id='미정' />
        </div>
        <div className='mb-[16px]'>
          <InputField.EmailInput labelText='닉네임' placeholder='닉네임을 입력해 주세요' id='미정' />
        </div>
        <div className='mb-[20px]'>
          <InputField.PasswordInput labelText='비밀번호' placeholder='비밀번호를 입력해 주세요' id='미정' />
        </div>
        <div className='mb-[20px]'>
          <InputField.PasswordInput
            labelText='비밀번호 확인'
            placeholder='비밀번호를 한번 더 입력해 주세요'
            id='미정'
          />
        </div>
        <div className='mb-[21px] flex items-center gap-2'>
          <input type='checkbox' className='h-[1.25rem] w-[1.25rem] rounded border border-gray30 '></input>
          <label text-base font-normal>
            이용약관에 동의합니다
          </label>
        </div>
        <Sign size='small' isActive={false} onClick={handleClick} content='회원가입' />
      </form>
    </AuthLayout>
  );
}
