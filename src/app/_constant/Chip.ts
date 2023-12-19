export interface ColorsProp {
  id: number;
  color: string;
  colorCode: string;
}
const TAG = {
  TO_DO: 'To Do',
  PROGRESS: 'On Progress',
  DONE: 'Done',
};

const STATUS = {
  PROJECT: '프로젝트',
  NORMAL: '일반',
  BACKEND: '백엔드',
  HIGH: '상',
};

const COLORS: ColorsProp[] = [
  {
    id: 1,
    color: 'bg-green',
    colorCode: '#7AC555',
  },
  {
    id: 2,
    color: 'bg-purple',
    colorCode: '#760DDE',
  },
  {
    id: 3,
    color: 'bg-orange',
    colorCode: '#FFA500',
  },
  {
    id: 4,
    color: 'bg-blue',
    colorCode: '#76A5EA',
  },
  {
    id: 5,
    color: 'bg-pink',
    colorCode: '#E876EA',
  },
];

export { TAG, STATUS, COLORS };
