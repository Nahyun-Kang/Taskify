import settingIcon from '@/public/icons/settings_icon.svg';
import Image from 'next/image';
import Number from '../../_component/Chip/Number';
import Card from './Card';

const mock = [
  {
    id: '1',
    title: '새로운 일정 관리 Taskify',
    tags: ['프로젝트', '백엔드'],
    createdAt: '2022.12.31',
    color: 'coral',
    imageUrl: '',
    nickname: 'ㅎㅎ',
  },
  {
    id: '2',
    title: '기존의 일정 관리 Taskify',
    tags: ['프로젝트', '상'],
    createdAt: '2022.12.31',
    color: 'green',
    imageUrl: '/public/images/landing5.png',
    nickname: 'BCDEF',
  },
  {
    id: '2',
    title: '일정 관리 Taskify',
    tags: ['일반', '프론트엔드'],
    createdAt: '2022.12.31',
    color: 'violet',
    imageUrl: '',
    nickname: '안녕하세요',
  },
];

export default function CardList() {
  return (
    <div className='border-gray-20 flex max-w-[19.25rem] flex-grow-0 flex-col gap-[1.0625rem] rounded-[0.375rem] border bg-gray10 px-3 py-4 md:max-w-[584px] md:gap-[1.5625rem] md:p-5 lg:h-screen lg:max-w-[354px] lg:flex-col'>
      <div className='flex items-center gap-2'>
        <span
          className={`flex h-2 w-2 items-center justify-center rounded-3xl bg-violet text-[0.75rem] text-white`}
        ></span>
        <div className='flex items-center gap-3 text-[1rem] font-bold text-black md:text-[1.125rem]'>
          <h3>To Do</h3>
          <Number num={mock.length} />
        </div>
        <div className='relative ml-auto h-[1.375rem] w-[1.375rem] md:h-[1.5rem] md:w-[1.5rem]'>
          <Image src={settingIcon.src} fill alt='설정 아이콘' />
        </div>
      </div>
      <div className='flex max-w-[17.75rem] flex-col justify-center gap-[0.625rem] md:max-w-[34rem] md:gap-4'>
        <button className='border-gray-30 h-8 border-[0.0625rem] bg-white lg:h-10'>버튼자리</button>
        {mock.map((mockCard) => (
          <Card
            key={mockCard.id}
            title={mockCard.title}
            tags={mockCard.tags}
            createdAt={mockCard.createdAt}
            color={mockCard.color}
            imageUrl={mockCard.imageUrl}
            firstLetter={mockCard.nickname[0]}
          />
        ))}
      </div>
    </div>
  );
}
