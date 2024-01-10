'use client';
import { getAccessToken } from '@/src/app/_util/getAccessToken';
import { useRouter } from 'next/navigation';

import InputForm from '@/src/app/_component/InputForm';
import AddImageFile from '@/src/app/(afterLogin)/_component/AddImageFile';
import Confirm from '@/src/app/_component/Button/Confirm';
import { getInputClass, InputWrapper, Label } from '@/src/app/_component/InputForm/InputStyle';
import { useRecoilState } from 'recoil';
import { FieldValues } from 'react-hook-form';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { userInfoState } from '@/src/app/_recoil/AuthAtom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfileEdit() {
  const inputClass = getInputClass(false) + ' text-gray40';
  const [user, setUser] = useRecoilState(userInfoState);
  const [mount, setMount] = useState(false);
  const router = useRouter();

  const editUser = async (data: FieldValues) => {
    const profile = {
      nickname: 'string',
      profileImageUrl: null,
      ...data,
    };
    const res = await axiosInstance.put('users/me', profile);
    setUser(res.data);
    toast.success('프로필이 성공적으로 변경되었습니다');
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      router.replace('/login');
    }
    setMount(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    mount && (
      <div>
        <div className='flex w-full'>
          <InputForm
            onSubmit={(data) => {
              editUser(data);
            }}
          >
            <div className='flex flex-col gap-6 dark:bg-black90 md:flex-row md:gap-4'>
              <AddImageFile size='big' profileImageUrl={user.profileImageUrl} />
              <div className='flex w-full flex-col gap-4 md:gap-5'>
                <InputWrapper>
                  <Label label='이메일' htmlFor='email' />
                  <div className={inputClass}>사용자 이메일</div>
                </InputWrapper>
                <InputForm.TextInput
                  label='닉네임'
                  placeholder='닉네임 입력'
                  id='nickname'
                  validationRules={{ required: { value: true, message: '닉네임을 입력해주세요' } }}
                  initialValue={user.nickname}
                />
              </div>
            </div>
            <div className='flex w-full justify-end'>
              <div className='mt-4 h-7 w-[5.25rem] md:mt-5 md:h-8 md:w-[5.25rem]'>
                <Confirm size='free' btnName='저장' onClick={() => {}} />
              </div>
            </div>
          </InputForm>
          <div className='flex flex-grow flex-col justify-center gap-4 md:ml-4'></div>
        </div>
      </div>
    )
  );
}
