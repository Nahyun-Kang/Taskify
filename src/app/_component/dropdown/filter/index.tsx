'use client';
import dropdown from '@/public/icons/arrow_drop_down_icon.svg';
import check from '@/public/icons/check.svg';
import { getMembersForDropdown } from '@/src/app/_api/todo';
import Image from 'next/image';
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dashboardIdState } from '@/src/app/_recoil/ModalAtom/todo';
import DefaultProfile from '@/src/app/(afterLogin)/_component/DefaultProfile';

interface Admin {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}

interface SelectUser {
  name: string;
  profile: string;
}

export default function DropdownAndFilter({
  assignee,
}: {
  assignee?: { profileImageUrl: string; nickname: string; id: number };
}) {
  const [imageValue, setImageValue] = useState(assignee?.profileImageUrl || '');
  const [focus, setFocus] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [curretValue, setCurrentValue] = useState<string>(assignee?.nickname || '');
  const [assignId, setAssignId] = useState((Number(assignee?.id) as number) || null);
  const [isSelectionComplete, setIsSelectionComplete] = useState(false);
  const [dropdownList, setDropdownList] = useState<Admin[] | null>(null);
  const [dashboardId] = useRecoilState(dashboardIdState);

  const { register, setValue, trigger } = useFormContext();
  const mount = useRef(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setOpenDropdown(true);
    setCurrentValue(e.target.value);
    if (!dropdownList) return;
    dropdownList.filter((admin) => {
      if (admin.nickname === e.currentTarget.value) {
        setIsSelectionComplete(true);
        setAssignId(admin.userId);
        setValue('assigneeUserId', +admin.userId);
        setOpenDropdown(false);
        if (admin.profileImageUrl) setImageValue(admin?.profileImageUrl);
      }
    });
    if (e.target.value === '') {
      setValue('assigneeUserId', 0);
      setOpenDropdown(false);
    }

    trigger('assigneeUserId');
  };

  const handleOnChangeDropdown = (user: SelectUser, id: number) => {
    setCurrentValue(user.name);
    setImageValue(user.profile);
    setOpenDropdown(false);
    setAssignId(id);
    setIsSelectionComplete(true);
    setValue('assigneeUserId', +id);
    trigger('assigneeUserId');
  };

  const SearchAdminName = (dropdownList as Admin[])?.filter((admin) => {
    if (!dropdownList) return;
    if (dropdownList.length > 0) {
      if (admin.nickname.includes(curretValue)) {
        return true;
      }
    } else {
      return dropdownList;
    }
  });

  const handleRenderInputBox = () => setIsSelectionComplete(false);
  const handleInputFocus = () => setFocus(true);
  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setFocus(false);
    setOpenDropdown(false);
  };
  const handleOpenDropdown = () => {
    setFocus(!focus);
    setOpenDropdown(!openDropdown);
  };

  useEffect(() => {
    const getMember = async () => {
      const memberList = await getMembersForDropdown(dashboardId);

      setDropdownList(memberList);
    };

    getMember();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (assignee && mount.current) {
      setIsSelectionComplete(true);
      setFocus(false);
      mount.current = false;
    }
    if (!isSelectionComplete && inputRef.current !== null) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelectionComplete]);

  return (
    <div className='relative flex flex-col items-start gap-[0.625rem] md:w-[13.5625rem] md:text-[1.125rem]'>
      <label className='text-black'>담당자</label>
      <div className='flex w-full flex-col items-start gap-[0.125rem]'>
        <span className='relative w-full'>
          {isSelectionComplete ? (
            <div
              onClick={handleRenderInputBox}
              className={
                'flex h-[3rem] w-full items-center gap-[0.8rem] rounded-[0.375rem] border px-[1rem] py-[0.625rem]  outline-none' +
                (focus ? 'border-violet' : 'border-gray-300')
              }
            >
              {imageValue ? (
                <div className=' relative rounded-full border sm:h-[2.125rem] sm:w-[2.125rem] sm:text-[0.875rem] md:h-[2.375rem] md:w-[2.375rem]'>
                  <Image src={imageValue} alt='circleLogo' fill style={{ borderRadius: '50%' }} />
                </div>
              ) : (
                <DefaultProfile nickName={curretValue} index={assignId as number} />
              )}

              <span className='text-[1rem]'>{curretValue}</span>
            </div>
          ) : (
            <input
              placeholder='이름을 입력해주세요'
              ref={inputRef}
              value={curretValue}
              onChange={handleOnChangeInput}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className={
                'flex w-full items-center gap-[0.8rem] rounded-[0.375rem] border border-gray-300 px-[1rem] py-[0.625rem] text-[0.875rem] outline-none md:h-[3rem] md:w-[13.5625rem] md:text-[1rem] ' +
                (focus ? 'border-violet' : 'border-gray-300')
              }
            />
          )}
          <input
            className='hidden'
            value={Number(assignId) as number}
            id='assigneeUserId'
            {...register('assigneeUserId', {
              valueAsNumber: true,
              validate: (id) => id > 0,
            })}
          />
          <div onClick={handleOpenDropdown} className='absolute right-[1rem] top-[0.625rem] h-[1.625rem] w-[1.625rem]'>
            <Image fill src={dropdown} alt='dropdown' />
          </div>
        </span>

        {openDropdown && SearchAdminName?.length ? (
          <div
            className={
              'absolute top-full z-50 mt-[2px] flex w-full flex-col gap-[0.9375rem] rounded-[0.375rem] border border-gray-300 bg-white px-[1rem] py-[0.625rem] outline-none'
            }
          >
            {SearchAdminName?.map((admin) => {
              return (
                <AdminOption
                  key={admin.id}
                  name={admin.nickname}
                  assignId={assignId as number}
                  userId={admin.userId}
                  onClick={handleOnChangeDropdown}
                  profile={admin.profileImageUrl}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export const AdminOption = ({
  onClick,
  name,
  userId,
  assignId,
  profile,
}: {
  onClick: (user: SelectUser, id: number) => void;
  name: string;
  userId: number;
  assignId: number;
  profile: string | null;
}) => {
  const handleSelectDropdown = (name: string, profile: string) => {
    onClick({ name, profile }, userId);
  };
  return (
    <>
      {name ? (
        <div onClick={() => handleSelectDropdown(name, profile as string)} className='flex items-center gap-[0.375rem]'>
          {assignId === userId ? (
            <Image src={check} alt='check' width={22} height={22} />
          ) : (
            <div className='w-[1.375rem]'></div>
          )}
          <div className='flex  items-center justify-center gap-[0.5rem]'>
            {profile !== null ? (
              <div className=' relative rounded-full border sm:h-[2.125rem] sm:w-[2.125rem] sm:text-[0.875rem] md:h-[2.375rem] md:w-[2.375rem]'>
                <Image src={profile} alt='circleLogo' fill style={{ borderRadius: '50%' }} />
              </div>
            ) : (
              <DefaultProfile nickName={name} index={userId} />
            )}
            <span className='text-[0.875rem]  md:text-[1rem]' id={name}>
              {name}
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};
