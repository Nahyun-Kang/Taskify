import React from 'react';
import { memberType } from '@/src/app/(afterLogin)/_constant/type';
import DropdownContent from '@/src/app/(afterLogin)/_component/ProfileImgCollection/DropdownContent';

interface Props {
  members: memberType[];
}

export default function ProfileDropdown({ members }: Props) {
  return (
    <div
      className={`absolute right-[-3rem] top-[3rem] z-[4] flex flex-col rounded border border-gray30 bg-white dark:border-black80 dark:bg-black90 md:right-[-3.5rem] lg:right-[-7.3rem]`}
    >
      {members.map((el, idx) => (
        <DropdownContent values={el} key={`${idx}profile`} />
      ))}
    </div>
  );
}
