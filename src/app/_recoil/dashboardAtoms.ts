import { DashboardListProps } from '@/src/app/(afterLogin)/_constant/Dashboard';
import { atom } from 'recoil';

export const dashboardState = atom<DashboardListProps>({
  key: 'dashboard',
  default: {
    cursorId: 0,
    dashboards: [],
    totalCount: 0,
  },
});

export const userInfoState = atom({
  key: 'userInfo',
  default: {
    email: null,
    id: null,
    nickname: null,
    profileImageUrl: null,
    updatedAt: null,
  },
});

export const accessTokenState = atom({
  key: 'accessToken',
  default: {
    token: null,
  },
});
