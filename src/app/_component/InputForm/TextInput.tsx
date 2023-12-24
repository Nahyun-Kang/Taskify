import {
  ErrorMessage,
  InputWrapper,
  Label,
  getInputClass,
  useInputField,
} from '@/src/app/_component/InputForm/InputStyle';
import { CommonInputProps } from '@/src/app/_constant/Input';

export default function TextInput({
  label,
  placeholder,
  id,
  validationRules = {},
  initialValue = '',
}: CommonInputProps) {
  const { register, hasError, errorMessage } = useInputField(id, validationRules);

  return (
    <InputWrapper>
      <Label label={label} htmlFor={id} isRequired={validationRules?.required?.value || false} />
      <input
        id={id}
        type='text'
        className={getInputClass(hasError)}
        placeholder={placeholder}
        defaultValue={initialValue}
        {...register}
      />
      <ErrorMessage message={errorMessage} />
    </InputWrapper>
  );
}
