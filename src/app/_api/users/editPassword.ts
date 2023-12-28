import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { FieldValues } from 'react-hook-form';
import { CallModalType } from '@/src/app/_constant/modalType';

export default async function editPassword(data: FieldValues, callModal: CallModalType) {
  const { password, newPassword } = data;
  try {
    await axiosInstance.put('auth/password', { password, newPassword });
  } catch (err) {
    callModal({ name: '비밀번호가 일치하지 않습니다.' });
  }
}
