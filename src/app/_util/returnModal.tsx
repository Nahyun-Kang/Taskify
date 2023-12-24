import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Modal } from '../_component/modal';
// 모달 리턴 함수 (특정 태그의 이벤트 아이디 값에 따라 조건부 렌더링)
export default function returnModal(
  modalName: string,
  setModalType: React.Dispatch<React.SetStateAction<React.ReactElement | null>>,
  onSubmit: SubmitHandler<FieldValues>,
) {
  switch (modalName) {
    case '새 칼럼 생성':
      return (
        <Modal
          onSubmit={onSubmit}
          createColumn
          btnName='생성'
          setModalType={setModalType}
          btnSize='large'
          sign={false}
        />
      );
    case '칼럼 관리':
      return (
        <Modal
          onSubmit={onSubmit}
          updateOrDeleteColumn
          btnName='변경'
          setModalType={setModalType}
          btnSize='large'
          sign={false}
        />
      );
    case '할 일 생성':
      return (
        <Modal onSubmit={onSubmit} createToDo btnName='생성' setModalType={setModalType} btnSize='large' sign={false} />
      );
    case '할 일 수정':
      return (
        <Modal onSubmit={onSubmit} updateToDo btnName='수정' setModalType={setModalType} btnSize='large' sign={false} />
      );
    case '새로운 대시보드':
      return (
        <Modal
          onSubmit={onSubmit}
          createDashboard
          btnName='생성'
          setModalType={setModalType}
          btnSize='large'
          sign={false}
        />
      );
    case '현재 비밀번호가 틀렸습니다.':
      return (
        <Modal onSubmit={onSubmit} wrongPW btnName='확인' setModalType={setModalType} btnSize='large' sign={false} />
      );
    case '할 일 삭제':
      return (
        <Modal onSubmit={onSubmit} deleteToDo btnName='삭제' setModalType={setModalType} btnSize='large' sign={false} />
      );
    case '할 일 카드 상세':
      return (
        <Modal onSubmit={onSubmit} detailToDo btnName='?' setModalType={setModalType} btnSize='large' sign={false} />
      );
    case '가입이 완료되었습니다!':
      return (
        <Modal onSubmit={onSubmit} signUpComplete btnName='확인' setModalType={setModalType} btnSize='large' sign />
      );
    case '비밀번호가 일치하지 않습니다.':
      return <Modal onSubmit={onSubmit} mismatchPW btnName='확인' setModalType={setModalType} btnSize='large' sign />;
    case '이미 사용 중인 이메일입니다.':
      return (
        <Modal onSubmit={onSubmit} alreadyUseEmail btnName='확인' setModalType={setModalType} btnSize='large' sign />
      );
    case '초대하기':
      return (
        <Modal
          onSubmit={onSubmit}
          inviteDashBoard
          btnName='초대'
          setModalType={setModalType}
          btnSize='large'
          sign={false}
        />
      );
  }
}
