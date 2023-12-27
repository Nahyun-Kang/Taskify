import { axiosInstance } from '@/src/app/_util/axiosInstance';

export async function getInvitations(page: number, size: number) {
  try {
    const response = await axiosInstance.get(`dashboards/163/invitations?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    });
    const result = response.data;
    return result;
  } catch (error) {
    throw error;
  }
}
