import EditLayout from './EditLayout';
import PasswordEdit from './PasswordEdit';
import ProfileEdit from './ProfileEdit';

export default function page() {
  return (
    <div className='mt-[4.375rem] flex w-full flex-col gap-3'>
      <EditLayout title='프로필'>
        <ProfileEdit />
      </EditLayout>
      <EditLayout title='비밀번호 변경'>
        <PasswordEdit />
      </EditLayout>
    </div>
  );
}
