import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function EditLayout({ title, children }: Props) {
  return (
    <div className='max-w-[38.75rem] rounded-lg bg-white px-5 pb-5 pt-7'>
      <div className='mb-6 text-[1.5rem] font-bold md:mb-8'>{title}</div>
      {children}
    </div>
  );
}
