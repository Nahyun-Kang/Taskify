import { FieldValues, SubmitHandler } from 'react-hook-form';
import InputForm from '@/src/app/_component/InputForm';
import ModalLayout from '@/src/app/_component/modal/_component/modalLayout';
import ModalOutside from '@/src/app/_component/modal/_component/modalOutside';
import ModalPortal from '@/src/app/_component/modal/_component/modalPortal';
import ModalTitle from '@/src/app/_component/modal/_component/modalTitle';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { inviteDashboardState, inviteDashboardForList } from '@/src/app/_recoil/ModalAtom/dashboard';
import { postInvitation } from '@/src/app/_api/Dashboards';

interface InviteDashboardProps {
  dashboardId: string | undefined;
  setIsChange: SetterOrUpdater<boolean>;
  list?: boolean;
}

export default function InviteDashboard({ dashboardId, setIsChange, list }: InviteDashboardProps) {
  const setIsOpenInviteModal = useSetRecoilState(list ? inviteDashboardForList : inviteDashboardState);
  const closeModal = () => setIsOpenInviteModal(false);
  const onSubmit = async (data: FieldValues) => {
    try {
      await postInvitation(data, dashboardId);
      setIsChange((prev) => !prev);
    } catch (error) {
      throw error;
    } finally {
      setIsOpenInviteModal(false);
    }
  };

  return (
    <ModalPortal>
      <ModalOutside closeModal={closeModal}>
        <InputForm onSubmit={onSubmit as SubmitHandler<FieldValues>}>
          <ModalLayout btnName='초대' btnSize='large' sign={false} onClose={closeModal}>
            <ModalTitle title='초대하기' />
            <InputForm.TextInput label='이메일' placeholder='이메일을 입력해주세요' id='title' isRequired={true} />
          </ModalLayout>
        </InputForm>
      </ModalOutside>
    </ModalPortal>
  );
}
