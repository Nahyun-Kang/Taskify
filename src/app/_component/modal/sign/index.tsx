// 회원가입 확인 모달 내용
export function CompleteSignUp({ mainTitle }: { mainTitle: string }) {
  return (
    <>
      <span className='flex items-center justify-center text-[1rem] font-medium text-black'>{mainTitle}</span>
    </>
  );
}
// 로그인/회원가입 페이지 비밀번호 불일치 모달 내용
export function MismatchPW({ mainTitle }: { mainTitle: string }) {
  return (
    <>
      <span className='flex items-center justify-center text-[1rem] font-medium text-black'>{mainTitle}</span>
    </>
  );
}
// 이미 가입한 이메일 모달 내용
export function UseAlreadyEmail({ mainTitle }: { mainTitle: string }) {
  return (
    <>
      <span className='flex items-center justify-center text-[1rem] font-medium text-black'>{mainTitle}</span>
    </>
  );
}
