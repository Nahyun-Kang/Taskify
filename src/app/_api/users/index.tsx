import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { AxiosError } from 'axios';
import { FieldValues } from 'react-hook-form';
import { CallModalType } from '../../_constant/modalType';

// POST요청: 회원가입 /{teamID}/users
export const handleSignUp = async (
  values: { [key: string]: string },
  successFunction: () => void,
  errorFunction: () => void,
) => {
  try {
    await axiosInstance.post('users', values);
    successFunction();
  } catch (error: unknown) {
    const { response } = error as unknown as AxiosError;
    if (response && response.status === 409) {
      errorFunction();
    }
  }
};

export async function editPassword(data: FieldValues, callModal: CallModalType) {
  const { password, newPassword } = data;
  try {
    axiosInstance.put('auth/password', { password, newPassword });
    callModal({ name: '비밀번호가 변경되었습니다.' });
  } catch (err) {}
}
