import { atom } from 'recoil';

export interface ModalType {
  modalType: string;
}

export const modalNameState = atom<string>({
  key: 'modalName',
  default: '',
});
