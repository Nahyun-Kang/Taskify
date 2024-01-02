import Tag from '@/src/app/_component/Chip/Tag';
import CloseIcon from '@/src/app/_component/Icons/CloseIcon';
import { ErrorMessage, InputWrapper, Label, useInputField } from '@/src/app/_component/InputForm/InputStyle';
import { CommonInputProps } from '@/src/app/_constant/Input';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

interface TagInputProps extends CommonInputProps {
  initialTags?: string[];
}

export default function TagInput({
  label,
  placeholder,
  id,
  validationRules = {},
  initialTags = [],
  isRequired = false,
}: TagInputProps) {
  const [tags, setTags] = useState(initialTags);
  const [inputText, setInputText] = useState('');

  const { errorMessage, setValue } = useInputField(id, validationRules);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 11) {
      setInputText(e.target.value);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (inputText.trim() !== '' && !e.nativeEvent.isComposing) {
        const newTags = [...tags, inputText.trim()];
        setTags(newTags);
        setInputText('');
      }
    }
  };

  const deleteTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setValue(id, newTags);
  };
  useEffect(() => {
    setValue(id, tags);
  }, [tags, id, setValue]);

  return (
    <InputWrapper>
      <Label label={label} htmlFor={id} isRequired={isRequired} />
      <div
        className={`box-border flex min-h-[1.5rem] w-full flex-wrap items-center gap-2 rounded-lg border px-4 py-[0.6875rem] placeholder:text-gray40 focus-within:border-violet ${
          errorMessage ? 'border-red' : 'border-gray30'
        }`}
      >
        <div className={`left-4 flex min-h-[1.5rem] flex-wrap items-center gap-[0.375rem]`}>
          {tags.map((tag, index) => (
            <div key={index} className='group flex cursor-pointer content-between items-center'>
              <Tag content={tag} />
              <button type='button' onClick={() => deleteTag(index)} className='hidden group-hover:block'>
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
        <input
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type='text'
          id={id}
          placeholder={placeholder}
          className='placeholder:text-gray4 inline-flex h-[1.125rem] flex-1 bg-inherit outline-0'
        />
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </InputWrapper>
  );
}
