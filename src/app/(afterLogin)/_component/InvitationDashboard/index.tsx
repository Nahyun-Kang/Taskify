'use client';
import { ChangeEvent, useState } from 'react';

import InvitationList from './InvitationList';
import MagnifyingGlass from './MagnifyingGlass';

export default function InvitationDashboard() {
  const [value, setValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className='rounded-lg border-none bg-white px-[1.75rem] pb-[.0625rem] pt-8 '>
      <h2 className='mb-5 text-[1.25rem] font-bold text-black80 md:text-[1.5rem]'>초대받은 대시보드</h2>
      <div className='mb-6 flex w-full gap-2 rounded-[.375rem] border-[.0625rem] px-4 py-2'>
        <MagnifyingGlass />
        <input
          onChange={handleInputChange}
          placeholder='검색'
          className='w-full text-[.875rem] focus:outline-none md:text-base'
        ></input>
      </div>
      <InvitationList value={value} />
    </div>
  );
}
