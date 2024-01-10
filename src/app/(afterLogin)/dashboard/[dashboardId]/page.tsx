'use client';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CardList } from '@/src/app/(afterLogin)/_component/CardList';
import AddColumn from '@/src/app/_component/Button/AddColumn';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { createColumnState } from '@/src/app/_recoil/ModalAtom/column';
import { columnState, dashboardIdState } from '@/src/app/_recoil/ModalAtom/todo';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useCardDragEnd from '@/src/app/_hook/useDragEnd';
import { getAccessToken } from '@/src/app/_util/getAccessToken';
import CreateColumn from '@/src/app/_component/modal/column/create';

export default function DashBoard({ params }: { params: { dashboardId: string } }) {
  const [columns, setColumns] = useRecoilState(columnState);
  const setDashBoardId = useSetRecoilState(dashboardIdState);
  const [createColumn, setCreateColumn] = useRecoilState(createColumnState);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const {
      data: { data },
    } = await axiosInstance.get(`columns?dashboardId=${params.dashboardId}`);
    setColumns(data);
    setDashBoardId(params.dashboardId);
    setLoading(false);
  };

  const openCreateColumn = async () => {
    setCreateColumn(true);
  };

  const handleOnDragEnd = useCardDragEnd();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      router.push('/login');
      return;
    }

    getData();
    return () => setColumns([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='flex w-full flex-col pt-[4.3125rem] lg:h-screen lg:flex-row'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id.toString()}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    backgroundColor: snapshot.isDraggingOver ? '#F1EFFD' : '#FAFAFA',
                  }}
                  className='border-gray-20 hide-scrollbar flex flex-col border-b bg-gray10 lg:h-full lg:min-w-[22.125rem] lg:flex-col lg:overflow-scroll lg:border-b-0 lg:border-r'
                >
                  <CardList
                    key={column.id + 'col'}
                    id={column.id}
                    title={column.title}
                    dashboardId={params.dashboardId}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
        {loading ? (
          <></>
        ) : (
          <div className='border-gray-20 flex w-full flex-col gap-[1.0625rem] rounded-[0.375rem] border-b bg-gray10 px-3 py-4 md:gap-[1.5625rem] md:p-5 lg:flex-col lg:pt-[4.5rem]'>
            <div className='h-[3.75rem] md:h-[4.375rem] lg:w-[22.125rem]'>
              <AddColumn screen='mobile' onClick={openCreateColumn} />
            </div>
          </div>
        )}
      </div>
      {createColumn && <CreateColumn dashboardId={params.dashboardId} />}
    </>
  );
}
