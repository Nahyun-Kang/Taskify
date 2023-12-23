export interface Message {
  login?: {
    [key: string]: string;
  };
  signUp?: {
    [key: string]: string;
  };
}

export const MESSAGE = {
  logIn: {
    welcome: '오늘도 만나서 반가워요!',
    check: '회원이 아니신가요?',
    link: '회원가입하기',
    href: '/signup',
  },
  signUp: {
    welcome: '첫 방문을 환영합니다!',
    check: '이미 가입하셨나요?',
    link: '로그인하기',
    href: '/login',
  },
};
