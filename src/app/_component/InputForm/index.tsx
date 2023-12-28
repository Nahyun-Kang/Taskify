'use client';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import CommentInput from '@/src/app/_component/InputForm/CommentInput';
import DateInput from '@/src/app/_component/InputForm/DateInput';
import EmailInput from '@/src/app/_component/InputForm/EmailInput';
import PasswordCheck from '@/src/app/_component/InputForm/PasswordCheck';
import PasswordInput from '@/src/app/_component/InputForm/PasswrdInput';
import TagInput from '@/src/app/_component/InputForm/TagInput';
import TextInput from '@/src/app/_component/InputForm/TextInput';
import { ReactNode } from 'react';

export default function InputForm({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
}) {
  // [ ] isLoading으로 disabled
  // const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<FieldValues>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const submit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    // setIsLoading(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)} noValidate className='w-full'>
        {children}
      </form>
    </FormProvider>
  );
}

InputForm.EmailInput = EmailInput;
InputForm.PasswordInput = PasswordInput;
InputForm.PasswordCheck = PasswordCheck;
InputForm.TextInput = TextInput;
InputForm.DateInput = DateInput;
InputForm.TagInput = TagInput;
InputForm.CommentInput = CommentInput;
