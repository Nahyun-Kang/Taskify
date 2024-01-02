'use client';

import Tag from '@/src/app/_component/Chip/Tag';
import ko from 'date-fns/locale/ko';
import { ChangeEvent, KeyboardEvent, MouseEvent, ReactNode, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '@/src/app/_component/Icons/CalendarIcon';
import CloseIcon from '@/src/app/_component/Icons/CloseIcon';
import EyeOffIcon from '@/src/app/_component/Icons/EyeOffIcon';
import EyeOnIcon from '@/src/app/_component/Icons/EyeOnIcon';

interface CommonInputProps {
  type?: string;
  labelText: string;
  placeholder: string;
  id: string;
  hasError?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
}

interface TagInputProps extends CommonInputProps {
  initialTags?: string[];
}

interface CommentInputProps extends CommonInputProps {
  handleClick: () => void;
}
interface LabelProps {
  labelText: string;
  isRequired?: boolean;
  htmlFor: string;
}

const getInputClass = (hasError: boolean) =>
  `box-border flex gap-2 rounded-lg border px-4 py-[0.6875rem] placeholder:text-gray40 focus-within:border-violet outline-0 ${
    hasError ? 'border-red' : 'border-gray30'
  }`;

function InputWrapper({ children }: { children: ReactNode }) {
  return <div className='flex max-w-[32.5rem] flex-col gap-2'>{children}</div>;
}

function InputWithImageWrapper({ children, hasError }: { children: ReactNode; hasError: boolean }) {
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

function Label({ labelText, isRequired, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className='text-[1.125rem] text-black'>
      {labelText}
      {isRequired && <p className='inline text-violet'> *</p>}
    </label>
  );
}

export default function InputField({
  type = 'text',
  labelText,
  placeholder,
  id,
  hasError = false,
  isRequired,
}: CommonInputProps) {
  return (
    <InputWrapper>
      <Label labelText={labelText} isRequired={isRequired} htmlFor={id} />
      <input id={id} type={type} className={getInputClass(hasError)} placeholder={placeholder} />
    </InputWrapper>
  );
}

function TagInput({ initialTags = [], labelText, placeholder, id, hasError }: TagInputProps) {
  const [inputText, setInputText] = useState('');
  const [tags, setTags] = useState(initialTags);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    const trimmedInput = inputText.trim();
    if (e.key === 'Enter' && trimmedInput !== '') {
      e.preventDefault();
      setTags([...tags, trimmedInput]);
      setInputText('');
    }
  };

  const deleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <InputWrapper>
      <Label labelText={labelText} isRequired={false} htmlFor={id} />
      <div
        className={`box-border flex min-h-[1.5rem] w-full flex-wrap items-center gap-2 rounded-lg border px-4 py-[0.6875rem] placeholder:text-gray40 focus-within:border-violet ${
          hasError ? 'border-red' : 'border-gray30'
        }`}
      >
        <div className={`left-4 flex min-h-[1.5rem] flex-wrap items-center gap-[0.375rem]`}>
          {tags.map((tag, index) => (
            <div key={index} className='group flex cursor-pointer content-between items-center'>
              <Tag content={tag} />
              <button onClick={() => deleteTag(index)} className='hidden group-hover:block'>
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
        <input
          value={inputText}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          id={id}
          type='text'
          className='placeholder:text-gray4 inline-flex h-[1.125rem] flex-1 bg-inherit outline-0'
          placeholder={placeholder}
        />
      </div>
    </InputWrapper>
  );
}

function PasswordInput({ labelText, placeholder, id, hasError = false, errorMessage }: CommonInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };
  const inputType = showPassword ? 'text' : 'password';

  return (
    <InputWrapper>
      <Label labelText={labelText} isRequired={false} htmlFor={id} />
      <InputWithImageWrapper hasError={hasError}>
        <input
          id={id}
          type={inputType}
          className='placeholder:text-gray4 inline-flex h-6 flex-1 bg-inherit outline-none'
          placeholder={placeholder}
        />
        <button type='button' onClick={toggleShowPassword}>
          {showPassword ? <EyeOffIcon /> : <EyeOnIcon />}
        </button>
        <p>{errorMessage}</p>
      </InputWithImageWrapper>
    </InputWrapper>
  );
}

function DateInput({ labelText, id, hasError = false }: { labelText: string; id: string; hasError?: boolean }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <InputWrapper>
      <Label labelText={labelText} isRequired={false} htmlFor={id} />
      <div className={getInputClass(hasError)}>
        <div className='pointer-events-none min-h-[1.5rem]'>
          <CalendarIcon color={startDate ? '#171717' : '#9FA6B2'} />
        </div>
        <DatePicker
          closeOnScroll={(e) => e.target === document}
          wrapperClassName='w-full'
          className='placeholder:text-gray4 h-[1.125rem] w-full bg-inherit outline-0'
          dateFormat='Pp'
          id={id}
          locale={ko}
          showTimeSelect
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
      </div>
    </InputWrapper>
  );
}

function CommentInput({ labelText, id, hasError = false, placeholder, handleClick }: CommentInputProps) {
  return (
    <InputWrapper>
      <Label labelText={labelText} isRequired={false} htmlFor={id} />
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
        />
        <button
          onClick={handleClick}
          className='ml-auto flex h-8 w-[5.1875rem] flex-nowrap items-center justify-center rounded-lg border border-gray30 bg-white px-3 py-[0.5625rem] text-xs text-violet'
        >
          입력
        </button>
      </div>
    </InputWrapper>
  );
}
const TextInput = (props: CommonInputProps) => <InputField type='text' {...props} />;
TextInput.displayName = 'TextInput';

const EmailInput = (props: CommonInputProps) => <InputField type='email' {...props} />;
EmailInput.displayName = 'EmailInput';

InputField.TextInput = TextInput;
InputField.EmailInput = EmailInput;
InputField.PasswordInput = PasswordInput;
InputField.DateInput = DateInput;
InputField.TagInput = TagInput;
InputField.CommentInput = CommentInput;
