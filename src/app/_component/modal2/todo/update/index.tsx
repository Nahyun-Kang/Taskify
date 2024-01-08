import { titleValidate } from '@/src/app/_constant/Input';
import InputForm from '../../../InputForm';
import ModalTitle from '../../_component/modalTitle';
import ModalLayout from '@/src/app/_component/modal2/_component/modalLayout';
import ModalOutside from '../../_component/modalOutside';
import DropdownAndFilter from '../../../dropdown/filter';
import AddImageFile from '@/src/app/(afterLogin)/_component/AddImageFile';
import { ToDoCardDetailProps } from '../../../modal/toDoCard/type';
import Dropdown from '../../../dropdown';
import ModalPortal from '../../_component/modalPortal';
export function UpdateTodo({ cardData }: { cardData: ToDoCardDetailProps }) {
  const handleClose = () => {};
  return (
    <>
      <ModalPortal>
        <ModalOutside>
          <ModalLayout btnName='생성' btnSize='large' sign={false} onClose={handleClose} onSubmit={() => {}}>
            <ModalTitle title='할 일 수정' />
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
            <InputForm.DateInput
              label='마감일'
              id='dueDate'
              placeholder='날짜 입력'
              initialDate={new Date('2023-12-24')}
            />
            <InputForm.TagInput label='태그' id='tags' placeholder='입력 후 Enter' initialTags={cardData.tags} />
            <div className='flex flex-col gap-[0.625rem]'>
              <span>이미지</span>
              <AddImageFile size='small' profileImageUrl={cardData.imageUrl} columnId={cardData.columnId} />
            </div>
          </ModalLayout>
        </ModalOutside>
      </ModalPortal>
    </>
  );
}
