import NotFoundLayout from '@/src/app/_component/NotFound';

export default function NotFound() {
  return (
    <>
      <NotFoundLayout errorType={`404 ERROR PAGE`} errorDescription='존재하지 않는 페이지입니다.' btnName='뒤로 가기' />
    </>
  );
}
