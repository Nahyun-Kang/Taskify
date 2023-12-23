import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function InputForm({ children, onSubmit }: { children: ReactNode; onSubmit: () => void }) {
  const methods = useForm({ mode: 'onBlur', reValidateMode: 'onBlur' });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        {children}
      </form>
    </FormProvider>
  );
}
