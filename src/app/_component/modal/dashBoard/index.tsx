'use client';
import InputField from '../../Input/InputField';
import SelectColor from '../../Chip/SelectColor';

// 새로운 대시보드 생성 내용
export function CreateDashboard({ mainTitle }: { mainTitle: string }) {
  const handleSelect = () => {};
  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <InputField labelText='대시보드 이름' placeholder='대시보드 제목을 입력해주세요' id='title' isRequired={true} />
      <SelectColor onSelect={handleSelect} />
    </>
  );
}

// 대시보드 초대하기  내용
export function InviteDashboard({ mainTitle }: { mainTitle: string }) {
  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <InputField labelText='대시보드 이름' placeholder='대시보드 제목을 입력해주세요' id='title' isRequired={true} />
    </>
  );
}
