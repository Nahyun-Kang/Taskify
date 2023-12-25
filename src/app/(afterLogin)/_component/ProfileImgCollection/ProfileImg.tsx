import { memberType } from '@/src/app/(afterLogin)/_constant/type';

interface Props {
  idx: number;
  values?: memberType;
  total: number;
  count: number;
}

type Type = {
  [key: number]: string;
};

const Size: Type = {
  0: '',
  1: 'absolute left-[1.5rem] md:left-[1.875rem]',
  2: 'absolute left-[3rem] md:left-[3.75rem]',
  3: 'absolute left-[4.5rem] md:left-[5.625rem]',
  4: 'absolute left-[6rem] md:left-[7.5rem]',
};

const Colors: Type = {
  0: 'bg-[#FFC85A]',
  1: 'bg-[#FDD446]',
  2: 'bg-[#9DD7ED]',
  3: 'bg-[#C4B1A2]',
};

export default function Profile({ idx, values, total, count }: Props) {
  const color = idx === count - 2 ? 'bg-[#F4D7DA] text-[#D25B68]' : `${Colors[idx]} text-white`;
  const createContent = () => {
    if (idx === count - 2) {
      return `+${total - idx}`;
    } else if (values?.profileImageUrl) {
      return (
        <div
          className='h-full w-full'
          style={{ backgroundImage: `url(${values.profileImageUrl})`, backgroundSize: 'contain' }}
        ></div>
      );
    } else {
      return values?.nickname[0];
    }
  };

  return (
    <div
      className={`flex h-[2.125rem] w-[2.125rem] items-center justify-center overflow-hidden rounded-full border-2 border-white bg-contain text-[0.875rem] font-semibold md:h-[2.375rem] md:w-[2.375rem] md:text-[1rem] ${Size[idx]} ${color} font-mp`}
    >
      {createContent()}
    </div>
  );
}
