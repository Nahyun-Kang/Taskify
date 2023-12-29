'use client';
import SelectColor from '@/src/app/_component/Chip/SelectColor';
import InputForm from '@/src/app/_component/InputForm';

// 새로운 대시보드 생성 내용
export function CreateDashboard({ mainTitle }: { mainTitle: string }) {
  const handleSelect = () => {};
  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <InputForm.TextInput
        label='대시보드 이름'
        placeholder='대시보드 제목을 입력해주세요'
        id='title'
        isRequired={true}
      />
      <SelectColor onSelect={handleSelect} />
    </>
  );
}

// 대시보드 초대하기  내용
export function InviteDashboard({ mainTitle }: { mainTitle: string }) {
  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <InputForm.EmailInput label='이메일' placeholder='이메일을 입력해주세요' id='title' isRequired={true} />
    </>
  );
}
