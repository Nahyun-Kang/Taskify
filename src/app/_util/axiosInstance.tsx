import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/1-3/',
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.status === 409) {
      alert('409에러입니다.');
    }
    return Promise.reject(error);
  },
);
