'use client';
import { Column } from '@/src/app/(afterLogin)/_constant/type';
import { CardList } from '@/src/app/(afterLogin)/dashboard/[dashboardId]/_component/CardList';
import AddColumn from '@/src/app/_component/Button/AddColumn';
import { MODALTYPE } from '@/src/app/_constant/modalType';
import useCardDragEnd from '@/src/app/_hook/useDragEnd';
import useRenderModal from '@/src/app/_hook/useRenderModal';
import { columnState, dashboardIdState } from '@/src/app/_recoil/CardAtom';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { getAccessToken } from '@/src/app/_util/getAccessToken';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';

export default function DashBoard({ params }: { params: { dashboardId: string } }) {
  const [columns, setColumns] = useRecoilState(columnState);
  const setDashBoardId = useSetRecoilState(dashboardIdState);
  const [modalType, callModal, setModalType] = useRenderModal();
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

  const onSubmitForCreateColumn = async (form: FieldValues) => {
    const titleValue = form.title;
    let errorOccurred = false;
    try {
      if (columns.find((column) => column.title === titleValue)) {
        return callModal({ name: '중복된 컬럼 이름입니다.' });
      }
      const res = await axiosInstance.post('columns', { ...form, dashboardId: Number(params.dashboardId) });
      setColumns((oldColumns: Column[]) => [...oldColumns, res.data]);
    } catch (error) {
      errorOccurred = true;
      if (isAxiosError(error)) {
        const serverErrorMessage = error.response?.data.message;
        return callModal({ name: serverErrorMessage ? serverErrorMessage : error.message });
      }
    } finally {
      if (!errorOccurred) {
        setModalType(null);
      }
    }
  };

  const handleRenderCreateColumn = async () => {
    callModal({ name: '새 칼럼 생성', onSubmit: onSubmitForCreateColumn });
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
      <div className='flex w-full flex-col pt-[4.3125rem] dark:bg-black lg:h-screen lg:flex-row'>
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
                  className='border-gray-20 hide-scrollbar flex flex-col border-b bg-gray10 dark:border-black80 lg:h-full lg:min-w-[22.125rem] lg:flex-col lg:overflow-scroll lg:border-b-0 lg:border-r'
                >
                  <CardList key={column.id + 'col'} id={column.id} title={column.title} boardId={params.dashboardId} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
        {loading ? (
          <></>
        ) : (
          <div className='border-gray-20 flex w-full flex-col gap-[1.0625rem] border-b bg-gray10 px-3 py-4 dark:border-black80 dark:bg-black md:gap-[1.5625rem] md:p-5 lg:flex-col lg:pt-[4.5rem]'>
            <div className='h-[3.75rem] md:h-[4.375rem] lg:w-[22.125rem]'>
              <AddColumn screen='mobile' id={MODALTYPE.COLUMN.CREATE} onClick={handleRenderCreateColumn} />
            </div>
          </div>
        )}
      </div>
      {modalType}
    </>
  );
}
