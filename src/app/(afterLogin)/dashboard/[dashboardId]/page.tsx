'use client';
import { CardList } from '@/src/app/(afterLogin)/_component/CardList';
import AddColumn from '@/src/app/_component/Button/AddColumn';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Column } from '@/src/app/(afterLogin)/_constant/type';

import { columnState, dashboardIdState } from '@/src/app/_recoil/cardAtom';

import { FieldValues } from 'react-hook-form';
import useRenderModal from '@/src/app/_hook/useRenderModal';

import { MODALTYPE } from '@/src/app/_constant/modalType';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useCardDragEnd from '@/src/app/_hook/useDragEnd';

export default function DashBoard({ params }: { params: { dashboardId: string } }) {
  const [columns, setColumns] = useRecoilState(columnState);
  const setDashBoardId = useSetRecoilState(dashboardIdState);
  const [modalType, callModal, setModalType] = useRenderModal();

  const getData = async () => {
    const {
      data: { data },
    } = await axiosInstance.get(`columns?dashboardId=${params.dashboardId}`);
    setColumns(data);
    setDashBoardId(params.dashboardId);
  };

  const onSubmitForCreateColumn = async (form: FieldValues) => {
    try {
      const res = await axiosInstance.post('columns', { ...form, dashboardId: Number(params.dashboardId) });
      setColumns((oldColumns: Column[]) => [...oldColumns, res.data]);
    } catch (error) {}
    setModalType(null);
  };

  const handleRenderCreateColumn = async (e: React.MouseEvent<HTMLElement>) => {
    callModal({ name: (e.target as HTMLElement).id, onSubmit: onSubmitForCreateColumn });
  };

  const handleOnDragEnd = useCardDragEnd();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='mt-[4.3125rem] flex w-full flex-col lg:flex-row'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id.toString()}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <CardList key={column.id + 'col'} id={column.id} title={column.title} boardId={params.dashboardId} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
        <div className='border-gray-20 flex w-full flex-col gap-[1.0625rem] rounded-[0.375rem] border-b bg-gray10 px-3 py-4 md:gap-[1.5625rem] md:p-5 lg:flex-col lg:pt-[4.5rem]'>
          <div className='h-[3.75rem] md:h-[4.375rem] lg:w-[22.125rem]'>
            <AddColumn screen='mobile' id={MODALTYPE.COLUMN.CREATE} onClick={handleRenderCreateColumn} />
          </div>
        </div>
      </div>
      {modalType}
    </>
  );
}
