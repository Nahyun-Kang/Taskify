import { DashboardListProps } from '../../(afterLogin)/_constant/Dashboard';
import { atom } from 'recoil';

export const dashboardState = atom<DashboardListProps>({
  key: 'dashboard',
  default: {
    cursorId: 0,
    dashboards: [],
    totalCount: 0,
  },
});
