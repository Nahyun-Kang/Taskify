import { CommonInputProps } from '@/src/app/_constant/Input';
import ko from 'date-fns/locale/ko';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage, InputWrapper, Label, getInputClass, useInputField } from '../InputStyle';
import CalendarIcon from '../icons/CalendarIcon';

interface DateInputProps extends CommonInputProps {
  initialDate?: Date;
}
export default function DateInput({ label, id, initialDate, validationRules = {} }: DateInputProps) {
  const { control } = useFormContext();
  const { errorMessage } = useInputField(id, validationRules);

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
              showTimeSelect
              selected={value || new Date()}
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
