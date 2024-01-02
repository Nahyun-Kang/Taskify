import Confirm from '@/src/app/_component/Button/Confirm';
import SelectColor from '@/src/app/_component/Chip/SelectColor';
import InputForm from '@/src/app/_component/InputForm';
import { FieldValues } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dashboardSelector, dashboardState } from '@/src/app/_recoil/dashboardAtom';
import { updateDashboard } from '@/src/app/_api/Dashboards';

interface EditBoardProps {
  dashboardId: string | undefined;
}

export default function EditBoard({ dashboardId }: EditBoardProps) {
  const selectDashboard = useRecoilValue(dashboardSelector(dashboardId));
  const setDashboardData = useSetRecoilState(dashboardState);

  const handleUpdate = async (data: FieldValues) => {
    const result = await updateDashboard(dashboardId, data);
    setDashboardData((prevDashboard) => ({
      ...prevDashboard,
      dashboards: [result, ...prevDashboard.dashboards.filter((item) => item.id !== Number(dashboardId))],
    }));
  };

  return (
    <InputForm onSubmit={(data: FieldValues) => handleUpdate(data)}>
      <div className='item-center flex max-h-[16rem] w-full flex-col gap-[1.25rem] rounded-[0.5rem] p-[1.75rem]'>
        {selectDashboard && (
          <div className='flex w-full justify-between'>
            <p className='text-[1.25rem] font-bold text-black'>{selectDashboard.title}</p>
            <SelectColor selectedColor={selectDashboard.color} />
          </div>
        )}
        <InputForm.TextInput label='대시보드 이름' placeholder='변경할 대시보드 이름을 입력해주세요.' id='editBoard' />
        <div className='flex justify-end'>
          <Confirm size='large' btnName='변경' />
        </div>
      </div>
    </InputForm>
  );
}
