import EyeOffIcon from '@/src/app/_component/Icons/EyeOffIcon';
import EyeOnIcon from '@/src/app/_component/Icons/EyeOnIcon';
import {
  ErrorMessage,
  InputWithImageWrapper,
  InputWrapper,
  Label,
  useInputField,
} from '@/src/app/_component/InputForm/InputStyle';
import { CommonInputProps, passwordValidate } from '@/src/app/_constant/Input';
import { useState } from 'react';

export default function PasswordInput({ label, placeholder, id, initialValue = '' }: CommonInputProps) {
  const { register, hasError, errorMessage } = useInputField(id, passwordValidate);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const inputType = showPassword ? 'text' : 'password';

  return (
    <InputWrapper>
      <Label label={label} isRequired={false} htmlFor={id} />
      <InputWithImageWrapper hasError={hasError}>
        <input
          id={id}
          type={inputType}
          className='placeholder:text-gray4 inline-flex h-6 flex-1 bg-inherit outline-0'
          placeholder={placeholder}
          defaultValue={initialValue}
          {...register}
        />
        <button type='button' onClick={toggleShowPassword}>
          {showPassword ? <EyeOffIcon /> : <EyeOnIcon />}
        </button>
      </InputWithImageWrapper>
      <ErrorMessage message={errorMessage} />
    </InputWrapper>
  );
}
