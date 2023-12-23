import { CommonInputProps } from '@/src/app/_constant/Input';
import { ErrorMessage, InputWrapper, Label, getInputClass, useInputField } from '../InputStyle';

export default function TextInput({ label, placeholder, id, validationRules = {} }: CommonInputProps) {
  const { register, hasError, errorMessage } = useInputField(id, validationRules);

  return (
    <InputWrapper>
      <Label label={label} htmlFor={id} isRequired={validationRules?.required?.value || false} />
      <input id={id} type='text' className={getInputClass(hasError)} placeholder={placeholder} {...register} />
      <ErrorMessage message={errorMessage} />
    </InputWrapper>
  );
}
