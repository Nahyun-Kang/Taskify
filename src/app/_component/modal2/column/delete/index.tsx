import ModalTitle from '../../_component/modalTitle';
import ModalLayout from '@/src/app/_component/modal2/_component/modalLayout';
import ModalOutside from '../../_component/modalOutside';
import ModalMainContent from '../../_component/modalMainContent';
export function DeleteColumn() {
  const handleClose = () => {};
  return (
    <>
      <ModalOutside>
        <ModalLayout btnName='삭제' btnSize='large' sign={false} onClose={handleClose} onSubmit={() => {}}>
          <ModalTitle title='칼럼 삭제' />
          <ModalMainContent content='' />
        </ModalLayout>
      </ModalOutside>
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
