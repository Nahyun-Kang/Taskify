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

export interface Column {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CardType = {
  cursorId: 0;
  totalCount: 0;
  cards: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    dueDate: string;
    assignee: {
      profileImageUrl: string;
      nickname: string;
      id: number;
    };
    imageUrl: string;
    teamId: string;
    columnId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
