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
  };
  errorText?: string;
}

export const VALIDATE: { [key: string]: RegExp } = {
  userEmail:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  userPassword: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/,
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
    message: '올바른 이메일 주소가 아닙니다.',
  },
};

export const passwordValidate = {
  required: {
    value: true,
    message: '비밀번호를 입력해주세요.',
  },
  pattern: {
    value: VALIDATE.userPassword,
    message: '비밀번호 패턴',
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
