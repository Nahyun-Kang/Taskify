// import { useEffect, useState } from 'react';
// import { useSetRecoilState } from 'recoil';
// import { cardListStateAboutColumn } from '../_recoil/CardAtom';
// import { CardInfo } from '../(afterLogin)/_constant/type';
// import { FieldValues } from 'react-hook-form';
// import { axiosInstance } from '../_util/axiosInstance';
// import { updateTodoAboutCardId } from '../_recoil/ModalAtom/todoAtom';

// export const usePutCard = (cardId: number, columnId: number) => {
//   const setCardList = useSetRecoilState(cardListStateAboutColumn(columnId));
//   const [updatedCard, setUpdatedCard] = useState<CardInfo | null>(null);
//   const isOpenUpdateTodoModal = useSetRecoilState(updateTodoAboutCardId(cardId));

//   const putCard = async (form: FieldValues) => {
//     try {
//       const res = await axiosInstance.put(`cards/${cardId}`, {
//         ...form,
//         columnId: +form.columnId,
//         assigneeUserId: +form.assigneeUserId,
//       });
//       setUpdatedCard(res.data);
//     } catch (error) {
//       alert(error);
//     } finally {
//       isOpenUpdateTodoModal(false);
//     }
//   };
//   useEffect(() => {
//     if (updatedCard !== null) {
//       setCardList((oldCards: CardInfo[]) => oldCards.map((item) => (item.id === cardId ? updatedCard : item)));
//     }
//   }, [updatedCard]);

//   useEffect(() => {
//
//   }, [updatedCard]);

//   return { putCard, updatedCard };
// };
