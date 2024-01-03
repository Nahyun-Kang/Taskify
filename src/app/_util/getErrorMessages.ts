/*eslint-disable no-console*/
export interface axiosErrorProps {
  method: string;
  url: string;
  status: number;
}

export function authErrorMessages({ method, url, status }: axiosErrorProps) {
  let errorMessage = '관리자에게 문의바랍니다.';
  switch (method) {
    case 'post':
      if (status === 400) errorMessage = '이메일 형식으로 작성해주세요.';
      if (status === 404) errorMessage = '존재하지 않는 유저입니다.';
      break;

    case 'put':
      if (status === 400) errorMessage = '비밀번호는 8자 이상 입력해주세요.';
      if (status === 404) errorMessage = '존재하지 않는 유저입니다.';
      break;

    default:
      console.error(`다른 요청 에러 발생  method : ${method}  url : ${url}  status : ${status}`);
  }
  return errorMessage;
}

export function cardsErrorMessages({ method, url, status }: axiosErrorProps) {
  const hasId = /\d/.test(url); //숫자형식인 id 값을 가지고있는지 확인
  let errorMessage = '관리자에게 문의바랍니다.';
  switch (method) {
    case 'post':
      if (status === 400) errorMessage = 'title을 입력해주세요.';
      if (status === 404) errorMessage = '대시보드가 존재하지 않습니다.';
      break;

    case 'get':
      if (status === 404) errorMessage = '대시보드의 멤버가 아닙니다.';
      break;

    case 'put':
      if (hasId) {
        if (status === 400) errorMessage = 'title을 입력해주세요.';
        if (status === 404) errorMessage = '대시보드의 멤버가 아닙니다.';
      } else {
        errorMessage = '잘못된 요청 입니다.';
      }
      break;

    case 'delete':
      if (hasId) {
        if (status === 404) errorMessage = '대시보드의 멤버가 아닙니다.';
      } else {
        errorMessage = '잘못된 요청 입니다.';
      }
      break;

    default:
      console.error(`다른 요청 에러 발생  method : ${method}  url : ${url}  status : ${status}`);
  }
  return errorMessage;
}

export function columnsErrorMessages({ method, url, status }: axiosErrorProps) {
  const hasId = /\d/.test(url); //숫자형식인 id 값을 가지고있는지 확인
  let errorMessage = '관리자에게 문의바랍니다.';
  switch (method) {
    case 'post':
      if (status === 400) errorMessage = 'title을 입력해주세요.';
      if (status === 404) errorMessage = '대시보드가 존재하지 않습니다.';
      break;

    case 'get':
      if (status === 404) errorMessage = '대시보드가 존재하지 않습니다.';
      break;

    case 'put':
      if (hasId) {
        if (status === 400) errorMessage = 'title을 입력해주세요.';
        if (status === 404) errorMessage = '대시보드의 존재하지 않습니다.';
      } else {
        errorMessage = '잘못된 요청 입니다.';
      }
      break;

    case 'delete':
      if (hasId) {
        if (status === 404) errorMessage = '대시보드의 존재하지 않습니다.';
      } else {
        errorMessage = '잘못된 요청 입니다.';
      }
      break;

    default:
      console.error(`다른 요청 에러 발생  method : ${method}  url : ${url}  status : ${status}`);
  }
  return errorMessage;
}

export function commentsErrorMessages({ method, url, status }: axiosErrorProps) {
  const hasId = /\d/.test(url); //숫자형식인 id 값을 가지고있는지 확인
  let errorMessage = '관리자에게 문의바랍니다.';
  switch (method) {
    case 'post':
      if (status === 400) errorMessage = '내용을 입력해주세요.';
      if (status === 404) errorMessage = '대시보드가 존재하지 않습니다.';
      break;

    case 'get':
      if (status === 404) errorMessage = '대시보드의 멤버가 아닙니다.';
      break;

    case 'put':
      if (hasId) {
        if (status === 400) errorMessage = '내용을 입력해주세요.';
        if (status === 403 || status === 401) errorMessage = '댓글 수정 권한이 없습니다.';
        if (status === 404) errorMessage = '대시보드의 멤버가 아닙니다.';
      } else {
        errorMessage = '잘못된 요청 입니다.';
      }
      break;

    case 'delete':
      if (hasId) {
        if (status === 403 || status === 401) errorMessage = '댓글 삭제 권한이 없습니다.';
        if (status === 404) errorMessage = '대시보드의 멤버가 아닙니다.';
      } else {
        errorMessage = '잘못된 요청 입니다.';
      }
      break;

    default:
      console.error(`다른 요청 에러 발생  method : ${method}  url : ${url}  status : ${status}`);
  }
  return errorMessage;
}

export function dashboardErrorMessages({ method, url, status }: axiosErrorProps) {
  const hasId = /\d/.test(url); //숫자형식인 id 값을 가지고있는지 확인
  let errorMessage = '관리자에게 문의바랍니다.';
  switch (method) {
    case 'post':
      if (hasId) {
        if (status === 400) errorMessage = '이메일 형식이 올바르지 않습니다.';
        if (status === 403 || status === 401) errorMessage = '대시보드 초대권한이 없습니다.';
        if (status === 404) errorMessage = '존재하지 않는 유저입니다.';
        if (status === 409) errorMessage = '이미 대시보드에 초대한 멤버입니다.';
      } else {
        errorMessage = '잘못된 요청 입니다.';
      }
      break;

    case 'get':
      if (hasId && status === 404) {
        //상세조회
        errorMessage = '대시보드가 존재하지 않습니다.';
      }
      break;

    case 'put':
      if (hasId) {
        if (status === 400) errorMessage = '수정할 내용을 입력해주세요.';
        if (status === 403 || status === 401) errorMessage = '대시보드 수정 권한이 없습니다.';
        if (status === 404) errorMessage = '대시보드가 존재하지 않습니다.';
      } else {
        errorMessage = '잘못된 요청 입니다.';
      }
      break;

    case 'delete':
      if (hasId) {
        if (status === 403 || status === 401) errorMessage = '대시보드 삭제 권한이 없습니다.';
        if (status === 404) errorMessage = '대시보드가 존재하지 않습니다.';
      } else {
        errorMessage = '잘못된 요청 입니다.';
      }
      break;

    default:
      console.error(`다른 요청 에러 발생  method : ${method}  url : ${url}  status : ${status}`);
  }
  return errorMessage;
}

export function invitationsErrorMessages({ method, url, status }: axiosErrorProps) {
  const hasId = /\d/.test(url); //숫자형식인 id 값을 가지고있는지 확인
  let errorMessage = '관리자에게 문의바랍니다.';
  switch (method) {
    case 'get':
      if (status === 404) errorMessage = 'page는 숫자를 입력해주세요.';
      break;

    case 'put':
      if (hasId) {
        if (status === 400) errorMessage = 'inviteAccepted는 true, false로 입력해주세요.';
        if (status === 403 || status === 401) errorMessage = '초대 응답 권한이 없습니다.';
        if (status === 404) errorMessage = '존재하지 않는 초대입니다.';
      } else {
        errorMessage = '잘못된 요청 입니다.';
      }
      break;

    default:
      console.error(`다른 요청 에러 발생  method : ${method}  url : ${url}  status : ${status}`);
  }
  return errorMessage;
}

export function membersErrorMessages({ method, url, status }: axiosErrorProps) {
  const hasId = /\d/.test(url); //숫자형식인 id 값을 가지고있는지 확인
  let errorMessage = '관리자에게 문의바랍니다.';
  switch (method) {
    case 'get':
      if (status === 404) errorMessage = '대시보드의 멤버가 아닙니다.';
      break;

    case 'delete':
      if (hasId) {
        if (status === 403 || status === 401) errorMessage = '대시보드의 삭제 권한이 없습니다.';
        if (status === 404) errorMessage = '대시보드가 존재하지 않습니다.';
      } else {
        errorMessage = '잘못된 요청 입니다.';
      }
      break;

    default:
      console.error(`다른 요청 에러 발생  method : ${method}  url : ${url}  status : ${status}`);
  }
  return errorMessage;
}

export function usersErrorMessages({ method, url, status }: axiosErrorProps) {
  let errorMessage = '관리자에게 문의바랍니다.';
  switch (method) {
    case 'post':
      if (status === 400) errorMessage = '이메일 형식으로 작성해주세요.';
      if (status === 409) errorMessage = '이미 사용중인 이메일입니다.';
      break;

    case 'get':
      if (status === 401) errorMessage = 'Unauthorized';
      if (status === 404) errorMessage = '존재하지 않는 유저입니다.';
      break;

    case 'put':
      if (status === 400) errorMessage = '닉네임은 10자 이하로 작성해주세요.';
      if (status === 401) errorMessage = 'Unauthorized';

      break;

    default:
      console.error(`다른 요청 에러 발생  method : ${method}  url : ${url}  status : ${status}`);
  }
  return errorMessage;
}
