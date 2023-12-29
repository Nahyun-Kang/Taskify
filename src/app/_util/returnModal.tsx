import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Modal } from '../_component/modal';
import { ToDoCardDetailProps } from '../_component/modal/toDoCard';

// 모달 리턴 함수 (특정 태그의 이벤트 아이디 값에 따라 조건부 렌더링)

interface ReturnModalType {
  name: string;
  onSubmit?: SubmitHandler<FieldValues>;
  cardId?: number;
  setModalType: React.Dispatch<React.SetStateAction<React.ReactElement | null>>;
  cardData?: ToDoCardDetailProps;
  columnId?: number;
}

export default function returnModal({ name, onSubmit, cardId, setModalType, cardData, columnId }: ReturnModalType) {
  switch (name) {
    case '새 칼럼 생성':
      return (
        <Modal
          onSubmit={onSubmit as SubmitHandler<FieldValues>}
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
          onSubmit={onSubmit as SubmitHandler<FieldValues>}
          updateColumn
          btnName='변경'
          setModalType={setModalType}
          btnSize='large'
          sign={false}
          columnId={columnId}
        />
      );
    case '칼럼 삭제':
      return (
        <Modal
          deleteColumn
          btnName='삭제'
          setModalType={setModalType}
          btnSize='large'
          sign={false}
          columnId={columnId}
        />
      );
    case '할 일 생성':
      return (
        <Modal
          onSubmit={onSubmit as SubmitHandler<FieldValues>}
          createToDo
          btnName='생성'
          setModalType={setModalType}
          btnSize='large'
          sign={false}
        />
      );
    case '할 일 수정':
      return (
        <Modal
          onSubmit={onSubmit as SubmitHandler<FieldValues>}
          updateToDo
          btnName='수정'
          setModalType={setModalType}
          btnSize='large'
          sign={false}
          cardId={cardId}
          cardData={cardData}
        />
      );
    case '새로운 대시보드':
      return (
        <Modal
          onSubmit={onSubmit as SubmitHandler<FieldValues>}
          createDashboard
          btnName='생성'
          setModalType={setModalType}
          btnSize='large'
          sign={false}
        />
      );
    case '할 일 삭제':
      return (
        <Modal
          onSubmit={onSubmit as SubmitHandler<FieldValues>}
          deleteToDo
          btnName='삭제'
          setModalType={setModalType}
          btnSize='large'
          sign={false}
        />
      );
    case '할 일 카드 상세':
      return (
        <Modal
          onSubmit={onSubmit as SubmitHandler<FieldValues>}
          detailToDo
          btnName='?'
          setModalType={setModalType}
          btnSize='large'
          sign={false}
          cardId={cardId}
        />
      );
    case '가입이 완료되었습니다!':
      return (
        <Modal
          onSubmit={onSubmit as SubmitHandler<FieldValues>}
          signUpComplete
          btnName='확인'
          setModalType={setModalType}
          btnSize='large'
          sign
        />
      );
    case '비밀번호가 일치하지 않습니다.':
      return (
        <Modal
          onSubmit={onSubmit as SubmitHandler<FieldValues>}
          mismatchPW
          btnName='확인'
          setModalType={setModalType}
          btnSize='large'
          sign
        />
      );
    case '이미 사용 중인 이메일입니다.':
      return (
        <Modal
          onSubmit={onSubmit as SubmitHandler<FieldValues>}
          alreadyUseEmail
          btnName='확인'
          setModalType={setModalType}
          btnSize='large'
          sign
        />
      );
    case '초대하기':
      return (
        <Modal
          onSubmit={onSubmit as SubmitHandler<FieldValues>}
          inviteDashBoard
          btnName='초대'
          setModalType={setModalType}
          btnSize='large'
          sign={false}
        />
      );
    default:
      return (
        <Modal
          onSubmit={onSubmit as SubmitHandler<FieldValues>}
          base
          btnName='확인'
          setModalType={setModalType}
          btnSize='large'
          sign={true}
          content={name}
        />
      );
  }
}
