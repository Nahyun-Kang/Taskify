import { titleValidate } from '@/src/app/_constant/Input';
import InputForm from '@/src/app/_component/InputForm';
import ModalTitle from '@/src/app/_component/modal/_component/modalTitle';
import ModalLayout from '@/src/app/_component/modal/_component/modalLayout';
import ModalOutside from '@/src/app/_component/modal/_component/modalOutside';
import ModalPortal from '@/src/app/_component/modal/_component/modalPortal';
import DropdownAndFilter from '@/src/app/_component/dropdown/filter';
import AddImageFile from '@/src/app/(afterLogin)/_component/AddImageFile';

import {
  cardListStateAboutColumn,
  countAboutCardList,
  createTodoAboutColumnId,
} from '@/src/app/_recoil/ModalAtom/todo';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { CardInfo } from '@/src/app/(afterLogin)/_constant/type';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { createTodoCard } from '@/src/app/_api/todo';

export default function CreateTodo({ columnId, dashboardId }: { columnId: number; dashboardId: number }) {
  const setCardList = useSetRecoilState<CardInfo[] | []>(cardListStateAboutColumn(columnId));
  const setCardNumCount = useSetRecoilState<number>(countAboutCardList(columnId));
  const [createTodo, setCreateTodo] = useRecoilState(createTodoAboutColumnId(columnId));

  const onSubmit = async (data: FieldValues) => {
    try {
      const newCard = await createTodoCard(data, dashboardId, columnId);
      setCardList((prev) => [...(prev || []), newCard]);
      setCardNumCount((prev) => (prev ? prev + 1 : 1));
    } catch (error) {
      alert(error);
    } finally {
      setCreateTodo(false);
    }
  };

  const handleClose = () => setCreateTodo(false);

  return (
    <>
      {createTodo && (
        <ModalPortal>
          <ModalOutside closeModal={handleClose}>
            <InputForm onSubmit={onSubmit as SubmitHandler<FieldValues>}>
              <ModalLayout btnName='생성' btnSize='large' sign={false} onClose={handleClose}>
                <ModalTitle title='할 일 생성' />
                <DropdownAndFilter />
                <InputForm.TextInput
                  label='제목'
                  placeholder='제목을 입력해주세요'
                  id='title'
                  isRequired={true}
                  validationRules={titleValidate}
                />
                <InputForm.TextInput
                  label='설명'
                  placeholder='설명을 입력해주세요'
                  id='description'
                  isRequired={true}
                />
                <InputForm.DateInput label='마감일' id='dueDate' placeholder='날짜 선택' />
                <InputForm.TagInput label='태그' id='tags' placeholder='입력 후 Enter' />
                <div className='flex flex-col gap-[0.625rem]'>
                  <span>이미지</span>
                  <AddImageFile size='small' columnId={columnId} />
                </div>
              </ModalLayout>
            </InputForm>
          </ModalOutside>
        </ModalPortal>
      )}
    </>
  );
}
