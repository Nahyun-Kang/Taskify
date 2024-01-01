import { InputWrapper, Label } from '@/src/app/_component/InputForm/InputStyle';
import { CommonInputProps } from '@/src/app/_constant/Input';

interface CommentInputProps extends CommonInputProps {
  onSubmit: (e: React.MouseEvent<HTMLElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLElement>) => void;
  value: string;
}

export default function CommentInput({ label, id, placeholder, onChange, onSubmit, value }: CommentInputProps) {
  return (
    <InputWrapper>
      <Label label={label} isRequired={false} htmlFor={id} />
      <div className='box-border flex flex-col gap-2 rounded-lg border px-4 py-[0.6875rem] placeholder:text-gray40 focus-within:border-violet'>
        <input
          id={id}
          type='text'
          className='placeholder:text-gray4 inline-flex h-6 flex-1 bg-inherit outline-0'
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <button
          onClick={onSubmit}
          className='ml-auto flex h-8 w-[5.1875rem] flex-nowrap items-center justify-center rounded-lg border border-gray30 bg-white px-3 py-[0.5625rem] text-xs text-violet'
        >
          입력
        </button>
      </div>
    </InputWrapper>
  );
}
