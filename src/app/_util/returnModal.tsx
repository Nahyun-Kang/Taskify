import { Modal } from '../_component/modal';

// 모달 리턴 함수 (특정 태그의 이벤트 아이디 값에 따라 조건부 렌더링)
export default function returnModal(
  modalName: string,
  setModalType: React.Dispatch<React.SetStateAction<React.ReactElement | null>>,
) {
  switch (modalName) {
    case '새 칼럼 생성':
      return <Modal createColumn btnName='생성' setModalType={setModalType} btnSize='large' sign={false} />;
    case '칼럼 관리':
      return <Modal updateOrDeleteColumn btnName='변경' setModalType={setModalType} btnSize='large' sign={false} />;
    case '할 일 생성':
      return <Modal createToDo btnName='생성' setModalType={setModalType} btnSize='large' sign={false} />;
    case '할 일 수정':
      return <Modal updateToDo btnName='수정' setModalType={setModalType} btnSize='large' sign={false} />;
    case '새로운 대시보드':
      return <Modal createDashboard btnName='생성' setModalType={setModalType} btnSize='large' sign={false} />;
    case '현재 비밀번호가 틀렸습니다.':
      return <Modal wrongPW btnName='확인' setModalType={setModalType} btnSize='large' sign={false} />;
    case '할 일 삭제':
      return <Modal deleteToDo btnName='삭제' setModalType={setModalType} btnSize='large' sign={false} />;
    case '할 일 카드 상세':
      return <Modal detailToDo btnName='?' setModalType={setModalType} btnSize='large' sign={false} />;
    case '가입이 완료되었습니다!':
      return <Modal signUpComplete btnName='확인' setModalType={setModalType} btnSize='large' sign />;
    case '비밀번호가 일치하지 않습니다.':
      return <Modal mismatchPW btnName='확인' setModalType={setModalType} btnSize='large' sign />;
    case '이미 사용 중인 이메일입니다.':
      return <Modal alreadyUseEmail btnName='확인' setModalType={setModalType} btnSize='large' sign />;
    case '초대하기':
      return <Modal inviteDashBoard btnName='초대' setModalType={setModalType} btnSize='large' sign={false} />;
  }
}
