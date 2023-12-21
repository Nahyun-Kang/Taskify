'use client';

import useRenderModal from '../_hook/useRenderModal';
import TestTwo from './TestTwo';
import { MODALTYPE } from '@/src/app/_constant/modalType';
export default function Test() {
  const [modalType, callModal] = useRenderModal();

  const handleRenderModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    callModal(String((e.target as HTMLElement).id));
  };

  return (
    <>
      <div>다른페이지임</div>
      <div onClick={handleRenderModal} id={MODALTYPE.TODO.UPDATE}>
        할 일 좀 수정하자
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.TODO.CREATE}>
        할 일 생성
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.DASHBOARD.CREATE}>
        새로운 대시보드 만들기 두둥
      </div>
      <div onClick={handleRenderModal} id={MODALTYPE.MISMATCH.PW}>
        비번 다시 부탁드려요
      </div>
      <div onClick={handleRenderModal} id='비밀번호 불일치'>
        새 칼럼 생성
      </div>
      <div onClick={handleRenderModal} id='비밀번호 불일치'>
        칼럼 관리
      </div>
      {modalType}
      <TestTwo />
    </>
  );
}
