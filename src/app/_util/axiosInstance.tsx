import axios from 'axios';
import axiosErrors from '@/src/app/_util/axiosErrors';
import Alert from '@/src/app/_util/Alert';

export const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/1-3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInRlYW1JZCI6IjEtMyIsImlhdCI6MTcwMjk4MjAyMiwiaXNzIjoic3AtdGFza2lmeSJ9.CyJw1VGMNUVnP97QL8coPmhfCeaBZkMHZDU1KjOyAyo`,
  },
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      const alertParams = {
        errorMessage: '응답 시간이 초과되었습니다.',
        status: 408,
        area: '서버 응답',
      };
      Alert(alertParams);
    }
    const method = error.config.method.toLowerCase();
    const url = error.config.url.toLowerCase();
    const status = error.response.status;
    axiosErrors({ method, url, status });
    return Promise.reject(error);
  },
);
