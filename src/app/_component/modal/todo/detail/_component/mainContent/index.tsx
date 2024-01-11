'use client';
import Image from 'next/image';
import Tag from '@/src/app/_component/Chip/Tag';
import circle from '@/public/icons/Ellipse 54.svg';
import { useRecoilValue } from 'recoil';
import { columnState } from '@/src/app/_recoil/ModalAtom/todo';

export default function MainContent({
  tags,
  description,
  columnId,
}: {
  tags: string[];
  description: string;
  columnId: number;
}) {
  const columns = useRecoilValue(columnState);
  const newColumn = columns.find((column) => column.id === columnId);
  return (
    <>
      <div className='flex gap-[1.25rem]'>
        <div className=' flex items-start gap-[1.25rem] text-[0.625rem] md:text-[0.75rem]'>
          <span>
            {
              <div className='flex flex-shrink-0 items-center rounded-[6.25rem] bg-[#F1EFFD] px-[0.5rem] py-[0.25rem]'>
                <div className='flex gap-[0.375rem] overflow-hidden'>
                  <Image src={circle} alt='circle' width={6} height={6} priority />
                  <span className='whitespace-nowrap text-violet'>{newColumn?.title}</span>
                </div>
              </div>
            }
          </span>
          {tags.length !== 0 && <span className='h-5 w-0 border-[0.0625rem] border-gray30' />}
        </div>
        <div className='flex flex-wrap gap-[0.375rem]'>
          {tags.map((tag) => (
            <Tag content={tag} key={tag} />
          ))}
        </div>
      </div>
      <div className='flex flex-wrap py-4 text-[0.875rem] text-black'>{description}</div>
    </>
  );
}
