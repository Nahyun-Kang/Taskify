import InputForm from '@/src/app/_component/InputForm';
import ModalTitle from '@/src/app/_component/modal/_component/modalTitle';
import ModalLayout from '@/src/app/_component/modal/_component/modalLayout';
import ModalOutside from '@/src/app/_component/modal/_component/modalOutside';
import ModalPortal from '@/src/app/_component/modal/_component/modalPortal';
import ModalMainContent from '@/src/app/_component/modal/_component/modalMainContent';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { deleteTodoAboutCardId, countAboutCardList, cardListStateAboutColumn } from '@/src/app/_recoil/ModalAtom/todo';
import { deleteTodoCard } from '@/src/app/_api/todo';
import { CardInfo } from '@/src/app/(afterLogin)/_constant/type';

export default function DeleteTodo({ cardId, columnId }: { cardId: number; columnId: number }) {
  const setIsOpenDeleteTodoModal = useSetRecoilState(deleteTodoAboutCardId(cardId));
  const setCardList = useSetRecoilState(cardListStateAboutColumn(columnId));
  const setCount = useSetRecoilState(countAboutCardList(columnId));

  const onSubmit = async () => {
    try {
      await deleteTodoCard(cardId);
      setCardList((oldCards: CardInfo[]) => oldCards.filter((item) => item.id !== cardId));
      setCount((prev: number) => prev - 1);
    } catch (error) {
    } finally {
      setIsOpenDeleteTodoModal(false);
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLElement>) => e.stopPropagation();

  const handleClose = () => setIsOpenDeleteTodoModal(false);
  return (
    <>
      <div onClick={handleClick}>
        <ModalPortal>
          <ModalOutside closeModal={handleClose}>
            <InputForm onSubmit={onSubmit as SubmitHandler<FieldValues>}>
              <ModalLayout btnName='삭제' btnSize='large' sign={false} onClose={handleClose}>
                <ModalTitle title='할 일 삭제' />
                <ModalMainContent content='할 일 카드가 삭제됩니다' />
              </ModalLayout>
            </InputForm>
          </ModalOutside>
        </ModalPortal>
      </div>
    </>
  );
}
