import { TodoProps } from '@/src/app/_component/modal/toDoCard/type';

export default function DeleteTodo({ mainTitle }: TodoProps) {
  return (
    <>
      <span className='flex items-center justify-center text-[1rem] font-medium text-black'>{mainTitle}</span>
    </>
  );
}
