import { useRecoilCallback } from 'recoil';
import { cardStateAboutColumn, countAboutCardList } from '../_recoil/cardAtom';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { DropResult } from 'react-beautiful-dnd';

export default function useDragCardEnd() {
  return useRecoilCallback(
    ({ snapshot, set }) =>
      async (result: DropResult) => {
        const { source, destination } = result;
        if (!destination || source.droppableId === destination.droppableId) return;

        const OriginalSourceCards = [...snapshot.getLoadable(cardStateAboutColumn(+source.droppableId)).contents];
        const OriginalDestinationCards = [
          ...snapshot.getLoadable(cardStateAboutColumn(+destination.droppableId)).contents,
        ];

        try {
          const sourceCards = [...OriginalSourceCards];
          const destinationCards = [...OriginalDestinationCards];

          const [movedCard] = sourceCards.splice(source.index, 1);

          destinationCards.push(movedCard);

          set(cardStateAboutColumn(+source.droppableId), sourceCards);
          set(cardStateAboutColumn(+destination.droppableId), destinationCards);
          set(countAboutCardList(+source.droppableId), sourceCards.length);
          set(countAboutCardList(+destination.droppableId), destinationCards.length);

          await axiosInstance.put(`cards/${+movedCard.id}`, {
            ...movedCard,
            columnId: +destination.droppableId,
          });
        } catch (error) {
          console.log(error);
          set(cardStateAboutColumn(+source.droppableId), OriginalSourceCards);
          set(cardStateAboutColumn(+destination.droppableId), OriginalDestinationCards);
          set(countAboutCardList(+source.droppableId), OriginalSourceCards.length);
          set(countAboutCardList(+destination.droppableId), OriginalDestinationCards.length);
        }
      },
    [],
  );
}
