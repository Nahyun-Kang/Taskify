export interface CommonInputProps {
  label: string;
  placeholder: string;
  id: string;
  isRequired?: boolean;
  apiError?: string;
  initialValue?: string;
  validationRules?: {
    required?: {
      value: boolean;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
  };
  errorText?: string;
}

export const VALIDATE: { [key: string]: RegExp } = {
  userEmail:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  userPassword: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
};

export interface FormData {
  email: string;
  password: string;
  text: string;
  date: Date;
  comment: string;
  tags: string[];
}

export const emailValidate = {
  required: {
    value: true,
    message: '이메일을 입력해주세요.',
  },
  pattern: {
    value: VALIDATE.userEmail,
    message: '이메일 형식으로 작성해주세요.',
  },
};

export const passwordValidate = {
  required: {
    value: true,
    message: '비밀번호를 입력해주세요.',
  },
  pattern: {
    value: VALIDATE.userPassword,
    message: '숫자, 영문자조합으로 8자리 이상으로 작성해주세요',
  },
  minLength: {
    value: 8,
    message: '8자 이상 작성해주세요',
  },
};

export const dateValidate = {
  required: {
    value: true,
    message: '날짜를 선택해주세요.',
  },
};

export const requiredValidate = {
  required: {
    value: true,
    message: '',
  },
};

export const nicknameValidate = {
  maxLength: {
    value: 10,
    message: '열 자 이하로 작성해주세요',
  },
};

export const titleValidate = {
  maxLength: {
    value: 10,
    message: '제목은 열 자 이하로 작성해주세요.',
  },
};

export const dashboardTitleValidate = {
  maxLength: {
    value: 15,
    message: '대시보드 이름은 열다섯 자 이하로 작성해주세요.',
  },
};

export const columnTitleValidate = {
  maxLength: {
    value: 15,
    message: '컬럼 이름은 열다섯 자 이하로 작성해주세요.',
  },
};
