import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { FieldValues } from 'react-hook-form';

export async function createColumn(data: FieldValues, dashboardId: number) {
  try {
    const res = await axiosInstance.post('columns', {
      title: data,
      dashboardId,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateColumn(data: FieldValues, columnId: number) {
  try {
    const res = await axiosInstance.put(`columns/${columnId}`, {
      ...data,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteColumn(columnId: number) {
  try {
    const res = await axiosInstance.delete(`columns/${columnId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getColumns(dashboardId: number) {
  try {
    const res = await axiosInstance.get(`columns?dashboardId=${dashboardId}`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
}
