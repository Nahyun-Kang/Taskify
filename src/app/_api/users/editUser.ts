import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { FieldValues } from 'react-hook-form';

export default function editUser(data: FieldValues) {
  const profile = {
    nickname: 'string',
    profileImageUrl: null,
    ...data,
  };
  axiosInstance.put('users/me', profile);
}
