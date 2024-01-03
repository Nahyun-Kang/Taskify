'use client';

import MagnifyingGlass from '@/src/app/(afterLogin)/_component/Icons/MagnifyingGlass';
import InvitationList from '@/src/app/(afterLogin)/_component/InvitationDashboard/InvitationList';
import NoInvitation from '@/src/app/(afterLogin)/_component/InvitationDashboard/NoInvitation';
import { Invitations } from '@/src/app/(afterLogin)/_constant/type';
import { getDashboards, getPaginatedDashboards, putInvitation } from '@/src/app/_api/Dashboards';
import useInfiniteScroll from '@/src/app/_hook/useInfiniteScroll';
import { dashboardState } from '@/src/app/_recoil/dashboardAtom';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { DashboardProps } from '@/src/app/(afterLogin)/_constant/Dashboard';

export default function InvitationDashboard({
  setDashboards,
  page,
}: {
  setDashboards: (value: DashboardProps[]) => void;
  page: number;
}) {
  const setDashboardData = useSetRecoilState(dashboardState);
  const [invitations, setInvitations] = useState<Invitations[]>([]);
  const [cursorId, setCursorId] = useState('');

  const [value, setValue] = useState('');

  const target = useRef<HTMLDivElement>(null);

  const getInvitations = useCallback(async () => {
    if (cursorId === null) return;
    const query = cursorId ? `&cursorId=${cursorId}` : '';
    const { data } = await axiosInstance.get(`invitations?size=6${query}`);
    setInvitations((prev) => [...prev, ...data.invitations]);
    setCursorId(data.cursorId || null);
  }, [cursorId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onIntersect: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        getInvitations();
      }
    });
  };

  const handleInvitation = async (invitationId: number, accepted: boolean) => {
    await putInvitation(invitationId, accepted);
    if (accepted) {
      const data = await getDashboards();
      if (data) {
        setDashboardData(data);
        const result = await getPaginatedDashboards(page, 5);
        setDashboards(result.dashboards);
      }
    }
    setInvitations(invitations.filter((invitation) => invitation.id !== invitationId));
  };

  useInfiniteScroll({ target, onIntersect: onIntersect, size: cursorId });

  return (
    <div className='rounded-lg border-none bg-white px-[1.75rem] pb-[.0625rem] pt-8'>
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
          <InvitationList value={value} list={invitations} handleInvitation={handleInvitation} />
        </div>
      ) : (
        <NoInvitation />
      )}
      {cursorId !== null && <div ref={target}></div>}
    </div>
  );
}
