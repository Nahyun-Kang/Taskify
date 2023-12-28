// 할 일 카드 생성을 위한 onSubmit 함수 및  호출 함수
// export const onSubmitForCreateToDo = async (form: FieldValues) => {
//   try {
//     const res = await axiosInstance.post('cards', { ...form, dashboardId: 14, columnId: 50 });

//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const handleRenderCreateTodoModal = (e: React.MouseEvent<HTMLDivElement>) => {
//   if (typeof callModal === 'function') {
//     callModal({ name: (e.target as HTMLElement).id, onSubmit: onSubmitForCreateToDo });
//   }
// };

// // 할 일 카드 상세 모달을 호출하기 위한 함수
// export const handleRenderDetaildoModal = async (e: React.MouseEvent<HTMLDivElement>) => {
//   if (typeof callModal === 'function') {
//     callModal({ name: (e.target as HTMLElement).id, cardId: 59 });
//   }
// };

// 카드 수정 서브밋 함수
// const putCard = async (form: FieldValues) => {
//   try {
//     const res = await axiosInstance.put('cards/59', {
//       ...form,
//       columnId: +form.columnId,
//       assigneeUserId: +form.assigneeUserId,
//     });
//     console.log(form);
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// };
// // 카드 수정 모달 호출 함수
// const RenderUpdatedoModal = (e: React.MouseEvent<HTMLDivElement>, card: ToDoCardDetailProps) => {
//   if (typeof callModal === 'function') {
//     callModal({ name: (e.target as HTMLElement).id, onSubmit: putCard, cardData: card });
//   }
// };

// // 카드 삭제 서브밋 함수
// const DeleteCard = async () => {
//   try {
//     await axiosInstance.delete('cards/59');
//   } catch (error) {
//     console.log(error);
//   }
// };
// // 카드 삭제 모달 호출 함수
// const RenderDeleteModal = (e: React.MouseEvent<HTMLDivElement>) => {
//   if (typeof callModal === 'function') {
//     callModal({ name: (e.target as HTMLElement).id, onSubmit: DeleteCard });
//   }
// };
