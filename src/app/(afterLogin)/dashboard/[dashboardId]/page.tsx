'use client';
import CardList from '@/src/app/(afterLogin)/_component/CardList';
import AddColumn from '@/src/app/_component/Button/AddColumn';

const mockData = [
  {
    title: 'To Do',
    cursorId: 1,
    totalCount: 5,
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
          profileImageUrl: '/images/landing5.png',
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
        title: '일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify Taskify',
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
  },
  {
    title: 'On Progress',
    cursorId: 2,
    totalCount: 7,
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
          profileImageUrl: '/images/landing5.png',
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
        title: '일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify Taskify',
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
      {
        id: 6,
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
      {
        id: 7,
        title:
          '일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify 일정 관리 Taskify',
        description: 'string',
        tags: ['상', '프로젝트', '일반'],
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
  },
  {
    title: 'Done',
    cursorId: 3,
    totalCount: 2,
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
          profileImageUrl: '/images/landing5.png',
          nickname: 'BCDEF',
          id: 0,
        },
        imageUrl: '/images/landing5.png',
        teamId: 'string',
        columnId: 0,
        createdAt: '2023-12-21T04:12:30.578Z',
        updatedAt: '2023-12-21T04:12:30.578Z',
      },
    ],
  },
];

export default function DashBoard() {
  return (
    <div className='flex flex-col lg:flex-row'>
      {mockData.map((column) => (
        <CardList
          key={column.cursorId}
          title={column.title}
          cursorId={column.cursorId}
          cards={column.cards}
          totalCount={column.totalCount}
        />
      ))}
      <div className='border-gray-20 flex w-full flex-col gap-[1.0625rem] rounded-[0.375rem] border-b bg-gray10 px-3 py-4 md:gap-[1.5625rem] md:p-5 lg:min-h-screen lg:flex-col lg:pt-[4.5rem]'>
        <div className='h-[3.75rem] md:h-[4.375rem] lg:w-[22.125rem]'>
          <AddColumn screen='mobile' onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
