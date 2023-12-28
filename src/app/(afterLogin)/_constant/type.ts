export interface memberType {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isOwner: boolean;
}

export interface userInfoType {
  email: string | null;
  id: number | null;
  nickname: string | null;
  profileImageUrl: string | null;
  updatedAt: string | null;
}

export type accessTokenType = string | null;
