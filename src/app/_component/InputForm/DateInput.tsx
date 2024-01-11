import { InputWrapper, Label, getInputClass } from '@/src/app/_component/InputForm/InputStyle';
import { CommonInputProps } from '@/src/app/_constant/Input';
import { format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useFormContext } from 'react-hook-form';
import CalendarIcon from '@/src/app/_component/Icons/CalendarIcon';

interface DateInputProps extends CommonInputProps {
  initialDate?: Date;
}

export default function DateInput({ label, id, initialDate }: DateInputProps) {
  const { control, setValue } = useFormContext();
  const defaultDate = initialDate || new Date();

  return (
    <InputWrapper>
      <Label label={label} isRequired={false} htmlFor={id} />
      <div className={getInputClass(false)}>
        <div className='pointer-events-none min-h-[1.5rem]'>
          <CalendarIcon color='#171717' />
        </div>
        <Controller
          name={id}
          control={control}
          defaultValue={format(defaultDate, 'yyyy-MM-dd HH:mm')}
          render={({ field }) => (
            <DatePicker
              {...field}
              wrapperClassName='w-full'
              className='placeholder:text-gray4 h-[1.125rem] w-full bg-inherit outline-0'
              dateFormat='Pp'
              locale={ko}
              id={id}
              showTimeSelect
              minDate={new Date('2023-01-01')}
              selected={field.value ? new Date(field.value) : new Date()}
              onChange={(date: Date) => {
                const formattedDate = format(date || new Date(), 'yyyy-MM-dd HH:mm');
                setValue(id, formattedDate);
              }}
            />
          )}
        />
      </div>
    </InputWrapper>
  );
}
