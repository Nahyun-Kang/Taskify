import { DashboardListProps, DashboardProps } from '@/src/app/(afterLogin)/_constant/Dashboard';
import { atom, selectorFamily } from 'recoil';

export const dashboardState = atom<DashboardListProps>({
  key: 'dashboard',
  default: {
    cursorId: 0,
    dashboards: [],
    totalCount: 0,
  },
});

export const dashboardSelector = selectorFamily({
  key: 'dashboardSelector',
  get:
    (dashboardId) =>
    ({ get }) => {
      const dashboardData = get(dashboardState);
      const { dashboards } = dashboardData;
      const selectDashboard = dashboards.find((item: DashboardProps) => item.id === Number(dashboardId));
      return selectDashboard || null;
    },
});
