'use client';
import AuthLayout from '@/src/app/(beforeLogin)/_component/Auth/AuthLayout';
import InputField from '@/src/app/_component/Input/InputField';
import Sign from '@/src/app/_component/Button/Sign';
import { AUTH_MESSAGE } from '../_constants/auth';

export default function SignUp() {
  // const checkboxImage = useMemo(() => ({backgroundImage: 'url('/images/custom-checkbox-icon)'}))

  const handleClick = () => {};
  return (
    <AuthLayout message={AUTH_MESSAGE.signUp}>
      <form className='w-full'>
        <div className='mb-[16px]'>
          <InputField.EmailInput labelText='이메일' placeholder='이메일을 입력해 주세요' id='email' />
        </div>
        <div className='mb-[16px]'>
          <InputField.EmailInput labelText='닉네임' placeholder='닉네임을 입력해 주세요' id='nickname' />
        </div>
        <div className='mb-[20px]'>
          <InputField.PasswordInput labelText='비밀번호' placeholder='비밀번호를 입력해 주세요' id='password' />
        </div>
        <div className='mb-[20px]'>
          <InputField.PasswordInput
            labelText='비밀번호 확인'
            placeholder='비밀번호를 한번 더 입력해 주세요'
            id='password_check'
          />
        </div>
        <div className='mb-[1.3125rem] flex gap-2'>
          <input
            type='checkbox'
            className={`h-[1.25rem] w-[1.25rem] appearance-none rounded border border-gray30 bg-contain checked:bg-[url('/images/custom-checkbox-icon.svg')] focus:outline-none`}
          ></input>
          <label className='text-base font-normal'>이용약관에 동의합니다</label>
        </div>
        <Sign size='small' isActive={false} onClick={handleClick} content='회원가입' />
      </form>
    </AuthLayout>
  );
}
