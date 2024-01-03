import UserEditLayout from '@/src/app/(afterLogin)/mypage/UserEditLayout';
import PasswordEdit from '@/src/app/(afterLogin)/mypage/PasswordEdit';
import ProfileEdit from '@/src/app/(afterLogin)/mypage/ProfileEdit';
import EditLayout from '@/src/app/(afterLogin)/_component/EditLayout';

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
