import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { FieldValues } from 'react-hook-form';

export async function createComment(data: FieldValues, dashboardId: number, cardId: number, columnId: number) {
  try {
    const response = await axiosInstance.post('comments', {
      ...data,
      columnId,
      cardId,
      dashboardId,
    });
    const result = response.data;
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getCommentInfo(query: string, cardId: number) {
  try {
    const response = await axiosInstance.get(`comments?${query}cardId=${cardId}`);
    const result = response.data;
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateCommentInfo(id: number, value: string) {
  try {
    const response = await axiosInstance.put(`comments/${id}`, {
      content: value,
    });
    const result = response.data;
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteCommentInfo(id: number) {
  try {
    const response = await axiosInstance.delete(`comments/${id}`);
    const result = response.data;
    return result;
  } catch (error) {
    throw error;
  }
}
