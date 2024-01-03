import DropdownAndFilter from '@/src/app/_component/dropdown/filter';
import InputForm from '@/src/app/_component/InputForm';
import { titleValidate } from '@/src/app/_constant/Input';
import AddImageFile from '@/src/app/(afterLogin)/_component/AddImageFile';

export default function CreateToDo({ mainTitle, columnId }: { mainTitle: string; columnId: number }) {
  return (
    <div className='flex flex-col gap-6'>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <DropdownAndFilter />
      <InputForm.TextInput
        label='제목'
        placeholder='제목을 입력해주세요'
        id='title'
        isRequired={true}
        validationRules={titleValidate}
      />
      <InputForm.TextInput label='설명' placeholder='설명을 입력해주세요' id='description' isRequired={true} />
      <InputForm.DateInput label='마감일' id='dueDate' placeholder='날짜 선택' />
      <InputForm.TagInput label='태그' id='tags' placeholder='입력 후 Enter' />
      <div className='flex flex-col gap-[0.625rem]'>
        <span>이미지</span>
        <AddImageFile size='small' columnId={columnId} />
      </div>
    </div>
  );
}
