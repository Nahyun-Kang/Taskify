import Confirm from '@/src/app/_component/Button/Confirm';
import SelectColor from '@/src/app/_component/Chip/SelectColor';

import InputForm from '@/src/app/_component/InputForm';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

interface EditBoardProps {
  dashboardId: string;
  boardName: string;
}

export default function EditBoard({ boardName, dashboardId }: EditBoardProps) {
  const [state, setState] = useState({});
  const [color, setColor] = useState('');

  const handleSelectColor = (color: string) => {
    setColor(color);
  };
  const handleUpdate = () => {
    console.log(state, dashboardId);
    setState((prevState) => ({
      ...prevState,
      name: '',
      color: color,
    }));
    //api post
  };

  return (
    <div className='item-center flex max-h-[16rem] w-full flex-col gap-[1.25rem] rounded-[0.5rem] p-[1.75rem]'>
      <div className='flex w-full justify-between'>
        <p className='text-[1.25rem] font-bold text-black'>{boardName}</p>
        <SelectColor onSelect={handleSelectColor} />
      </div>
      <InputForm onSubmit={(data: FieldValues) => console.log(data)}>
        <InputForm.TextInput label='대시보드 이름' placeholder='변경할 대시보드 이름을 입력해주세요.' id='editBoard' />
        <div className='my-[1.875rem] flex justify-end'>
          <Confirm size='large' onClick={handleUpdate} btnName='변경' />
        </div>
      </InputForm>
    </div>
  );
}
