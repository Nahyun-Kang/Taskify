import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { FieldValues } from 'react-hook-form';
import { CardInfo } from '../../(afterLogin)/_constant/type';

export async function createToDo(dashboardId: number, columnId: number) {
  return async (form: FieldValues) => {
    try {
      const res = await axiosInstance.post<CardInfo>('cards', { ...form, dashboardId, columnId });
      return res.data;
    } catch (error) {
      // console.log(error);
    }
  };
}
