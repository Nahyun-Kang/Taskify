import calendarIcon from '@/public/icons/calendar_icon.svg';
import Image from 'next/image';
import Tag from '../../_component/Chip/Tag';

interface CardProps {
  title: string;
  tags: string[];
  createdAt: string;
  color: string;
  imageUrl: string;
  firstLetter: string;
}

const mockColors: { [key: string]: string } = {
  green: 'bg-[#86D549]',
  coral: 'bg-[#ff7f50]',
  violet: 'bg-[#5534DA]',
};

export default function Card({ title, tags, createdAt, color, imageUrl, firstLetter }: CardProps) {
  const bgColor = mockColors[color];
  return (
    <div className='flex flex-grow-0 flex-col gap-[0.625rem] rounded-[0.375rem] border border-gray30 bg-white px-3 py-3  md:flex-row md:items-center lg:max-w-[19.625rem] lg:flex-col lg:items-stretch lg:p-5'>
      {imageUrl && (
        <div className='relative h-[9.4891rem] w-[16.125rem] md:h-[3.3125rem] md:w-[5.6725rem] lg:h-[10rem] lg:w-[17rem]'>
          <Image src={imageUrl} fill alt={title} />
        </div>
      )}
      <div className='flex flex-1 flex-col gap-[0.625rem] md:flex-col'>
        <h3 className='text-[0.875rem] text-black80 md:text-[1rem]'>{title}</h3>
        <div className='flex justify-between gap-4'>
          <div className='flex flex-1 flex-col gap-[0.375rem] md:flex-row md:items-center md:gap-4 lg:gap-[0.625rem]'>
            <div className='flex gap-[0.375rem]'>
              {tags?.map((tag, i) => <Tag size='large' content={tag} key={i} />)}
            </div>
            <div className='flex flex-1 justify-between'>
              <div className='flex items-center gap-[0.375rem]'>
                <div className='relative h-[0.875rem] w-[0.875rem] md:h-[1.125rem] md:w-[1.125rem]'>
                  <Image src={calendarIcon.src} fill alt='달력 아이콘' />
                </div>
                <span className='flex h-6 w-6 items-center text-[0.625rem] text-gray50 md:text-[0.75rem]'>
                  {createdAt}
                </span>
              </div>
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-3xl ${bgColor} text-[0.625rem] font-semibold text-white md:text-[0.75rem]`}
              >
                {firstLetter}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
