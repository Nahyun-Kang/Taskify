import { atom } from 'recoil';
import { CardInfo, Column } from '@/src/app/(afterLogin)/_constant/type';
import { CommentType2 } from '@/src/app/_component/modal/toDoCard/DetailComponent';
import { ToDoCardDetailProps } from '@/src/app/_component/modal/toDoCard';

const atomCache = new Map();

export const cardStateAboutColumn = (columnId: number) => {
  if (!atomCache.has(columnId)) {
    const cardState = atom<CardInfo[]>({
      key: `cardState${columnId}`,
      default: [],
    });
    atomCache.set(columnId, cardState);
  }

  return atomCache.get(columnId);
};
export const dashboardIdState = atom<string>({
  key: 'dashboardIdState',
  default: '',
});

export const columnState = atom<Column[]>({
  key: `columnState`,
  default: [],
});

export const showToDoModalState = atom<boolean>({
  key: `showToDoModalState`,
  default: true,
});

export const showColumnModalState = atom<boolean>({
  key: `showColumnModalState`,
  default: true,
});

export const openPopOverState = atom<boolean>({
  key: `openPopOverState`,
  default: false,
});
const atomCardCount = new Map();

export const countAboutCardList = (columnId: number) => {
  if (!atomCardCount.has(columnId)) {
    const countState = atom<number | null>({
      key: `countState${columnId}`,
      default: null,
    });
    atomCardCount.set(columnId, countState);
  }

  return atomCardCount.get(columnId);
};

export const updateCardState = atom<ToDoCardDetailProps | null>({
  key: 'updateCardState',
  default: null,
});

const commentsCache = new Map();

export const commentsStateAboutCardId = (cardId: number) => {
  if (!commentsCache.has(cardId)) {
    const commentsState = atom<CommentType2[] | null>({
      key: `comments${cardId}`,
      default: [],
    });
    commentsCache.set(cardId, commentsState);
  }

  return commentsCache.get(cardId);
};
