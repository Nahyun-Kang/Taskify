import { FieldValues } from 'react-hook-form';
import { axiosInstance } from '@/src/app/_util/axiosInstance';

export async function createTodoCard(data: FieldValues, dashboardId: number, columnId: number) {
  try {
    const res = await axiosInstance.post('cards', { ...data, dashboardId, columnId });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteTodoCard(cardId: number) {
  try {
    await axiosInstance.delete(`cards/${cardId}`);
  } catch (error) {
    throw error;
  }
}

export async function updateTodoCard(data: FieldValues, cardId: number) {
  try {
    const res = await axiosInstance.put(`cards/${cardId}`, {
      ...data,
      columnId: +data.columnId,
      assigneeUserId: +data.assigneeUserId,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getDetailTodoCard(cardId: number) {
  try {
    const res = await axiosInstance.get(`cards/${cardId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getMembersForDropdown(dashboardId: string) {
  try {
    const response = await axiosInstance.get(`members?dashboardId=${dashboardId}`);
    const result = response.data.members;
    return result;
  } catch (error) {
    throw error;
  }
}
