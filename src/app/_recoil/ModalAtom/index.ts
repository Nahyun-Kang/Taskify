import { atom } from 'recoil';

export interface ModalType {
  modalType: string;
}

export const modalTypeState = atom<string>({
  key: 'modalType',
  default: '',
});
