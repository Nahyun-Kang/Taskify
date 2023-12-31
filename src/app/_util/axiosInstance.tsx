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
