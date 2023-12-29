import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '../_recoil/AuthAtom';

export const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/1-3/',
  headers: {
    Authorization: `Bearer ${useRecoilValue(accessTokenState)}`,
  },
});
