import { CardInfo } from '@/src/app/(afterLogin)/_constant/type';
import { ToDoCardDetailProps } from '@/src/app/_component/modal/todo/type';
import { atom } from 'recoil';
import { Column } from '@/src/app/(afterLogin)/_constant/type';
import { CommentType } from '@/src/app/_component/modal/todo/type';

const createTodoCache = new Map();
export const createTodoAboutColumnId = (ColumnId: number) => {
  if (!createTodoCache.has(ColumnId)) {
    const createTodo = atom<boolean>({
      key: `createTodo${ColumnId}`,
      default: false,
    });
    createTodoCache.set(ColumnId, createTodo);
  }

  return createTodoCache.get(ColumnId);
};

const detailTodoCache = new Map();
export const detailTodoAboutCardId = (cardId: number) => {
  if (!detailTodoCache.has(cardId)) {
    const detailTodo = atom<boolean>({
      key: `detailTodo${cardId}`,
      default: false,
    });
    detailTodoCache.set(cardId, detailTodo);
  }

  return detailTodoCache.get(cardId);
};

const updateTodoCache = new Map();
export const updateTodoAboutCardId = (cardId: number) => {
  if (!updateTodoCache.has(cardId)) {
    const updateTodo = atom<boolean>({
      key: `updateTodo${cardId}`,
      default: false,
    });
    updateTodoCache.set(cardId, updateTodo);
  }

  return updateTodoCache.get(cardId);
};

const deleteTodoCache = new Map();
export const deleteTodoAboutCardId = (cardId: number) => {
  if (!deleteTodoCache.has(cardId)) {
    const deleteTodo = atom<boolean>({
      key: `deleteTodo${cardId}`,
      default: false,
    });
    deleteTodoCache.set(cardId, deleteTodo);
  }

  return deleteTodoCache.get(cardId);
};

export const detailcardDataState = atom<ToDoCardDetailProps | null>({
  key: `detailcardData`,
  default: null,
});

export const updateCardState = atom<CardInfo | null>({
  key: 'updateCardState',
  default: null,
});

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

const commentsCache = new Map();

export const commentsStateAboutCardId = (cardId: number) => {
  if (!commentsCache.has(cardId)) {
    const commentsState = atom<CommentType[] | null>({
      key: `comments${cardId}`,
      default: [],
    });
    commentsCache.set(cardId, commentsState);
  }

  return commentsCache.get(cardId);
};
