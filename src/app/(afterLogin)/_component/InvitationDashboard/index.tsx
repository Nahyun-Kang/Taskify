'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import InvitationList from './InvitationList';
import MagnifyingGlass from '../Icons/MagnifyingGlass';
import NoInvitation from './NoInvitation';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { getAccessToken } from '@/src/app/_util/axiosInstance';

export default function InvitationDashboard() {
  const [invitations, setInvitations] = useState([]);
  const getInvitations = useCallback(async () => {
    const { data } = await axiosInstance.get('invitations', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    setInvitations(data.invitations);
  }, []);

  const [value, setValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    getInvitations();
  }, [getInvitations]);

  return (
    <div className='rounded-lg border-none bg-white px-[1.75rem] pb-[.0625rem] pt-8 '>
      <h2 className='mb-5 text-[1.25rem] font-bold text-black80 md:text-[1.5rem]'>초대받은 대시보드</h2>
      {invitations.length !== 0 ? (
        <div>
          <div className='mb-6 flex w-full gap-2 rounded-[.375rem] border-[.0625rem] px-4 py-2'>
            <MagnifyingGlass />
            <input
              onChange={handleInputChange}
              placeholder='검색'
              className='w-full text-[.875rem] focus:outline-none md:text-base'
            ></input>
          </div>
          <InvitationList value={value} list={invitations} />
        </div>
      ) : (
        <NoInvitation />
      )}
    </div>
  );
}
