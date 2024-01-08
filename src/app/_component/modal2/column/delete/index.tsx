import ModalTitle from '../../_component/modalTitle';
import ModalLayout from '@/src/app/_component/modal2/_component/modalLayout';
import ModalOutside from '../../_component/modalOutside';
import ModalMainContent from '../../_component/modalMainContent';
import InputForm from '../../../InputForm';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import ModalPortal from '../../_component/modalPortal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { deleteColumnsForColumnId } from '@/src/app/_recoil/ModalAtom/columnAtom';
import { columnState } from '@/src/app/_recoil/CardAtom';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
export function DeleteColumn2({ columnId }: { columnId: number }) {
  const [isOpenDeleteColumn, setIsOpenDeleteColumn] = useRecoilState(deleteColumnsForColumnId(columnId));
  const handleClose = () => setIsOpenDeleteColumn(false);
  const setColumns = useSetRecoilState(columnState);
  const onSubmit = async () => {
    try {
      await axiosInstance.delete(`columns/${columnId}`);
      setColumns((oldColumns) => oldColumns.filter((column) => column.id != columnId));
    } catch (error) {
      alert(error);
    } finally {
      setIsOpenDeleteColumn(false);
    }
  };
  return (
    <>
      {isOpenDeleteColumn && (
        <ModalPortal>
          <ModalOutside>
            <InputForm onSubmit={onSubmit as SubmitHandler<FieldValues>}>
              <ModalLayout btnName='삭제' btnSize='large' sign={false} onClose={handleClose}>
                <ModalTitle title='칼럼 삭제' />
                <ModalMainContent content='칼럼의 모든 카드가 삭제됩니다.' />
              </ModalLayout>
            </InputForm>
          </ModalOutside>
        </ModalPortal>
      )}
    </>
  );
}

// function Card({ id }) {
//   const openDetailModal = useSetRecoilState(detailModalState);

//   const handleClick = () => {
//     openDetailModal(id); // 카드 클릭시 해당 카드의 detail 모달을 오픈
//   };

//   return (
//     <>
//       <div onClick={handleClick}>{/* 카드 내용 */}</div>
//     </>
//   );
// }

// function Detailtodo() {
//   const id = useRecoilValue(detailModalState);
//   const closeModal = useSetRecoilState(detailModalState);
//   const openUpdateModal = useSetRecoilState(updateModalState);

//   const handleEdit = () => {
//     closeModal(null); // detail 모달을 닫음
//     openUpdateModal(id); // update 모달을 열음
//   };

//   return (
//     id && (
//       <div>
//         {/* 모달 내용 */}
//         <button onClick={handleEdit}>수정하기</button>
//         <button onClick={() => closeModal(null)}>닫기</button>
//       </div>
//     )
//   );
// }
// function Updatetodo() {
//   const id = useRecoilValue(updateModalState);
//   const closeModal = useSetRecoilState(updateModalState);
//   const card = useRecoilValue(selectedCard(id));

//   return (
//     id && (
//       <div>

//         <button onClick={() => closeModal(null)}>닫기</button>
//       </div>
//     )
//   );
// }
