export interface UserDataType {
  userInfo: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}
