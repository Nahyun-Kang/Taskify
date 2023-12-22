'use client';

import useRenderModal from '../_hook/useRenderModal';
import { MODALTYPE } from '../_constant/modalType';
export default function Test() {
  const [modalType, callModal] = useRenderModal();

  const handleRenderModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    callModal(String((e.target as HTMLElement).id));
  };

  return (
    <>
      <div>다른페이지임!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</div>
      <div onClick={handleRenderModal} id={MODALTYPE.DASHBOARD.CREATE}>
        대쉬 보드 생성
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.DASHBOARD.INVITE}>
        대쉬 보드 초대하기
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.MY_PAGE.WRONG_PW}>
        마이페이지 비번 틀림
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.SIGN.ALREADY_USE}>
        이미 있는 이메일
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.SIGN.COMPLETE}>
        가입 완료
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.SIGN.MISMATCH}>
        비번 틀림
      </div>

      {modalType}
    </>
  );
}
