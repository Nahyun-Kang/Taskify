import { atom } from 'recoil';
export const createColumnState = atom<boolean>({
  key: `createColumnState`,
  default: false,
});

export const getColumnsForDashboardIdState = atom<number | null>({
  key: `getColumnsForDashboardIdState`,
  default: null,
});
const updateColumnCache = new Map();
export const updateColumnsForColumnId = (columnId: number) => {
  if (!updateColumnCache.has(columnId)) {
    const updateColumns = atom<boolean>({
      key: `updateColumns${columnId}`,
      default: false,
    });
    updateColumnCache.set(columnId, updateColumns);
  }

  return updateColumnCache.get(columnId);
};

const deleteColumnCache = new Map();
export const deleteColumnsForColumnId = (columnId: number) => {
  if (!deleteColumnCache.has(columnId)) {
    const deleteColumns = atom<boolean>({
      key: `deleteColumns${columnId}`,
      default: false,
    });
    deleteColumnCache.set(columnId, deleteColumns);
  }

  return deleteColumnCache.get(columnId);
};
