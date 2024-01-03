import {
  authErrorMessages,
  commentsErrorMessages,
  dashboardErrorMessages,
  invitationsErrorMessages,
  membersErrorMessages,
  axiosErrorProps,
} from '@/src/app/_util/getErrorMessages';
import Alert from '@/src/app/_util/Alert';

export default function axiosErrors({ method, url, status }: axiosErrorProps) {
  const alertParams = {
    errorMessage: '',
    status: status,
    area: '',
  };

  if (url.startsWith('auth')) {
    alertParams.errorMessage = authErrorMessages({ method, url, status });
    alertParams.area = '인증';
  }

  if (url.startsWith('comments')) {
    alertParams.errorMessage = commentsErrorMessages({ method, url, status });
    alertParams.area = '댓글';
  }

  if (url.startsWith('dashboards')) {
    alertParams.errorMessage = dashboardErrorMessages({ method, url, status });
    alertParams.area = '대시보드';
  }

  if (url.startsWith('invitations')) {
    alertParams.errorMessage = invitationsErrorMessages({ method, url, status });
    alertParams.area = '초대';
  }

  if (url.startsWith('members')) {
    alertParams.errorMessage = membersErrorMessages({ method, url, status });
    alertParams.area = '멤버';
  }

  if (alertParams.errorMessage) {
    Alert(alertParams);
  }
}
