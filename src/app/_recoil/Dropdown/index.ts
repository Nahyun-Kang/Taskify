import { atom } from 'recoil';

export const dropdownState = atom<boolean>({
  key: 'dropdown',
  default: false,
});
