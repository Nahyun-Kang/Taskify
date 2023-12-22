'use client';

import useRenderModal from '../../_hook/useRenderModal';
import { MODALTYPE } from '../../_constant/modalType';
export default function Username() {
  const [modalType, callModal] = useRenderModal();

  const handleRenderModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    callModal(String((e.target as HTMLElement).id));
  };

  return (
    <>
      <div onClick={handleRenderModal} id={MODALTYPE.COLUMN.CREATE}>
        칼럼생성하자
      </div>
      ;
      <div onClick={handleRenderModal} id={MODALTYPE.COLUMN.UPDATE}>
        칼럼관리하자
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.TODO.CREATE}>
        할 일 좀 만들자
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.TODO.UPDATE}>
        할 일 좀 수정하자
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.DASHBOARD.CREATE}>
        새로운 대시보드 만들기 두둥
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.TODO.DELETE}>
        할 일 카드 삭제
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.TODO.DETAIL}>
        할 일 카드 삭제
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.SIGN.MISMATCH}>
        asd
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.SIGN.COMPLETE}>
        가입완료
      </div>
      {modalType}
    </>
  );
}
