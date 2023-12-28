import { atom } from 'recoil';
import { CardInfo } from '../(afterLogin)/_constant/type';

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
