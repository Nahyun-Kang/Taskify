import { atom } from 'recoil';
export const createDashboardModal = atom<boolean>({
  key: `createDashboardModal`,
  default: false,
});
export const createDashboardModalAboutSide = atom<boolean>({
  key: `createDashboardModalAboutSide`,
  default: false,
});
