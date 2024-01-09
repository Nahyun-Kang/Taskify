import ModalTitle from '../../_component/modalTitle';
import ModalLayout from '@/src/app/_component/modal2/_component/modalLayout';
import ModalOutside from '../../_component/modalOutside';
import ModalMainContent from '../../_component/modalMainContent';
import ModalPortal from '../../_component/modalPortal';
import InputForm from '../../../InputForm';
import { SubmitHandler } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { deleteTodoAboutCardId } from '@/src/app/_recoil/ModalAtom/todoAtom';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { cardListStateAboutColumn } from '@/src/app/_recoil/CardAtom';
import { countAboutCardList } from '@/src/app/_recoil/CardAtom';
import { CardInfo } from '@/src/app/(afterLogin)/_constant/type';

export function DeleteTodo2({ cardId, columnId }: { cardId: number; columnId: number }) {
  const setIsOpenDeleteTodoModal = useSetRecoilState(deleteTodoAboutCardId(cardId));
  const setCardList = useSetRecoilState(cardListStateAboutColumn(columnId));
  const setCount = useSetRecoilState(countAboutCardList(columnId));

  const onSubmit = async () => {
    try {
      await axiosInstance.delete(`cards/${cardId}`);
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
