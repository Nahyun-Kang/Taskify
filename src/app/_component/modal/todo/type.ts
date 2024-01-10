export interface TodoProps {
  mainTitle: string;
}

export interface ToDoCardDetailProps {
  columnId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  imageUrl: string;
  assignee: { profileImageUrl: string; nickname: string; id: number };
}

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}
