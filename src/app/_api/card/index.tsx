import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { FieldValues } from 'react-hook-form';

export function createToDo(dashboardId: number, columnId: number) {
  const create = async (form: FieldValues) => {
    try {
      const res = await axiosInstance.post('cards', { ...form, dashboardId, columnId });
    } catch (error) {
      console.log(error);
    }
  };
  return create;
}

export async function deleteInvitation(dashboardId: string | undefined, invitationId: number) {
  try {
    const response = await axiosInstance.delete(`dashboards/${dashboardId}/invitations/${invitationId}`);
    const status = response.status;
    if (status === 204) {
      alert('취소 되었습니다.');
    } else {
      alert('취소 실패!');
    }
    return status;
  } catch (error) {
    throw error;
  }
}
