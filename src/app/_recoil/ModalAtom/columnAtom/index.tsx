import { atom } from 'recoil';
export const createColumnState = atom<boolean>({
  key: `createColumnState`,
  default: false,
});

export const getColumnsForDashboardIdState = atom<number | null>({
  key: `getColumnsForDashboardIdState`,
  default: null,
});

export const updateColumnsForColumnIdState = atom<number | null>({
  key: `updateColumnsForColumnIdState`,
  default: null,
});

export const deleteColumnsForColumnIdState = atom<number | null>({
  key: `deleteColumnsForColumnIdState`,
  default: null,
});
