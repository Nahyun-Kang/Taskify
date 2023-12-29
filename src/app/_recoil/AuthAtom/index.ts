import { atom } from 'recoil';
import { accessTokenType, userInfoType } from '../../(beforeLogin)/_constants/type';

export const userInfoState = atom<userInfoType>({
  key: 'userInfo',
  default: {
    email: null,
    id: null,
    nickname: null,
    profileImageUrl: null,
    updatedAt: null,
  },
});

export const accessTokenState = atom<accessTokenType>({
  key: 'accessToken',
  default: {
    token: null,
  },
});
