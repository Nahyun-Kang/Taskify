import { memberType } from '@/src/app/(afterLogin)/_constant/type';
import { Colors } from '@/src/app/(afterLogin)/_constant/color';

interface Props {
  values: memberType;
}

export default function InnerContent({ values }: Props) {
  return (
    <div className='flex max-w-[20.625rem] items-center gap-2 px-4 py-2'>
      <div
        className={`${
          Colors[values.userId % 5]
        } h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-white text-center text-[0.875rem] font-semibold text-white`}
      >
        {values?.profileImageUrl ? (
          <div
            className='h-full w-full'
            style={{ backgroundImage: `url(${values.profileImageUrl})`, backgroundSize: 'contain' }}
          ></div>
        ) : (
          values?.nickname[0]
        )}
      </div>
      <div className='flex flex-col text-[0.6875rem]'>
        <span>{values.nickname}</span>
        <span className='text-gray50'>{values.email}</span>
      </div>
    </div>
  );
}
