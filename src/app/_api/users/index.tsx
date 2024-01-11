import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { AxiosError } from 'axios';
import { FieldValues } from 'react-hook-form';

// POST요청: 회원가입 /{teamID}/users
export const handleSignUp = async (
  values: { [key: string]: string },
  successFunction: (open: boolean) => void,
  errorFunction: (open: boolean) => void,
) => {
  try {
    await axiosInstance.post('users', values);
    successFunction(true);
  } catch (error: unknown) {
    const { response } = error as unknown as AxiosError;
    if (response && response.status === 409) {
      errorFunction(true);
    }
  }
};

export async function editPassword(data: FieldValues) {
  const { password, newPassword } = data;
  try {
    axiosInstance.put('auth/password', { password, newPassword });
  } catch (err) {}
}
