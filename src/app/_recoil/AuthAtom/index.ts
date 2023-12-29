import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { accessTokenType, userInfoType } from '../../(beforeLogin)/_constants/type';

const { persistAtom } = recoilPersist({
  key: 'localStorage',
  storage: localStorage,
});

export const userInfoState = atom<userInfoType>({
  key: 'userInfo',
  default: {
    email: null,
    id: null,
    nickname: null,
    profileImageUrl: null,
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
