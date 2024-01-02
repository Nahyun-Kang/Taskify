import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { FieldValues } from 'react-hook-form';
import { isAxiosError } from 'axios';
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

export async function updateDashboard(dashboardId: string | undefined, param: FieldValues) {
  try {
    const response = await axiosInstance.put(`dashboards/${dashboardId}`, {
      title: param.editBoard,
      color: param.color,
    });
    const result = response.data;
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getDashboards() {
  try {
    const res = await axiosInstance.get('dashboards?navigationMethod=pagination&page=1&size=100');

    const { dashboards, totalCount, cursorId } = res.data;

    return { dashboards, totalCount, cursorId: cursorId ?? 0 };
  } catch (error) {
    if (isAxiosError(error)) {
      alert(error.response?.data.message);
    }
  }
}

export async function getPaginatedDashboards(page: number, size: number) {
  try {
    const res = await axiosInstance.get(`dashboards?navigationMethod=pagination&page=${page}&size=${size}`);
    const { dashboards, totalCount, cursorId } = res.data;

    return { dashboards, totalCount, cursorId: cursorId ?? 0 };
  } catch (error) {
    if (isAxiosError(error)) {
      alert(error.response?.data.message);
    }
  }
}

export async function getInfiniteDashboards(cursor: number | null, size: number) {
  const query = cursor ? `&cursor=${cursor}` : '';
  try {
    const res = await axiosInstance.get(`dashboards?navigationMethod=infiniteScroll${query}&size=${size}`);
    const { dashboards, totalCount, cursorId } = res.data;

    return { dashboards, totalCount, cursorId: cursorId ?? 0 };
  } catch (error) {
    if (isAxiosError(error)) {
      alert(error.response?.data.message);
    }
  }
}

export async function createDashboard(data: FieldValues) {
  try {
    const res = await axiosInstance.post('dashboards', {
      ...data,
    });
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      alert(error.response?.data.message);
    }
  }
}

export async function putInvitation(invitationId: number, accepted: boolean) {
  try {
    const res = await axiosInstance.put(`invitations/${invitationId}`, {
      inviteAccepted: accepted,
    });
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      alert(error.response?.data.message);
    }
  }
}
