'use client';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { ReactNode, useState } from 'react';
import CommentInput from './CommentInput';
import DateInput from './DateInput';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import TagInput from './TagInput';
import TextInput from './TextInput';

export default function InputField({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<FieldValues>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const submit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)} noValidate>
        {children}
      </form>
    </FormProvider>
  );
}

InputField.EmailInput = EmailInput;
InputField.PasswordInput = PasswordInput;
InputField.TextInput = TextInput;
InputField.DateInput = DateInput;
InputField.TagInput = TagInput;
InputField.CommentInput = CommentInput;
