import { UserDataType } from '@/src/app/_constant/type';

export const getAccessToken = () => {
  let userDatas;
  let accessToken = '';
  if (typeof window !== 'undefined') {
    userDatas = localStorage.getItem('taskifyUserData');
  }

  if (userDatas) {
    const userData: UserDataType = JSON.parse(userDatas);
    accessToken = userData.accessToken;
    return accessToken;
  }
};
