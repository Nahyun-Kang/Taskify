import { atom } from 'recoil';
export const createDashboardModal = atom<boolean>({
  key: `createDashboardModal`,
  default: false,
});
export const createDashboardModalAboutSide = atom<boolean>({
  key: `createDashboardModalAboutSide`,
  default: false,
});

export const inviteDashboardState = atom<boolean>({
  key: 'inviteDashboard',
  default: false,
});
export const inviteDashboardForList = atom<boolean>({
  key: 'inviteDashboardForList',
  default: false,
});
