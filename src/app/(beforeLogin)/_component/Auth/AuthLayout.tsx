import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>
        <div className='flex'>
          <div>로고 영역</div>
          <div>오늘도 만나서 반가워요!</div>
        </div>
        {children}
        <div>회원이 아니신가요?</div>
      </div>
    </div>
  );
}
