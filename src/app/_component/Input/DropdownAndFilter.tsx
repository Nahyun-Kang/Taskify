'use client';
import dropdown from '@/public/icons/arrow_drop_down_icon.svg';
import check from '@/public/icons/check.svg';
import circleProfile from '@/public/icons/circleProfile.svg';
import { useInputField } from '@/src/app/_component/InputForm/InputStyle';
import Image from 'next/image';
import { ChangeEvent, FocusEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface AdminProps {
  id: number;
  adminName: string;
}
// mock 데이터 입니다. 지금 스웨거 쓰기 애매해서 만들어 놓았습니다. profileImageUrl은 일단 생략했습니다. 임시로 다른 이미지 썼고, 나중에 SRC에 추가만 하면 작동하도록 만들어 놓았습니다.
const adminList: AdminProps[] = [
  { id: 1, adminName: '배유철' },
  { id: 119, adminName: '고민혁' },
  { id: 3, adminName: '강나현' },
  { id: 4, adminName: '남궁수영' },
  { id: 86, adminName: '윤대호' },
  { id: 6, adminName: '호날두' },
  { id: 7, adminName: '구혜지' },
];

export default function DropdownAndFilter() {
  const [focus, setFocus] = useState(false); // 인풋 포커스 여부
  const [openDropdown, setOpenDropdown] = useState(false); // 드롭다운 개폐여부
  const [curretValue, setCurrentValue] = useState<string>(''); // 인풋에 대한 입력값 참조
  const [assignId, setAssignId] = useState(0); // 담당자 ID (클릭 시 체크표시 렌더링 + REACT-HOOK-FORM 이용하신다길래 그대로 유지)
  const [isSelectionComplete, setIsSelectionComplete] = useState(false); // 인풋에 이름 입력 다하거나 OR 드롭다운 내부에 있는 이름 클릭하면 TRUE가됨+ 인풋이 DIV로 바뀜 (IMG와 이름 가져오기 위해)

  const inputRef = useRef<HTMLInputElement>(null);

  // input 태그의 사용자 입력을 받고, 받아온 데이터의 요소들과 입력 값이 일치하는 경우 해당 요소 담당자로 지정
  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setOpenDropdown(true);
    setCurrentValue(e.target.value);
    adminList.filter((admin) => {
      if (admin.adminName === e.currentTarget.value) {
        setIsSelectionComplete(true);
        setAssignId(admin.id);
        setValue('assigneeUserId', admin.id);
        setOpenDropdown(false);
      }
    });
    if (e.target.value === '') {
      setOpenDropdown(false);
    }
  };

  // 드롭 다운 내 사용자 클릭을 받아서, 담당자로 지정
  const handleOnChangeDropdown = (e: MouseEvent<HTMLSpanElement>, id: number) => {
    const { innerText } = e.target as HTMLElement;
    console.log(e.target);
    setCurrentValue(innerText);
    setOpenDropdown(false);
    setAssignId(id);
    setIsSelectionComplete(true);
    setValue('assigneeUserId', id);
  };

  // 사용자 입력 받을 시 Dropdown filter 기능
  const SearchAdminName = adminList.filter((admin) => {
    if (adminList.length > 0) {
      if (admin.adminName.includes(curretValue)) {
        return true;
      }
    } else {
      return adminList;
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
  const { register } = useInputField('assigneeUserId', {});
  const { setValue } = useFormContext();
  // 담당자 지정 후 수정을 위해 DIV박스 누르면 INPUT으로 바꾸고, 인풋창에 바로 포커스 (이렇게 안하면 두 번 클릭해야 포커스가 됨)
  useEffect(() => {
    if (!isSelectionComplete && inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [isSelectionComplete]);

  return (
    <div className='flex w-[13.5625rem] flex-col items-start gap-[0.625rem]'>
      <label className='text-[1.125rem] text-black'>담당자</label>
      <div className='flex flex-col items-start gap-[0.125rem]'>
        <span className='relative'>
          {isSelectionComplete ? (
            <div
              onClick={handleRenderInputBox}
              className={
                'flex w-[13.5625rem] items-center gap-[0.8rem] rounded-[0.375rem] border border-gray-300 px-[1rem]  py-[0.625rem]  outline-none ' +
                (focus ? 'border-violet' : 'border-gray-300')
              }
            >
              <Image src={circleProfile} alt='circleLogo' width={26} height={26} />
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
                'flex w-[13.5625rem] items-center gap-[0.8rem] rounded-[0.375rem] border border-gray-300 px-[1rem]  py-[0.625rem]  outline-none ' +
                (focus ? 'border-violet' : 'border-gray-300')
              }
            />
          )}
          <input className='hidden' value={assignId} id='assigneeUserId' {...register} />
          <div onClick={handleOpenDropdown} className='absolute right-[1rem] top-[0.625rem] h-[1.625rem] w-[1.625rem]'>
            <Image fill src={dropdown} alt='dropdown' />
          </div>
        </span>

        {openDropdown && SearchAdminName.length ? (
          <div
            className={
              'flex w-full flex-col gap-[0.9375rem] rounded-[0.375rem] border border-gray-300 px-[1rem] py-[0.625rem] outline-none'
            }
          >
            {SearchAdminName.map((admin) => {
              return (
                <AdminOption
                  key={admin.id}
                  name={admin.adminName}
                  assignId={assignId}
                  id={admin.id}
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

// 받아온 데이터에 있는 요소들을 표현한 컴포넌트
export const AdminOption = ({
  onClick,
  name,
  id,
  assignId,
}: {
  onClick: (e: MouseEvent<HTMLSpanElement>, id: number) => void;
  name: string;
  id: number;
  assignId: number;
}) => {
  const handleSelectDropdown = (e: MouseEvent<HTMLSpanElement>) => {
    onClick(e, id);
  };
  return (
    <>
      {name ? (
        <div className='flex items-center gap-[0.375rem]'>
          {assignId === id ? (
            <Image src={check} alt='check' width={22} height={22} />
          ) : (
            <div className='w-[1.375rem]'></div>
          )}
          <div className='flex  gap-[0.5rem]'>
            <Image src={circleProfile} alt='circleLogo' width={26} height={26} />
            <span onClick={handleSelectDropdown} className='text-[1rem]' id={name}>
              {name}
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};
