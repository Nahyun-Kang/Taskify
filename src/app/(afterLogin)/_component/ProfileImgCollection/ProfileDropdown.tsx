import React from 'react';
import { memberType } from '@/src/app/(afterLogin)/_constant/type';
import InnerContent from './InnerContent';

interface Props {
  members: memberType[];
}

export default function ProfileDropdown({ members }: Props) {
  return (
    <div
      className={`absolute right-[-3rem] top-[3rem] z-[4] flex flex-col rounded border border-gray30 bg-white md:right-[-3.5rem] lg:right-[-7.3rem]`}
    >
      {members.map((el, idx) => (
        <InnerContent values={el} key={`${idx}profile`} />
      ))}
    </div>
  );
}
