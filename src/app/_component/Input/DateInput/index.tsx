import { CommonInputProps, dateValidate } from '@/src/app/_constant/Input';
import ko from 'date-fns/locale/ko';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';
import { ErrorMessage, InputWrapper, Label, getInputClass, useInputField } from '../InputStyle';
import CalendarIcon from '../icons/CalendarIcon';

interface DateInputProps extends CommonInputProps {
  initialDate?: Date;
}
export default function DateInput({ label, id, initialDate }: DateInputProps) {
  const { errorMessage, control, setValue } = useInputField(id, dateValidate);

  useEffect(() => {
    setValue(id, initialDate || new Date());
  }, [setValue, id, initialDate]);
  return (
    <InputWrapper>
      <Label label={label} isRequired={false} htmlFor={id} />
      <div className={getInputClass(!!errorMessage)}>
        <div className='pointer-events-none min-h-[1.5rem]'>
          <CalendarIcon color='#171717' />
        </div>
        <Controller
          control={control}
          name={id}
          defaultValue={initialDate || new Date()}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              closeOnScroll={(e) => e.target === document}
              wrapperClassName='w-full'
              className='placeholder:text-gray4 h-[1.125rem] w-full bg-inherit outline-0'
              dateFormat='Pp'
              locale={ko}
              id={id}
              showTimeSelect
              selected={value}
              onChange={(date: Date) => {
                onChange(date);
              }}
            />
          )}
        />
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </InputWrapper>
  );
}
