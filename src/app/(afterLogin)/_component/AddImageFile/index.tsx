'use client';

import addLargeImg from '@/public/icons/add_icon_large.svg';
import Image from 'next/image';
import penImg from '@/public/icons/pen.svg';
import { ChangeEvent, useState } from 'react';

interface Props {
  size: 'big' | 'small';
}

const Size = {
  big: {
    wrapper: 'h-[6.25rem] w-[6.25rem] md:w-[11.25rem] md:h-[11.25rem]',
    iconSize: 'h-[1.25rem] w-[1.25rem] md:w-[1.875rem] md:h-[1.875rem]',
    penSize: 'h-[1.875rem] w-[1.875rem]',
  },
  small: {
    wrapper: 'h-[3.625rem] w-[3.625rem] md:w-[4.75rem] md:h-[4.75rem]',
    iconSize: 'h-[1.75rem] w-[1.75rem]',
    penSize: 'h-[1.3355rem] w-[1.3355rem] md:w-[1.875rem] md:h-[1.875rem]',
  },
};

export default function AddImageFile({ size = 'big' }: Props) {
  const [image, setImage] = useState('');
  const style = { backgroundImage: image };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files as FileList;
    const fileURL = URL.createObjectURL(files[0]);
    setImage(`url(${fileURL})`);
  };

  return (
    <div className={`relative overflow-hidden rounded-md bg-[#f5f5f5] bg-cover ${Size[size].wrapper}`} style={style}>
      <input type='file' name='' id='avatar' className='hidden' onChange={handleChange} accept='image/*' />
      <label htmlFor='avatar' className='group flex h-full w-full items-center justify-center'>
        {!image && <Image src={addLargeImg} alt='이미지 추가 버튼' className={`${Size[size].iconSize}`} />}
        {image && (
          <div className='hidden h-full w-full items-center justify-center bg-[#000000]/[.6] group-hover:flex'>
            <Image src={penImg} alt='이미지 수정 버튼' className={`${Size[size].penSize}`} />
          </div>
        )}
      </label>
    </div>
  );
}
