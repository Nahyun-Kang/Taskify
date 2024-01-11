'use client';
import check from '@/public/icons/check.svg';
import { useInputField } from '@/src/app/_component/InputForm/InputStyle';
import { getColumns } from '@/src/app/_api/column';
import Image from 'next/image';
import { MouseEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import circle from '@/public/icons/Ellipse 54.svg';
import { useRecoilState } from 'recoil';
import { dashboardIdState } from '@/src/app/_recoil/ModalAtom/todo';
import ArrowDown from '@/src/app/_component/Icons/ArrowDown';
import { darkMode, darkModeText } from '@/src/app/darkMode';
interface Column {
  id: number;
  title: string;
  teamId: string;
  dashboardId: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function Dropdown({ column }: { column?: number }) {
  const [focus, setFocus] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [curretValue, setCurrentValue] = useState<string>('');
  const [columnId, setColumnId] = useState<number | null>(Number(column) || null);
  const [dropdownList, setDropdownList] = useState<Column[] | null>(null);
  const [dashboardId] = useRecoilState(dashboardIdState);

  const { register } = useInputField('columnId', {});
  const { setValue } = useFormContext();

  const handleOnChangeDropdown = (e: MouseEvent<HTMLSpanElement>, id: number) => {
    const { innerText } = e.target as HTMLElement;
    setCurrentValue(innerText);
    setOpenDropdown(false);
    setColumnId(+id);
    setValue('columnId', +id);
  };

  const handleOpenDropdown = () => {
    setFocus(!focus);
    setOpenDropdown(!openDropdown);
  };

  useEffect(() => {
    const getMember = async () => {
      const columnList = await getColumns(+dashboardId);
      if (column) {
        const columnForUpdate: Column[] = columnList?.filter((dropdown: Column) => {
          return dropdown.id === column;
        });
        const [newMember] = columnForUpdate;
        const newColumn = newMember.title;
        setCurrentValue(newColumn);
      }
      setDropdownList(columnList);
    };

    getMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [column]);

  return (
    <div className={`relative flex w-full flex-col items-start gap-[0.625rem] ${darkModeText}`}>
      <label className='md:text-[1.125rem]'>상태</label>
      <div className='flex w-full  flex-col items-start gap-[0.125rem]'>
        <span className='relative h-[3rem] w-full '>
          <div
            className={
              'flex w-full items-center gap-[0.8rem] rounded-[0.375rem] border border-gray-300 px-[1rem] py-[0.625rem] outline-none md:h-[3rem] ' +
              (focus ? 'border-violet' : 'border-gray-300')
            }
          >
            {dropdownList?.filter((dropdown) => {
              dropdown.title === curretValue;
            }) ? (
              <div className='flex items-center rounded-full bg-[#F1EFFD] px-[1rem] py-[0.625rem]'>
                <div className='flex gap-[0.375rem]'>
                  <Image src={circle} alt='circle' width={6} height={6} />
                  <span className='text-[0.625rem] text-violet md:text-[0.75rem]'>{curretValue}</span>
                </div>
              </div>
            ) : (
              <span className='text-[1rem]'>{curretValue}</span>
            )}
          </div>

          <input className='hidden' value={Number(columnId) as number} id='columnId' {...register} />
          <div onClick={handleOpenDropdown} className='absolute right-[1rem] top-[0.625rem] h-[1.625rem] w-[1.625rem]'>
            <ArrowDown />
          </div>
        </span>

        {openDropdown ? (
          <div
            className={`absolute top-[100%] z-50 mt-[2px] flex w-full flex-col gap-[0.9375rem] rounded-[0.375rem] border border-gray-300 bg-white px-[1rem] py-[0.625rem] outline-none ${darkMode}`}
          >
            {dropdownList?.map((column) => {
              return (
                <ColumnOption
                  key={column.id}
                  name={column.title}
                  columnId={columnId as number}
                  id={column.id}
                  onClick={handleOnChangeDropdown}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export const ColumnOption = ({
  onClick,
  name,
  id,
  columnId,
}: {
  onClick: (e: MouseEvent<HTMLSpanElement>, userId: number) => void;
  name: string;
  id: number;
  columnId: number;
}) => {
  const handleSelectDropdown = (e: MouseEvent<HTMLSpanElement>) => {
    onClick(e, id);
  };
  return (
    <>
      {name ? (
        <div className=' flex items-center gap-[0.375rem]' onClick={handleSelectDropdown}>
          {columnId === id ? (
            <Image src={check} alt='check' width={22} height={22} />
          ) : (
            <div className='w-[1.375rem]'></div>
          )}
          <div className='flex items-center rounded-full bg-[#F1EFFD] px-[0.5rem] py-[0.25rem]'>
            <div className='flex gap-[0.375rem]'>
              <Image src={circle} alt='circle' width={6} height={6} />
              <span className='text-[0.625rem] text-violet md:text-[0.75rem]' id={name}>
                {name}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
