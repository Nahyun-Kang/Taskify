import { FieldValues } from 'react-hook-form';
import InputForm from '../../../InputForm';
import ModalLayout from '../../_component/modalLayout';
import ModalOutside from '../../_component/modalOutside';
import ModalPortal from '../../_component/modalPortal';
import ModalTitle from '../../_component/modalTitle';
import { dashboardTitleValidate } from '@/src/app/_constant/Input';
import { useRouter } from 'next/navigation';
import { createDashboard } from '@/src/app/_api/Dashboards';
import { useSetRecoilState } from 'recoil';
import { dashboardState } from '@/src/app/_recoil/dashboardAtom';
import { createDashboardModal, createDashboardModalAboutSide } from '@/src/app/_recoil/ModalAtom/dashboardAtom';
import SelectColor from '../../../Chip/SelectColor';

export default function CreateDashboard2({ side }: { side?: boolean }) {
  const router = useRouter();
  const setIsOpenCreateDashboardModal = useSetRecoilState(side ? createDashboardModalAboutSide : createDashboardModal);

  const setDashboardData = useSetRecoilState(dashboardState);

  const onSubmit = async (data: FieldValues) => {
    try {
      const newDashboard = await createDashboard(data);
      setDashboardData((prev) => {
        return { ...prev, dashboards: [newDashboard, ...prev.dashboards] };
      });

      router.push(`/dashboard/${newDashboard.id}`);
      setIsOpenCreateDashboardModal(false);
    } catch (error) {}
  };
  const handleClose = () => setIsOpenCreateDashboardModal(false);
  return (
    <ModalPortal>
      <ModalOutside closeModal={handleClose}>
        <InputForm onSubmit={onSubmit}>
          <ModalLayout btnName='생성' btnSize='large' sign={false} onClose={handleClose}>
            <ModalTitle title='새로운 대시보드' />
            <InputForm.TextInput
              label='대시보드 이름'
              placeholder='대시보드 제목을 입력해주세요'
              id='title'
              validationRules={dashboardTitleValidate}
            />
            <SelectColor />
          </ModalLayout>
        </InputForm>
      </ModalOutside>
    </ModalPortal>
  );
}
