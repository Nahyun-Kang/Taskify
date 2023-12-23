'use client';

import { useEffect, useState } from 'react';
import Profile from './ProfileImg';

const members = {
  members: [
    {
      nickname: '남궁수영',
      profileImageUrl: '',
      isOwner: true,
    },
    {
      nickname: '이상혁',
      profileImageUrl: '',
      isOwner: false,
    },
    {
      nickname: '강나현',
      profileImageUrl:
        'https://png.pngtree.com/png-clipart/20190116/ourmid/pngtree-halloween-lovely-meng-meng-little-ghost-png-image_376546.jpg',
      isOwner: false,
    },
    {
      nickname: 'Henry',
      profileImageUrl: '',
      isOwner: false,
    },
    {
      nickname: '윤대호',
      profileImageUrl: '',
      isOwner: false,
    },
    {
      nickname: '구혜지',
      profileImageUrl: '',
      isOwner: false,
    },
    {
      nickname: '고민혁',
      profileImageUrl: '',
      isOwner: false,
    },
    {
      nickname: 'Key',
      profileImageUrl: '',
      isOwner: false,
    },
  ],
  totalCount: 8,
};

export default function ProfileCollection() {
  const [count, setCount] = useState(0);

  //
  const arr = members.members.slice(0, count).filter((el) => !el.isOwner);
  const newArr = arr.slice(0, count - 1);

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
      {newArr.map((member, i) => (
        <Profile idx={i} values={member} total={members.totalCount} key={i + 'p'} count={count} />
      ))}
    </div>
  );
}
