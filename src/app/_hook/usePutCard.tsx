import { useState, useEffect, Dispatch, SetStateAction, ReactElement, JSXElementConstructor } from 'react';
import { useSetRecoilState } from 'recoil';
import { cardStateAboutColumn } from '../_recoil/cardAtom';
import { CardInfo } from '../(afterLogin)/_constant/type';
import { FieldValues } from 'react-hook-form';
import { axiosInstance } from '../_util/axiosInstance';
import { updateCardState } from '../_recoil/cardAtom';

export const usePutCard = (
  cardId: number,
  columnId: number,
  setModalType: Dispatch<SetStateAction<ReactElement<unknown, string | JSXElementConstructor<unknown>> | null>>,
) => {
  const setCards = useSetRecoilState(cardStateAboutColumn(columnId));
  const setCardDataForDetail = useSetRecoilState(updateCardState);
  const [updatedCard, setUpdatedCard] = useState<CardInfo | null>(null);
  const putCard = (e: React.MouseEvent<HTMLElement>) => {
    const card = async (form: FieldValues) => {
      e.stopPropagation();
      try {
        const res = await axiosInstance.put(`cards/${cardId}`, {
          ...form,
          columnId: +form.columnId,
          assigneeUserId: +form.assigneeUserId,
        });
        setUpdatedCard(res.data);
        setCardDataForDetail(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setModalType(null);
      }
    };
    return card;
  };
  useEffect(() => {
    if (updatedCard !== null) {
      setCards((oldCards: CardInfo[]) => oldCards.map((item) => (item.id === cardId ? updatedCard : item)));
    }
  }, [updatedCard, cardId, setCards]);

  return { putCard, updatedCard };
};
