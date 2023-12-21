import settingIcon from '@/public/icons/settings_icon.svg';
import Number from '@/src/app/_component/Chip/Number';
import Image from 'next/image';
import Card from './Card';

const mockData = {
  cursorId: 0,
  totalCount: 0,
  cards: [
    {
      id: 1,
      title: '새로운 일정 관리 Taskify',
      description: 'string',
      tags: ['프로젝트', '백엔드'],
      dueDate: '2022.12.31',
      assignee: {
        profileImageUrl: '',
        nickname: 'ㅎㅎ',
        id: 0,
      },
      imageUrl: '',
      teamId: 'string',
      columnId: 0,
      createdAt: '2023-12-21T04:12:30.578Z',
      updatedAt: '2023-12-21T04:12:30.578Z',
    },
    {
      id: 2,
      title: '기존의 일정 관리 Taskify',
      description: 'string',
      tags: ['상', '프로젝트', '일반', '백엔드', '프로젝트', '프로젝트', '상', '프로젝트', '일반', '상', '프로젝트'],
      dueDate: '2022.7.31',
      assignee: {
        profileImageUrl:
          'https://png.pngtree.com/png-clipart/20190116/ourmid/pngtree-halloween-lovely-meng-meng-little-ghost-png-image_376546.jpg',
        nickname: 'BCDEF',
        id: 0,
      },
      imageUrl: '/images/landing5.png',
      teamId: 'string',
      columnId: 0,
      createdAt: '2023-12-21T04:12:30.578Z',
      updatedAt: '2023-12-21T04:12:30.578Z',
    },
    {
      id: 3,
      title: '일정 관리 Taskify',
      description: 'string',
      tags: ['일반', '프론트엔드'],
      dueDate: '2024.1.23',
      assignee: {
        profileImageUrl: '',
        nickname: '안녕하세요',
        id: 0,
      },
      imageUrl: '',
      teamId: 'string',
      columnId: 0,
      createdAt: '2023-12-21T04:12:30.578Z',
      updatedAt: '2023-12-21T04:12:30.578Z',
    },
    {
      id: 4,
      title: '일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify',
      description: 'string',
      tags: ['일반', '프론트엔드'],
      dueDate: '2024.1.23',
      assignee: {
        profileImageUrl: '',
        nickname: '반갑습니다',
        id: 4,
      },
      imageUrl: '/images/landing3.png',
      teamId: 'string',
      columnId: 0,
      createdAt: '2023-12-21T04:12:30.578Z',
      updatedAt: '2023-12-21T04:12:30.578Z',
    },
    {
      id: 5,
      title: '일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify',
      description: 'string',
      tags: ['상', '프로젝트', '일반', '백엔드', '프로젝트', '프로젝트', '상', '프로젝트', '일반'],
      dueDate: '2024.1.23',
      assignee: {
        profileImageUrl: '',
        nickname: '호호',
        id: 5,
      },
      imageUrl: '/images/landing3.png',
      teamId: 'string',
      columnId: 0,
      createdAt: '2023-12-21T04:12:30.578Z',
      updatedAt: '2023-12-21T04:12:30.578Z',
    },
  ],
};

const mockColors: { [key: string]: string } = {
  1: 'bg-[#86D549]',
  2: 'bg-[#ff7f50]',
  3: 'bg-[#5534DA]',
};

export default function CardList() {
  return (
    <div className='border-gray-20 flex min-w-[19.25rem] max-w-[19.25rem] flex-grow-0 flex-col gap-[1.0625rem] rounded-[0.375rem] border-b bg-gray10 px-3 py-4 md:max-w-[36.5rem] md:gap-[1.5625rem] md:p-5 lg:min-h-screen lg:max-w-[22.25rem] lg:flex-col lg:border-b-0 lg:border-r'>
      <div className='flex items-center gap-2'>
        <span
          className={`flex h-2 w-2 items-center justify-center rounded-3xl bg-violet text-[0.75rem] text-white`}
        ></span>
        <div className='flex items-center gap-3 text-[1rem] font-bold text-black md:text-[1.125rem]'>
          <h3>To Do</h3>
          <Number num={mockData.cards.length} />
        </div>
        <button className='relative ml-auto h-[1.375rem] w-[1.375rem] md:h-[1.5rem] md:w-[1.5rem]'>
          <Image src={settingIcon.src} fill alt='설정 아이콘' />
        </button>
      </div>
      <div className='flex max-w-[17.75rem] flex-col justify-center gap-[0.625rem] md:max-w-[34rem] md:gap-4'>
        <button className='border-gray-30 h-8 border-[0.0625rem] bg-white lg:h-10'>버튼자리</button>
        {mockData.cards.map((mockCard) => (
          <Card
            key={mockCard.id}
            title={mockCard.title}
            tags={mockCard.tags}
            dueDate={mockCard.dueDate}
            imageUrl={mockCard.imageUrl}
            bgColor={mockColors[mockCard.id % 3 || 3]}
            nickname={mockCard.assignee.nickname}
            profileImageUrl={mockCard.assignee.profileImageUrl}
          />
        ))}
      </div>
    </div>
  );
}
