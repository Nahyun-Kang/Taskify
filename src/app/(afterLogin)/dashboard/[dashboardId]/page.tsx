'use client';
import CardList from '@/src/app/(afterLogin)/_component/CardList';
import AddColumn from '@/src/app/_component/Button/AddColumn';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { useEffect, useState } from 'react';
import { Column } from '../../_constant/type';

export default function DashBoard({ params }: { params: { dashboardId: string } }) {
  const [columns, setColumns] = useState([]);

  const getData = async () => {
    const {
      data: { data },
    } = await axiosInstance.get(`columns?dashboardId=${params.dashboardId}`);
    setColumns(data);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex h-screen w-full flex-col pt-[4.3125rem] lg:flex-row'>
      {columns.map((column: Column) => (
        <CardList key={column.id + 'col'} id={column.id} title={column.title} />
      ))}
      <div className='border-gray-20 flex w-full flex-col gap-[1.0625rem] rounded-[0.375rem] border-b bg-gray10 px-3 py-4 md:gap-[1.5625rem] md:p-5 lg:flex-col lg:pt-[4.5rem]'>
        <div className='h-[3.75rem] md:h-[4.375rem] lg:w-[22.125rem]'>
          <AddColumn screen='mobile' onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
