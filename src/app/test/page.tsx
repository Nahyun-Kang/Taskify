'use client';

import useRenderModal from '../_component/modal';
import TestTwo from './TestTwo';
export default function Test() {
  const [modalType, callModal] = useRenderModal();

  const handleRenderModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    callModal(String((e.target as HTMLElement).id));
  };

  return (
    <>
      <div>다른페이지임</div>
      <div onClick={handleRenderModal} id='할 일 수정'>
        할 일 좀 수정하자
      </div>
      <div onClick={handleRenderModal} id='할 일 생성'>
        할 일 생성
      </div>
      <div onClick={handleRenderModal} id='새로운 대시보드'>
        새로운 대시보드 만들기 두둥
      </div>
      <div onClick={handleRenderModal} id='비밀번호 불일치'>
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
