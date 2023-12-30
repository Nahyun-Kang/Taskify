export interface userInfoType {
  email: string | null;
  id: number | null;
  nickname: string | undefined;
  profileImageUrl: string;
  updatedAt: string | null;
}

export interface accessTokenType {
  token: string | null;
}
