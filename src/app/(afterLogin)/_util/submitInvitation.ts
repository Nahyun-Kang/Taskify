import { isAxiosError } from 'axios';
import { axiosInstance } from '../../_util/axiosInstance';
import { FieldValues } from 'react-hook-form';

export default function submitInvitation(dashboardId: number) {
  const postInvitation = async (data: FieldValues) => {
    try {
      await axiosInstance.post(`dashboards/${dashboardId}/invitations`, {
        email: data.title,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };
  return postInvitation;
}
