import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { FieldValues } from 'react-hook-form';
import { Dispatch } from 'react';
export default function submitInvitation(
  dashboardId: string | undefined,
  setter: Dispatch<React.SetStateAction<React.ReactElement | null>>,
) {
  const postInvitation = async (data: FieldValues) => {
    try {
      await axiosInstance.post(`dashboards/${dashboardId}/invitations`, {
        email: data.title,
      });
    } catch (error) {
      throw error;
    } finally {
      setter(null);
    }
  };
  return postInvitation;
}
