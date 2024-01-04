import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { FieldValues } from 'react-hook-form';
import { Dispatch } from 'react';
import { SetterOrUpdater } from 'recoil';
export default function submitInvitation(
  dashboardId: string | undefined,
  setter: Dispatch<React.SetStateAction<React.ReactElement | null>>,
  setIsChange: SetterOrUpdater<boolean>,
) {
  const postInvitation = async (data: FieldValues) => {
    try {
      await axiosInstance.post(`dashboards/${dashboardId}/invitations`, {
        email: data.title,
      });
      setIsChange((prev) => !prev);
    } catch (error) {
      throw error;
    } finally {
      setter(null);
    }
  };
  return postInvitation;
}
