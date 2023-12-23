import { CommonInputProps } from '@/src/app/_constant/Input';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Tag from '../../Chip/Tag';
import { ErrorMessage, InputWrapper, Label } from '../InputStyle';
import CloseIcon from '../icons/CloseIcon';

interface TagInputProps extends CommonInputProps {
  initialTags?: string[];
}

export default function TagInput({ label, placeholder, id, validationRules, initialTags = [] }: TagInputProps) {
  const [tags, setTags] = useState(initialTags);
  const [inputText, setInputText] = useState('');
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputText.trim() !== '') {
      const newTags = [...tags, inputText.trim()];
      setTags(newTags);
      setValue(id, tags);
      setInputText('');
    }
  };

  const deleteTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setValue(id, newTags);
  };

  const errorMessage = errors[id]?.message as string;

  return (
    <InputWrapper>
      <Label label={label} htmlFor={id} isRequired={validationRules?.required?.value || false} />
      <div
        className={`box-border flex min-h-[1.5rem] w-full flex-wrap items-center gap-2 rounded-lg border px-4 py-[0.6875rem] placeholder:text-gray40 focus-within:border-violet ${
          errorMessage ? 'border-red' : 'border-gray30'
        }`}
      >
        <div className={`left-4 flex min-h-[1.5rem] flex-wrap items-center gap-[0.375rem]`}>
          {tags.map((tag, index) => (
            <div key={index} className='group flex cursor-pointer content-between items-center'>
              <Tag size='large' content={tag} />
              <button type='button' onClick={() => deleteTag(index)} className='hidden group-hover:block'>
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
          placeholder={placeholder}
          className='placeholder:text-gray4 inline-flex h-[1.125rem] flex-1 bg-inherit outline-0'
        />
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </InputWrapper>
  );
}
