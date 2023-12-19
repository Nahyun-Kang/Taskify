'use client';
import { COLORS, ColorsProp } from '@/src/app/_constant/Chip';
import Image from 'next/image';
import check from '@/public/icons/check_color.svg';
import { useState } from 'react';

interface SelectColorProps {
  onSelect: (colorCode: string) => void;
}

function SelectColor({ onSelect }: SelectColorProps) {
  const [selected, setSelected] = useState(1);
  const handleClick = (val: ColorsProp) => {
    setSelected((prevId) => (prevId === val.id ? 0 : val.id));
    onSelect(val.colorCode);
  };
  return (
    <div className='flex flex-row gap-[0.625rem]'>
      {COLORS.map((val) => (
        <div
          key={val.id}
          className={` h-[1.875rem] w-[1.875rem] rounded-[0.9375rem] ${val.color} relative translate-x-1/2  cursor-pointer`}
          onClick={() => handleClick(val)}
        >
          {val.id === selected && (
            <Image
              className='absolute left-0 top-0 h-full w-full'
              width={24}
              height={24}
              src={check.src}
              alt='체크 표시'
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default SelectColor;
