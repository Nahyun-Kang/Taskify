import { CommonInputProps, requiredValidate } from '@/src/app/_constant/Input';
import { ErrorMessage, InputWrapper, Label, getInputClass, useInputField } from './InputStyle';

export default function TextInput({
  label,
  placeholder,
  id,
  validationRules = requiredValidate,
  initialValue = '',
  isRequired = false,
  errorText = '',
}: CommonInputProps) {
  const { register, errorMessage } = useInputField(id, validationRules);

  return (
    <InputWrapper>
      <Label label={label} htmlFor={id} isRequired={isRequired} />
      <input
        id={id}
        type='text'
        className={getInputClass(!!errorText)}
        placeholder={placeholder}
        defaultValue={initialValue}
        {...register}
      />
      <ErrorMessage message={errorMessage || errorText} />
    </InputWrapper>
  );
}
