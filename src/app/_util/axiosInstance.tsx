import axios from 'axios';
import { UserDataType } from '../_constant/type';

export const getAccessToken = () => {
  let userDatas;
  let accessToken = '';
  if (typeof window !== 'undefined') {
    userDatas = localStorage.getItem('taskifyUserData');
  }

  if (userDatas) {
    const userData: UserDataType = JSON.parse(userDatas);
    console.log(userData);
    accessToken = userData.accessToken;
    console.log(accessToken);
    return accessToken;
  }
};

export const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/1-3/',
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
    'Cache-Control': 'no-cache',
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          if (typeof window !== 'undefined') {
            window.location.replace('/pageunauthorizated');
          }
          break;
        default:
          return Promise.reject(error);
      }
    }
  },
);
