'use client';

import Dropdown from '@/src/app/_component/dropdown';
import DropdownAndFilter from '@/src/app/_component/dropdown/filter';
import InputForm from '@/src/app/_component/InputForm';
import { titleValidate } from '@/src/app/_constant/Input';
import AddImageFile from '@/src/app/(afterLogin)/_component/AddImageFile';
import { ToDoCardDetailProps } from '@/src/app/_component/modal/toDoCard/type';
export default function UpdateToDo({ mainTitle, cardData }: { mainTitle: string; cardData: ToDoCardDetailProps }) {
  return (
    <div className='flex flex-col gap-6 md:max-w-[28.125rem]'>
      <span className='font-Pretendard font-bold md:text-[1.5rem]'>{mainTitle}</span>
      <div className='flex flex-col gap-6 md:flex-row md:justify-between md:gap-4'>
        <Dropdown column={cardData.columnId} />
        <DropdownAndFilter assignee={cardData.assignee} />
      </div>
      <InputForm.TextInput
        label='제목'
        placeholder='제목을 입력해주세요'
        id='title'
        isRequired={true}
        initialValue={cardData.title}
        validationRules={titleValidate}
      />
      <InputForm.TextInput
        label='설명'
        placeholder='설명을 입력해주세요'
        id='description'
        isRequired={true}
        initialValue={cardData.description}
      />
      <InputForm.DateInput label='마감일' id='dueDate' placeholder='날짜 입력' initialDate={new Date('2023-12-24')} />
      <InputForm.TagInput label='태그' id='tags' placeholder='입력 후 Enter' initialTags={cardData.tags} />
      <div className='flex flex-col gap-[0.625rem]'>
        <span>이미지</span>
        <AddImageFile size='small' profileImageUrl={cardData.imageUrl} columnId={cardData.columnId} />
      </div>
    </div>
  );
}
