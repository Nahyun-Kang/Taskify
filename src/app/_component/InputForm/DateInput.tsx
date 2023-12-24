import {
  ErrorMessage,
  InputWrapper,
  Label,
  getInputClass,
  useInputField,
} from '@/src/app/_component/InputForm/InputStyle';
import { CommonInputProps, dateValidate } from '@/src/app/_constant/Input';
import { format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../Icons/CalendarIcon';

interface DateInputProps extends CommonInputProps {
  initialDate?: Date;
}
export default function DateInput({ label, id, initialDate }: DateInputProps) {
  const { errorMessage, setValue } = useInputField(id, dateValidate);
  const [date, setDate] = useState(initialDate || new Date());

  useEffect(() => {
    setValue(id, format(date, 'yyyy-MM-dd HH:mm'));
  }, [setValue, id, date]);
  return (
    <InputWrapper>
      <Label label={label} isRequired={false} htmlFor={id} />
      <div className={getInputClass(!!errorMessage)}>
        <div className='pointer-events-none min-h-[1.5rem]'>
          <CalendarIcon color='#171717' />
        </div>

        <DatePicker
          closeOnScroll={(e) => e.target === document}
          wrapperClassName='w-full'
          className='placeholder:text-gray4 h-[1.125rem] w-full bg-inherit outline-0'
          dateFormat='Pp'
          locale={ko}
          id={id}
          showTimeSelect
          selected={date}
          onChange={(date: Date) => {
            setDate(date);
          }}
        />
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </InputWrapper>
  );
}
