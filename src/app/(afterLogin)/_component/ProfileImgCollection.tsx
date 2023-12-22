'use client';

import { useEffect, useState } from 'react';
import Profile from './ProfileImg';
import useGetMembers from '../_util/useGetMembers';
import { memberType } from '../_constant/type';

export default function ProfileCollection() {
  const [count, setCount] = useState(4);
  const { data } = useGetMembers(19, 6);
  console.log(data);

  const arr = data?.members.filter((el: memberType) => el.userId !== 31); // 유저 아이디
  const profiles = arr?.slice(0, count - 1);

  const handleResize = () => {
    if (window.innerWidth > 1440) {
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
