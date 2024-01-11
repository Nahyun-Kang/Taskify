import { titleValidate } from '@/src/app/_constant/Input';
import InputForm from '@/src/app/_component/InputForm';
import ModalTitle from '@/src/app/_component/modal/_component/modalTitle';
import ModalLayout from '@/src/app/_component/modal/_component/modalLayout';
import ModalOutside from '@/src/app/_component/modal/_component/modalOutside';
import ModalPortal from '@/src/app/_component/modal/_component/modalPortal';
import DropdownAndFilter from '@/src/app/_component/dropdown/filter';
import AddImageFile from '@/src/app/(afterLogin)/_component/AddImageFile';
import Dropdown from '@/src/app/_component/dropdown';
import { useSetRecoilState } from 'recoil';
import { updateTodoAboutCardId, cardListStateAboutColumn, countAboutCardList } from '@/src/app/_recoil/ModalAtom/todo';
import { CardInfo } from '@/src/app/(afterLogin)/_constant/type';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { SubmitHandler } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import { updateTodoCard } from '@/src/app/_api/todo';

export default function UpdateTodo({ cardId, columnId }: { cardId: number; columnId: number }) {
  const [cardData, setCardData] = useState<CardInfo | null>(null);
  const [editCard, setEditCard] = useState<CardInfo | null>(null);
  const setIsOpenUpdateTodoModal = useSetRecoilState(updateTodoAboutCardId(cardId));
  const setCardList = useSetRecoilState<CardInfo[] | []>(cardListStateAboutColumn(columnId));
  const setCardNumCount = useSetRecoilState<number>(countAboutCardList(columnId));
  const setCardListOtherColumn = useSetRecoilState(cardListStateAboutColumn(editCard?.columnId as number));
  const setCountOtherColumn = useSetRecoilState(countAboutCardList(editCard?.columnId as number));

  const onSubmit = async (data: FieldValues) => {
    try {
      const newCard = await updateTodoCard(data, cardId);
      setEditCard(newCard);
    } catch (error) {}
  };

  const handleClose = () => {
    setIsOpenUpdateTodoModal(false);
  };

  const handleRenderCard = async () => {
    try {
      const res = await axiosInstance.get(`cards/${cardId}`);
      const newData = res.data;
      setCardData(newData);
    } catch (error) {}
  };

  useEffect(() => {
    handleRenderCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editCard !== null) {
      setCardList((oldCards: CardInfo[]) => oldCards.map((item) => (item.id === cardId ? editCard : item)));
      setIsOpenUpdateTodoModal(false);
    }
    if (editCard && editCard.columnId !== columnId) {
      setCardList((oldCards: CardInfo[]) => oldCards.filter((card) => card.columnId === columnId));
      setCardNumCount((prev: number) => prev - 1);
      setCardListOtherColumn((oldCards: CardInfo[]) => [editCard, ...oldCards]);
      setCountOtherColumn((prev: number) => prev + 1);
      setIsOpenUpdateTodoModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCard]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => e.stopPropagation();

  if (!cardData) return;

  return (
    <>
      <div onClick={handleClick}>
        <ModalPortal>
          <ModalOutside closeModal={handleClose}>
            <InputForm onSubmit={onSubmit as SubmitHandler<FieldValues>}>
              <ModalLayout btnName='수정' btnSize='large' sign={false} onClose={handleClose}>
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
            </InputForm>
          </ModalOutside>
        </ModalPortal>
      </div>
    </>
  );
}
