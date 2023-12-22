import { useCallback, useEffect } from 'react';
import { useAsync } from './useAsync';
import { axiosInstance } from '../../_util/axiosInstance';

export default function useGetMembers(id = 1, size = 5, page = 1) {
  const getMembers = useCallback(
    () =>
      axiosInstance.get(`https://sp-taskify-api.vercel.app/1-3/members?page=${page}&size=${size}&dashboardId=${id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInRlYW1JZCI6IjEtMyIsImlhdCI6MTcwMjk4MjAyMiwiaXNzIjoic3AtdGFza2lmeSJ9.CyJw1VGMNUVnP97QL8coPmhfCeaBZkMHZDU1KjOyAyo`,
        },
      }),
    [],
  );
  const { execute, error, data } = useAsync(getMembers);
  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { error, data };
}
