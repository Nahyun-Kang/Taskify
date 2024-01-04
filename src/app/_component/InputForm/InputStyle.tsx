import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

interface validationRulesProps {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
}

interface LabelProps {
  label: string;
  isRequired?: boolean;
  htmlFor: string;
}

export const getInputClass = (hasError: boolean) =>
  `box-border flex gap-2 rounded-lg border px-4 py-[0.6875rem] text-[0.875rem] md:text-[1rem]  placeholder:text-gray40 focus-within:border-violet outline-0 ${
    hasError ? 'border-red' : 'border-gray30'
  }`;

export function InputWrapper({ children }: { children: ReactNode }) {
  return <div className='flex flex-col gap-2'>{children}</div>;
}

export function InputWithImageWrapper({ children, hasError }: { children: ReactNode; hasError: boolean }) {
  return (
    <div
      className={`box-border flex gap-2 rounded-lg border bg-white px-4 py-[0.6875rem] placeholder:text-gray40 focus-within:border-violet ${
        hasError ? 'border-red' : 'border-gray30'
      }`}
    >
      {children}
    </div>
  );
}

export function useInputField(id: string, validationRules: validationRulesProps) {
  const {
    register,
    formState: { errors, isLoading, isValid },
    setValue,
    watch,
    setError,
  } = useFormContext();
  const errorMessage = (errors[id]?.message as string) || '';

  return {
    register: register(id, validationRules),
    hasError: !!errors[id],
    errorMessage,
    isLoading,
    setValue,
    watch,
    isValid,
    setError,
  };
}

export function ErrorMessage({ message }: { message: string }) {
  return message ? <p className='text-[0.875rem] text-red'>{message}</p> : null;
}

export function Label({ label, isRequired, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className='text-black md:text-[1.125rem]'>
      {label}
      {isRequired && <p className='inline text-violet'> *</p>}
    </label>
  );
}
