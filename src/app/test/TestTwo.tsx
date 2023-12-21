'use client';

import useRenderModal from '../_component/modal';

export default function Test() {
  const [modalType, callModal] = useRenderModal();

  const handleRenderModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    callModal(String((e.target as HTMLElement).id));
  };

  return (
    <>
      <div>다른페이지임212312asd</div>
      <div onClick={handleRenderModal} id='할 일 수정'>
        할 일
      </div>
      <div onClick={handleRenderModal} id='새로운 대시보드'>
        새로운
      </div>
      <div onClick={handleRenderModal} id='비밀번호 불일치'>
        비번
      </div>
      {modalType}
    </>
  );
}
