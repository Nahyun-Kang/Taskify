import { atom } from 'recoil';
import { DashboardListProps } from '@/src/app/(afterLogin)/_constant/Dashboard';

export const dashboardState = atom<DashboardListProps>({
  key: 'dashboard',
  default: {
    cursorId: 0,
    dashboards: [],
    totalCount: 0,
  },
});
