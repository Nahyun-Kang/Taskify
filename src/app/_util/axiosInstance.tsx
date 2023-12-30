import axios from 'axios';
import { UserDataType } from '../_constant/type';

const userDataString = localStorage.getItem('taskifyUserData');
let accessToken = '';

if (userDataString) {
  const userData: UserDataType = JSON.parse(userDataString);
  accessToken = userData.accessToken;
}

export const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/1-3/',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
