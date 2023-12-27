import { DashboardListProps } from '@/src/app/(afterLogin)/_constant/Dashboard';
import { axiosInstance } from '@/src/app/_util/axiosInstance';

export const getDashboards = async (): Promise<DashboardListProps | undefined> => {
  try {
    const res = await axiosInstance.get<DashboardListProps>('dashboards?navigationMethod=infiniteScroll', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInRlYW1JZCI6IjEtMyIsImlhdCI6MTcwMjk4MjAyMiwiaXNzIjoic3AtdGFza2lmeSJ9.CyJw1VGMNUVnP97QL8coPmhfCeaBZkMHZDU1KjOyAyo`,
      },
    });
    const { dashboards, totalCount, cursorId } = res.data;

    return { dashboards, totalCount, cursorId: cursorId ?? 0 };
  } catch (error) {
    console.log(error);
  }
};
