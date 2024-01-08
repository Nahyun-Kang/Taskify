import { atom } from 'recoil';
import { CardInfo, Column } from '@/src/app/(afterLogin)/_constant/type';
import { CommentType2 } from '@/src/app/_component/modal/toDoCard/detail/DetailComponent';
import { ToDoCardDetailProps } from '@/src/app/_component/modal/toDoCard/type';

const atomCache = new Map();

export const cardListStateAboutColumn = (columnId: number) => {
  if (!atomCache.has(columnId)) {
    const cardListState = atom<CardInfo[]>({
      key: `cardState${columnId}`,
      default: [],
    });
    atomCache.set(columnId, cardListState);
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

const todoModalCache = new Map();

export const showToDoModalStateAboutCard = (cardId: number) => {
  if (!todoModalCache.has(cardId)) {
    const showToDoModalState = atom<boolean>({
      key: `showToDoModalState${cardId}`,
      default: false,
    });
    todoModalCache.set(cardId, showToDoModalState);
  }

  return todoModalCache.get(cardId);
};

const columnModalCache = new Map();

export const showColumnModalStateAboutId = (columnId: number) => {
  if (!columnModalCache.has(columnId)) {
    const showColumnModalState = atom<boolean>({
      key: `showColumnModalState${columnId}`,
      default: false,
    });
    columnModalCache.set(columnId, showColumnModalState);
  }

  return columnModalCache.get(columnId);
};

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
