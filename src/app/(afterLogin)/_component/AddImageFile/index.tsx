'use client';

import addLargeImg from '@/public/icons/add_icon_large.svg';
import Image from 'next/image';
import penImg from '@/public/icons/pen.svg';
import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import uploadImageForServer from './uploadImage';

interface Props {
  size: 'big' | 'small';
  profileImageUrl?: string;
}

const Size = {
  big: {
    wrapper: 'h-[6.25rem] w-[6.25rem] md:w-[11.375rem] md:h-[11.375rem]',
    iconSize: 'h-[1.25rem] w-[1.25rem] md:w-[1.875rem] md:h-[1.875rem]',
    penSize: 'h-[1.875rem] w-[1.875rem]',
  },
  small: {
    wrapper: 'h-[3.625rem] w-[3.625rem] md:w-[4.75rem] md:h-[4.75rem]',
    iconSize: 'h-[1.75rem] w-[1.75rem]',
    penSize: 'h-[1.3355rem] w-[1.3355rem] md:w-[1.875rem] md:h-[1.875rem]',
  },
};

export default function AddImageFile({ size = 'big', profileImageUrl = '' }: Props) {
  const [image, setImage] = useState(profileImageUrl);
  const style = { backgroundImage: `url(${image})` };

  const { setValue } = useFormContext();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files as FileList;
    let fileURL;
    if (size === 'big') {
      fileURL = await uploadImageForServer(files[0], 'users/me/image');
      setValue('profileImageUrl', fileURL);
    } else {
      fileURL = await uploadImageForServer(files[0], 'columns/50/card-image');
      setValue('imageUrl', fileURL);
    }
    setImage(fileURL);
  };

  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden rounded-md bg-[#f5f5f5] bg-cover ${Size[size].wrapper}`}
      style={style}
    >
      <input id='avatar' type='file' className='hidden' onChange={handleChange} accept='image/*' />
      <label htmlFor='avatar' className='group flex h-full w-full items-center justify-center'>
        {!image && <Image src={addLargeImg} alt='이미지 추가 버튼' className={`${Size[size].iconSize}`} priority />}
        {image && (
          <div className='hidden h-full w-full items-center justify-center bg-[#000000]/[.6] group-hover:flex'>
            <Image src={penImg} alt='이미지 수정 버튼' className={`${Size[size].penSize}`} priority />
          </div>
        )}
      </label>
    </div>
  );
}
