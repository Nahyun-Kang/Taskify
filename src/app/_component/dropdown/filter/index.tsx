'use client';
import check from '@/public/icons/check.svg';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import Image from 'next/image';
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dashboardIdState } from '@/src/app/_recoil/CardAtom';
import DefaultProfile from '@/src/app/(afterLogin)/_component/DefaultProfile';
import ArrowDown from '@/src/app/_component/Icons/ArrowDown';
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
  const [focus, setFocus] = useState(false); // 인풋 포커스 여부
  const [openDropdown, setOpenDropdown] = useState(false); // 드롭다운 개폐여부
  const [curretValue, setCurrentValue] = useState<string>(assignee?.nickname || ''); // 인풋에 대한 입력값 참조
  const [assignId, setAssignId] = useState((Number(assignee?.id) as number) || null); // 담당자 ID (클릭 시 체크표시 렌더링 + REACT-HOOK-FORM 이용하신다길래 그대로 유지)
  const [isSelectionComplete, setIsSelectionComplete] = useState(false); // 인풋에 이름 입력 다하거나 OR 드롭다운 내부에 있는 이름 클릭하면 TRUE가됨+ 인풋이 DIV로 바뀜 (IMG와 이름 가져오기 위해)
  const [dropdownList, setDropdownList] = useState<Admin[] | null>(null);
  const [dashboardId] = useRecoilState(dashboardIdState);

  const { register, setValue, trigger } = useFormContext();
  const mount = useRef(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // input 태그의 사용자 입력을 받고, 받아온 데이터의 요소들과 입력 값이 일치하는 경우 해당 요소 담당자로 지정
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

  // 드롭 다운 내 사용자 클릭을 받아서, 담당자로 지정
  const handleOnChangeDropdown = (user: SelectUser, id: number) => {
    setCurrentValue(user.name);
    setImageValue(user.profile);
    setOpenDropdown(false);
    setAssignId(id);
    setIsSelectionComplete(true);
    setValue('assigneeUserId', +id);
    trigger('assigneeUserId');
  };

  // 사용자 입력 받을 시 Dropdown filter 기능

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

  // 각 종 동적 UI
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

  // const idToNickname = () => {
  //   if (assignee === null) return;

  //   const idForUpdate = dropdownList?.filter((dropdown) => dropdown.id === assignee);
  //   if (idForUpdate) setCurrentValue(idForUpdate[0]?.nickname);
  // };
  // 담당자 지정 후 수정을 위해 DIV박스 누르면 INPUT으로 바꾸고, 인풋창에 바로 포커스 (이렇게 안하면 두 번 클릭해야 포커스가 됨)
  useEffect(() => {
    const getMember = async () => {
      const res = await axiosInstance.get(`members?dashboardId=${dashboardId}`);
      const { members } = res.data;
      setDropdownList(members);
    };

    getMember();
    // idToNickname();
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
      <label>담당자</label>
      <div className='flex w-full flex-col items-start gap-[0.125rem]'>
        <span className='relative w-full'>
          {isSelectionComplete ? (
            <div
              onClick={handleRenderInputBox}
              className={
                'flex h-[3rem] w-full items-center gap-[0.8rem] rounded-[0.375rem] border px-[1rem] py-[0.625rem]  outline-none dark:bg-black90 ' +
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
                'flex w-full items-center gap-[0.8rem] rounded-[0.375rem] border border-gray-300 px-[1rem] py-[0.625rem] text-[0.875rem] outline-none dark:bg-black90 md:h-[3rem] md:w-[13.5625rem] md:text-[1rem] ' +
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
            <ArrowDown />
          </div>
        </span>

        {openDropdown && SearchAdminName?.length ? (
          <div
            className={
              'absolute top-full z-50 mt-[2px] flex w-full flex-col gap-[0.9375rem] rounded-[0.375rem] border border-gray-300 bg-white px-[1rem] py-[0.625rem] outline-none dark:bg-black90'
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

// 받아온 데이터에 있는 요소들을 표현한 컴포넌트
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
