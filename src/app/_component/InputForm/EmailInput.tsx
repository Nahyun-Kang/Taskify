import {
  ErrorMessage,
  InputWrapper,
  Label,
  getInputClass,
  useInputField,
} from '@/src/app/_component/InputForm/InputStyle';
import { CommonInputProps, emailValidate } from '@/src/app/_constant/Input';

export default function EmailInput({ label, placeholder, id, initialValue = '' }: CommonInputProps) {
  const { register, hasError, errorMessage } = useInputField(id, emailValidate);

  return (
    <InputWrapper>
      <Label label={label} htmlFor={id} isRequired={false} />
      <input
        id={id}
        type='email'
        className={getInputClass(hasError)}
        defaultValue={initialValue}
        placeholder={placeholder}
        {...register}
      />
      <ErrorMessage message={errorMessage} />
    </InputWrapper>
  );
}
