'use client';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import CommentInput from '@/src/app/_component/InputForm/CommentInput';
import DateInput from '@/src/app/_component/InputForm/DateInput';
import EmailInput from '@/src/app/_component/InputForm/EmailInput';
import PasswordCheck from '@/src/app/_component/InputForm/PasswordCheck';
import PasswordInput from '@/src/app/_component/InputForm/PasswrdInput';
import TagInput from '@/src/app/_component/InputForm/TagInput';
import TextInput from '@/src/app/_component/InputForm/TextInput';
import { ReactNode, useEffect } from 'react';
// import CommentUpdateInput from './commentUpdateInput';

export default function InputForm({
  children,
  onSubmit,
  mode = 'onChange',
}: {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  mode?: 'onChange' | 'onBlur';
}) {
  // [ ] isLoading으로 disabled
  // const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<FieldValues>({ mode: mode, reValidateMode: mode });

  const submit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    // setIsLoading(true);
    try {
      await onSubmit(data);
    } catch (error) {
      // setIsLoading(false);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset();
    }
  }, [methods.formState.isSubmitSuccessful, methods]);

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
// InputForm.CommentUpdateInput = CommentUpdateInput;
