import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export const useAsync = <T>(asyncFunction: () => Promise<AxiosResponse<T>>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [data, setData] = useState<null | T>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await asyncFunction();
      setData(response?.data ?? null);
      return response;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    execute();
  }, []);

  return { execute, loading, error, data };
};
