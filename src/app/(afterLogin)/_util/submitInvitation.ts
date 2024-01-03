import { isAxiosError } from 'axios';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { FieldValues } from 'react-hook-form';
import { Dispatch, SetStateAction, ReactElement, JSXElementConstructor } from 'react';
export default function submitInvitation(
  dashboardId: string | undefined,
  setter: Dispatch<SetStateAction<ReactElement<unknown, string | JSXElementConstructor<unknown>> | null>>,
) {
  const postInvitation = async (data: FieldValues) => {
    try {
      await axiosInstance.post(`dashboards/${dashboardId}/invitations`, {
        email: data.title,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    } finally {
      setter(null);
    }
  };
  return postInvitation;
}
