'use client';

import useRenderModal from '../../_component/modal';

export default function Username() {
  const [modalType, callModal] = useRenderModal();

  const handleRenderModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    callModal(String((e.target as HTMLElement).id));
  };

  return (
    <>
      <div onClick={handleRenderModal} id='새 칼럼 생성'>
        칼럼생성하자
      </div>
      ;
      <div onClick={handleRenderModal} id='칼럼 관리'>
        칼럼관리하자
      </div>
      <div onClick={handleRenderModal} id='할 일 생성'>
        할 일 좀 만들자
      </div>
      <div onClick={handleRenderModal} id='할 일 수정'>
        할 일 좀 수정하자
      </div>
      <div onClick={handleRenderModal} id='새로운 대시보드'>
        새로운 대시보드 만들기 두둥
      </div>
      <div onClick={handleRenderModal} id='비밀번호 불일치'>
        비번 다시 부탁드려요
      </div>
      {modalType}
    </>
  );
}
