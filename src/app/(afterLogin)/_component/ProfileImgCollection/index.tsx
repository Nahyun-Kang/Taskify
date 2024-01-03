'use client';

import { useEffect, useState } from 'react';
import Profile from '@/src/app/(afterLogin)/_component/ProfileImgCollection/ProfileImg';
// import useGetMembers from '@/src/app/(afterLogin)/_util/useGetMembers';
import { memberType } from '@/src/app/(afterLogin)/_constant/type';
import { getMembers } from '@/src/app/_api/Dashboards';

interface Props {
  dashboardId: string;
  userId: number | null;
}

// TODO: 현재 유저 아이디, 대시보드 아이디로 교체해야함
export default function ProfileCollection({ dashboardId, userId }: Props) {
  const [count, setCount] = useState(4);
  const [members, setMembers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  // const { data } = useGetMembers(+dashboardId, 6);

  const margin = (totalCount: number) => {
    if (totalCount <= 1) {
      return 'mr-0 md:mr-0 lg:mr-0';
    } else if (totalCount <= 3) {
      return 'mr-[2rem] md:mr-[3.25rem] lg:mr-[4rem]';
    } else if (totalCount <= 5) {
      return 'mr-[3.75rem] md:mr-[5rem] lg:mr-[7rem]';
    } else if (totalCount >= 6) {
      return 'mr-[3.75rem] md:mr-[5.25rem] lg:mr-[9.5rem]';
    }
  };

  const arr = members.filter((el: memberType) => el.userId !== userId);
  const profiles = arr?.slice(0, count - 1);

  const handleResize = () => {
    if (window.innerWidth >= 1440) {
      setCount(6);
    } else if (window.innerWidth > 744) {
      setCount(4);
    }
  };

  const getMemeberList = async () => {
    const result = await getMembers(dashboardId, 1, 6);
    setMembers(result.members);
    setTotalCount(result.totalCount);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMemeberList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardId, userId]);
  return (
    <div className={`relative flex ${margin(totalCount)}`}>
      {totalCount !== 0 &&
        profiles?.map((member: memberType, i: number) => (
          <Profile idx={i} values={member} total={totalCount} key={i + 'p'} count={count} />
        ))}
    </div>
  );
}
