import EyeOffIcon from '@/src/app/_component/Icons/EyeOffIcon';
import EyeOnIcon from '@/src/app/_component/Icons/EyeOnIcon';
import { ErrorMessage, InputWithImageWrapper, InputWrapper, Label } from '@/src/app/_component/InputForm/InputStyle';
import { CommonInputProps } from '@/src/app/_constant/Input';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface PasswordCheckProps extends CommonInputProps {
  passwordId: string;
}

export default function PasswordCheck({ label, placeholder, id, initialValue = '', passwordId }: PasswordCheckProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const passwordValue = watch(passwordId);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const inputType = showPassword ? 'text' : 'password';

  return (
    <InputWrapper>
      <Label label={label} isRequired={false} htmlFor={id} />
      <InputWithImageWrapper hasError={!!errors[id]}>
        <input
          id={id}
          type={inputType}
          className='placeholder:text-gray4 inline-flex h-6 flex-1 bg-inherit outline-0'
          placeholder={placeholder}
          defaultValue={initialValue}
          {...register(id, {
            validate: (value) => value === passwordValue || '비밀번호가 일치하지 않습니다.',
          })}
        />
        <button type='button' onClick={toggleShowPassword}>
          {showPassword ? <EyeOffIcon /> : <EyeOnIcon />}
        </button>
      </InputWithImageWrapper>
      <ErrorMessage message={errors[id]?.message as string} />
    </InputWrapper>
  );
}
