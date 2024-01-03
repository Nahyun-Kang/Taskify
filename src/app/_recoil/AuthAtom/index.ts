import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { accessTokenType, userInfoType } from '../../(beforeLogin)/_constants/type';

const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'taskifyUserData',
  storage: localStorage,
});

export const userInfoState = atom<userInfoType>({
  key: 'userInfo',
  default: {
    email: null,
    id: null,
    nickname: '',
    profileImageUrl: '',
    createdAt: null,
    updatedAt: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const accessTokenState = atom<accessTokenType>({
  key: 'accessToken',
  default: {
    token: null,
  },
  effects_UNSTABLE: [persistAtom],
});

//왜 안되지?
