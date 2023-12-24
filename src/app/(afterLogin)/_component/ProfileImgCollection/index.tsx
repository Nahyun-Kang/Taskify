'use client';

import { useEffect, useState } from 'react';
import Profile from './ProfileImg';
import useGetMembers from '@/src/app/(afterLogin)/_util/useGetMembers';
import { memberType } from '@/src/app/(afterLogin)/_constant/type';

// TODO: 현재 유저 아이디, 대시보드 아이디로 교체해야함
export default function ProfileCollection() {
  const [count, setCount] = useState(4);
  const { data } = useGetMembers(14, 6);

  const arr = data?.members.filter((el: memberType) => el.userId !== 31);
  const profiles = arr?.slice(0, count - 1);

  const handleResize = () => {
    if (window.innerWidth >= 1440) {
      setCount(6);
    } else if (window.innerWidth > 744) {
      setCount(4);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='relative flex'>
      {data?.totalCount !== 0 &&
        profiles?.map((member: memberType, i: number) => (
          <Profile idx={i} values={member} total={data.totalCount} key={i + 'p'} count={count} />
        ))}
    </div>
  );
}
