import ModalLayout from '@/src/app/_component/modal/_component/modalLayout';
import ModalOutside from '@/src/app/_component/modal/_component/modalOutside';
import ModalPortal from '@/src/app/_component/modal/_component/modalPortal';
import ModalMainContent from '@/src/app/_component/modal/_component/modalMainContent';
import { useSetRecoilState } from 'recoil';
import { completeSignUpState } from '@/src/app/_recoil/ModalAtom/sign';
import { modalNameState } from '@/src/app/_recoil/ModalNameAtom';
import { useEffect } from 'react';

export default function CompleteSignUp() {
  const content = '가입이 완료되었습니다!';
  const setIsOpenSucessModal = useSetRecoilState(completeSignUpState);
  const handleClose = () => setIsOpenSucessModal(false);
  const setModalName = useSetRecoilState(modalNameState);

  useEffect(() => {
    setModalName(content);
    return () => setModalName('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalPortal>
      <ModalOutside closeModal={handleClose}>
        <ModalLayout btnName='확인' btnSize='large' sign={true} onClose={handleClose}>
          <ModalMainContent content={content} />
        </ModalLayout>
      </ModalOutside>
    </ModalPortal>
  );
}
