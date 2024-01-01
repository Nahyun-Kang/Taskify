import { atom } from 'recoil';
import { CardInfo, Column } from '@/src/app/(afterLogin)/_constant/type';
import { commentType } from '@/src/app/_component/modal/toDoCard';

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

export const showModalState = atom<boolean>({
  key: `showModalState`,
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

export const commentsState = atom<commentType[] | null>({
  key: 'commentsState',
  default: [],
});
