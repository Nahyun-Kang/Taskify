import { ErrorMessage, InputWrapper, Label, useInputField } from '@/src/app/_component/InputForm/InputStyle';
import { CommonInputProps } from '@/src/app/_constant/Input';
import { FieldValues } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { MouseEvent } from 'react';
import InputForm from '.';
interface CommentInputProps extends CommonInputProps {
  handleClick: SubmitHandler<FieldValues>;
}

export default function CommentInput({
  label,
  id,
  placeholder,
  handleClick,
  validationRules = {},
  initialValue = '',
}: CommentInputProps) {
  const { register, hasError, errorMessage } = useInputField(id, validationRules);
  const clickButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <InputForm onSubmit={handleClick}>
      <InputWrapper>
        <Label label={label} isRequired={false} htmlFor={id} />
        <div
          className={`box-border flex flex-col gap-2 rounded-lg border px-4 py-[0.6875rem] placeholder:text-gray40 focus-within:border-violet ${
            hasError ? 'border-red' : 'border-gray30'
          }`}
        >
          <input
            id={id}
            type='text'
            className='placeholder:text-gray4 inline-flex h-6 flex-1 bg-inherit outline-0'
            placeholder={placeholder}
            defaultValue={initialValue}
            {...register}
          />
          <button
            type='submit'
            className='ml-auto flex h-8 w-[5.1875rem] flex-nowrap items-center justify-center rounded-lg border border-gray30 bg-white px-3 py-[0.5625rem] text-xs text-violet'
            onClick={clickButton}
          >
            입력
          </button>
        </div>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </InputWrapper>
    </InputForm>
  );
}
