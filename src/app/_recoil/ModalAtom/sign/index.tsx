import { atom } from 'recoil';

export const completeSignUpState = atom<boolean>({
  key: `completeSignUpState`,
  default: false,
});

export const useAlreadyEmailState = atom<boolean>({
  key: `useAlreadyEmailState`,
  default: false,
});

export const editPasswordState = atom<boolean>({
  key: `editPasswordState`,
  default: false,
});
