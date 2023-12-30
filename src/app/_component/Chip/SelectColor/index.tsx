'use client';
import { COLORS, ColorsProp } from '@/src/app/_constant/Chip';
import Image from 'next/image';
import check from '@/public/icons/check_color.svg';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface SelectColorProps {
  selectedColor?: string;
}

export default function SelectColor({ selectedColor = '' }: SelectColorProps) {
  const { register, setValue, trigger } = useFormContext();
  const [selected, setSelected] = useState(selectedColor);
  const handleClick = (val: ColorsProp) => {
    const newValue = selected === val.colorCode ? '' : val.colorCode;
    setSelected(newValue);
    setValue('color', newValue);
    trigger('color');
  };
  useEffect(() => {
    register('color', { required: true, value: selectedColor });
  }, [register, selectedColor]);
  return (
    <div className='flex flex-row gap-[0.625rem]'>
      {COLORS.map((val) => (
        <div
          key={val.id}
          className={` h-[1.875rem] w-[1.875rem] rounded-[0.9375rem] ${val.color} relative cursor-pointer  rounded-[50%]`}
          onClick={() => handleClick(val)}
        >
          {val.colorCode === selected && (
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
