import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { FieldValues } from 'react-hook-form';

export async function getInvitations(dashboardId: string | undefined, page: number, size: number) {
  try {
    const response = await axiosInstance.get(`dashboards/${dashboardId}/invitations?page=${page}&size=${size}`);
    const result = response.data;
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getMembers(dashboardId: string | undefined, page: number, size: number) {
  try {
    const response = await axiosInstance.get(`members?page=${page}&size=${size}&dashboardId=${dashboardId}`);
    const result = response.data;
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getDashboards() {
  try {
    const res = await axiosInstance.get('dashboards?navigationMethod=infiniteScroll');

    const { dashboards, totalCount, cursorId } = res.data;

    return { dashboards, totalCount, cursorId: cursorId ?? 0 };
  } catch (error) {
    console.log(error);
  }
}

export async function getPaginatedDashboards(page: number, size: number) {
  try {
    const res = await axiosInstance.get(`dashboards?navigationMethod=pagination&page=${page}&size=${size}`);
    const { dashboards, totalCount, cursorId } = res.data;

    return { dashboards, totalCount, cursorId: cursorId ?? 0 };
  } catch (error) {
    console.log(error);
  }
}

export async function getInfiniteDashboards(cursor: number | null, size: number) {
  const query = cursor ? `&cursor=${cursor}` : '';
  try {
    const res = await axiosInstance.get(`dashboards?navigationMethod=infiniteScroll${query}&size=${size}`);
    const { dashboards, totalCount, cursorId } = res.data;

    return { dashboards, totalCount, cursorId: cursorId ?? 0 };
  } catch (error) {
    console.log(error);
  }
}

export async function createDashboard(data: FieldValues) {
  try {
    const res = await axiosInstance.post('dashboards', {
      ...data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
