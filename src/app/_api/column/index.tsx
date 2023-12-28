// 칼럼 생성을 위한 서브밋 함수

// const onSubmitForCreateColumn = async (form: FieldValues) => {
//   try {
//     await axiosInstance.post('columns', { ...form, dashboardId: 14 });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const handleRenderCreateColumn = async (e: React.MouseEvent<HTMLDivElement>) => {
//   if (typeof callModal === 'function') {
//     callModal({ name: (e.target as HTMLElement).id, onSubmit: onSubmitForCreateColumn });
//   }
// };
// // 칼럼 수정을 위한 서브밋 함수
// const onSubmitForUpdateColumn = async (form: FieldValues) => {
//   try {
//     await axiosInstance.put('columns/1233', { ...form });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // 칼럼 수정 모달 호출을 위한 함수

// const handleRenderUpdateColumn = async (e: React.MouseEvent<HTMLDivElement>) => {
//   if (typeof callModal === 'function') {
//     callModal({
//       name: (e.target as HTMLElement).id,
//       onSubmit: onSubmitForUpdateColumn,
//       columnId: 1233,
//     });
//   }
// };
