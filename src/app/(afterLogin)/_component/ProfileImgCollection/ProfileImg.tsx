import { memberType } from '@/src/app/(afterLogin)/_constant/type';
import { Colors } from '@/src/app/(afterLogin)/_constant/color';
import { TypeNumber } from '@/src/app/(afterLogin)/_constant/type';
import ProfileImage from '../ProfileImage';

interface Props {
  idx: number;
  values: memberType;
  total: number;
  count: number;
}

const Size: TypeNumber = {
  0: '',
  1: 'absolute left-[1.5rem] md:left-[1.875rem]',
  2: 'absolute left-[3rem] md:left-[3.75rem]',
  3: 'absolute left-[4.5rem] md:left-[5.625rem]',
  4: 'absolute left-[6rem] md:left-[7.5rem]',
};

export default function Profile({ idx, values, total, count }: Props) {
  const color = idx === count - 2 ? 'bg-[#F4D7DA] text-[#D25B68]' : `${Colors[idx]} text-white`;

  return (
    <div
      className={`flex h-[2.125rem] w-[2.125rem] items-center justify-center overflow-hidden rounded-full border-2 border-white bg-contain text-[0.875rem] font-semibold md:h-[2.375rem] md:w-[2.375rem] md:text-[1rem] ${Size[idx]} ${color} font-mp`}
    >
      {idx === count - 2 ? (
        `+${total - idx - 1}`
      ) : (
        <ProfileImage profileImageUrl={values.profileImageUrl} nickname={values.nickname} />
      )}
    </div>
  );
}
