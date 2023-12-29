import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { FieldValues } from 'react-hook-form';
import { CallModalType } from '@/src/app/_constant/modalType';

export function editUser(data: FieldValues) {
  const profile = {
    nickname: 'string',
    profileImageUrl: null,
    ...data,
  };
  axiosInstance.put('users/me', profile);
}

export async function editPassword(data: FieldValues, callModal: CallModalType) {
  const { password, newPassword } = data;
  try {
    await axiosInstance.put('auth/password', { password, newPassword });
  } catch (err) {
    callModal({ name: '' });
  }
}
