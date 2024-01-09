import ModalLayout from '../../_component/modalLayout';
import ModalOutside from '../../_component/modalOutside';
import ModalPortal from '../../_component/modalPortal';
import ModalMainContent from '../../_component/modalMainContent';
import { useSetRecoilState } from 'recoil';
import { completeSignUpState } from '@/src/app/_recoil/ModalAtom/signAtom';
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
