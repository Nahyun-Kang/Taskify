import UserEditLayout from './UserEditLayout';
import PasswordEdit from './PasswordEdit';
import ProfileEdit from './ProfileEdit';
import EditLayout from '../_component/EditLayout';

export default function page() {
  return (
    <EditLayout>
      <div className='flex w-full flex-col gap-3'>
        <UserEditLayout title='프로필'>
          <ProfileEdit />
        </UserEditLayout>
        <UserEditLayout title='비밀번호 변경'>
          <PasswordEdit />
        </UserEditLayout>
      </div>
    </EditLayout>
  );
}
