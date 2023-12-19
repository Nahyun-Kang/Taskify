'use client';

import ko from 'date-fns/locale/ko';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function InputField({ children }: { children: ReactNode }) {
  return <div className='flex w-[28.125rem] flex-col gap-[0.625rem]'>{children}</div>;
}

function Label({ children, htmlFor }: { children: ReactNode; htmlFor: string }) {
  return <label htmlFor={htmlFor}>{children}</label>;
}

function TextInput({ placeholder, id, hasError }: { id: string; placeholder: string; hasError: boolean }) {
  return (
    <input
      id={id}
      type='text'
      className={`h-12 w-full max-w-[29.375rem] px-4 py-[0.875rem] focus:outline-violet ${
        hasError ? 'border-2 border-red' : 'border-none'
      }`}
      placeholder={placeholder}
    />
  );
}

function EmailInput({ placeholder, id, hasError }: { id: string; placeholder: string; hasError: boolean }) {
  return (
    <input
      id={id}
      type='email'
      className={`h-12 w-full max-w-[29.375rem] px-4 py-[0.875rem] focus:outline-violet ${
        hasError ? 'border-2 border-red' : 'border-none'
      }`}
      placeholder={placeholder}
    />
  );
}

function PasswordInput({ placeholder, id, hasError }: { id: string; placeholder: string; hasError: boolean }) {
  return (
    <input
      id={id}
      type='password'
      className={`h-12 w-full max-w-[29.375rem] px-4 py-[0.875rem] focus:outline-violet ${
        hasError ? 'border-2 border-red' : 'border-none'
      }`}
      placeholder={placeholder}
    />
  );
}

function DateInput() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className='relative flex w-[28.125rem] flex-col'>
      <div className='absolute bottom-2/4 z-10 h-5 w-5 translate-y-2/4'>
        <Image src='/icons/calendar_icon.svg' alt='날짜 선택' width={36} height={20} className='ml-4' />
      </div>
      <DatePicker
        closeOnScroll={(e) => e.target === document}
        className='h-12 w-full max-w-[29.375rem] px-4 py-[0.875rem] pl-[2.875rem] focus:outline-violet'
        dateFormat='Pp'
        locale={ko}
        showTimeSelect
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
    </div>
  );
}

InputField.TextInput = TextInput;
InputField.EmailInput = EmailInput;
InputField.PasswordInput = PasswordInput;
InputField.DateInput = DateInput;
InputField.Label = Label;
