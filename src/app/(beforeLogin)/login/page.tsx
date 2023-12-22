'use client';

import Sign from '../../_component/Button/Sign';
import InputField from '../../_component/Input/InputField';
import AuthLayout from '../_component/Auth/AuthLayout';
import { MESSAGE } from '../_constants/auth';

export default function LogIn() {
  const handleClick = () => {};

  return (
    <AuthLayout message={MESSAGE.logIn}>
      <form className='w-full'>
        <div className='mb-[1rem]'>
          <InputField.EmailInput labelText='이메일' placeholder='이메일을 입력해 주세요' id='미정' />
        </div>
        <div className='mb-[1.25rem]'>
          <InputField.PasswordInput labelText='비밀번호' placeholder='비밀번호를 입력해 주세요' id='미정' />
        </div>
        <Sign size='small' isActive={false} onClick={handleClick} />
      </form>
    </AuthLayout>
  );
}
