import axios from 'axios';
import axiosErrors from '@/src/app/_util/axiosErrors';
import Alert from '@/src/app/_util/Alert';

export const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/1-3/',
  headers: {
    'Cache-Control': 'no-cache',
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
    const method = error.config?.method?.toLowerCase();
    const url = error.config.url.toLowerCase();
    const status = error.response.status;
    const message = error.response.data.message;
    axiosErrors({ method, url, status, message });
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  (config) => {
    const userDataString = localStorage.getItem('taskifyUserData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const token = userData.accessToken;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
