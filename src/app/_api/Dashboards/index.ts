import { axiosInstance } from '@/src/app/_util/axiosInstance';

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

export async function deleteMember(memberId: number) {
  try {
    const response = await axiosInstance.delete(`members/${memberId}`);
    const status = response.status;
    if (status === 204) {
      alert('삭제 되었습니다.');
    } else {
      alert('삭제 실패!');
    }
    return status;
  } catch (error) {
    throw error;
  }
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

export async function deleteDashboard(dashboardId: string | undefined) {
  try {
    const response = await axiosInstance.delete(`dashboards/${dashboardId}`);
    const status = response.status;
    if (status === 204) {
      alert('대시보드가 삭제 되었습니다.');
    } else {
      alert('대시보드 삭제 실패!');
    }
    return status;
  } catch (error) {
    throw error;
  }
}
