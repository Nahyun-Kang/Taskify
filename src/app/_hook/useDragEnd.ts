import { useRecoilCallback } from 'recoil';
import { cardListStateAboutColumn, countAboutCardList } from '@/src/app/_recoil/CardAtom';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { DropResult } from 'react-beautiful-dnd';

export default function useDragCardEnd() {
  return useRecoilCallback(
    ({ snapshot, set }) =>
      async (result: DropResult) => {
        const { source, destination } = result;
        if (!destination || source.droppableId === destination.droppableId) return;

        const OriginalSourceCount = snapshot.getLoadable(countAboutCardList(+source.droppableId)).contents;
        const OriginalDestinationCount = snapshot.getLoadable(countAboutCardList(+destination.droppableId)).contents;
        const OriginalSourceCards = [...snapshot.getLoadable(cardListStateAboutColumn(+source.droppableId)).contents];
        const OriginalDestinationCards = [
          ...snapshot.getLoadable(cardListStateAboutColumn(+destination.droppableId)).contents,
        ];

        try {
          const sourceCards = [...OriginalSourceCards];
          const destinationCards = [...OriginalDestinationCards];

          const [movedCard] = sourceCards.splice(source.index, 1);

          destinationCards.push(movedCard);

          set(cardListStateAboutColumn(+source.droppableId), sourceCards);
          set(cardListStateAboutColumn(+destination.droppableId), destinationCards);
          set(countAboutCardList(+source.droppableId), OriginalSourceCount - 1);
          set(countAboutCardList(+destination.droppableId), OriginalDestinationCount + 1);

          await axiosInstance.put(`cards/${+movedCard.id}`, {
            ...movedCard,
            columnId: +destination.droppableId,
          });
        } catch (error) {
          set(cardListStateAboutColumn(+source.droppableId), OriginalSourceCards);
          set(cardListStateAboutColumn(+destination.droppableId), OriginalDestinationCards);
          set(countAboutCardList(+source.droppableId), OriginalSourceCount);
          set(countAboutCardList(+destination.droppableId), OriginalDestinationCount);
        }
      },
    [],
  );
}
