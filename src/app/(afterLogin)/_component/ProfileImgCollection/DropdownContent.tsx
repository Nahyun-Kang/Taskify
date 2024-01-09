import { memberType } from '@/src/app/(afterLogin)/_constant/type';
import ProfileImage from '@/src/app/(afterLogin)/_component/ProfileImage';
import ProfileImageContainer from '@/src/app/(afterLogin)/_component/ProfileImage/ProfileImageContainer';

interface Props {
  values: memberType;
}

export default function DropdownContent({ values }: Props) {
  return (
    <div className='flex max-w-[20.625rem] items-center gap-2 px-4 py-2'>
      <ProfileImageContainer userId={values.userId}>
        <ProfileImage profileImageUrl={values.profileImageUrl} nickname={values.nickname} />
      </ProfileImageContainer>
      <div className='flex flex-col text-[0.6875rem]'>
        <span className='dark:text-white8'>{values.nickname}</span>
        <span className='text-gray50'>{values.email}</span>
      </div>
    </div>
  );
}
