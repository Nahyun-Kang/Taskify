import NotFoundLayout from '@/src/app/_component/NotFound';

export default function PageUnAuthorizated() {
  return (
    <>
      <NotFoundLayout
        errorType={`401 ERROR PAGE`}
        errorDescription='접근 권한이 없는 페이지입니다.'
        btnName='로그인 하기'
      />
    </>
  );
}
