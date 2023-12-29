import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { AxiosError } from 'axios';

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
