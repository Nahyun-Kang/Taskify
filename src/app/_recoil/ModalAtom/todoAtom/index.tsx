import { atom } from 'recoil';

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

  return detailTodoCache.get(cardId);
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
