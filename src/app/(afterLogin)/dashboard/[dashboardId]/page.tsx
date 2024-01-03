'use client';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { CardList } from '@/src/app/(afterLogin)/_component/CardList';
import AddColumn from '@/src/app/_component/Button/AddColumn';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { Column } from '@/src/app/(afterLogin)/_constant/type';
import useRenderModal from '@/src/app/_hook/useRenderModal';
import { columnState, dashboardIdState } from '@/src/app/_recoil/CardAtom';
import { MODALTYPE } from '@/src/app/_constant/modalType';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useCardDragEnd from '@/src/app/_hook/useDragEnd';
import { getAccessToken } from '@/src/app/_util/getAccessToken';

export default function DashBoard({ params }: { params: { dashboardId: string } }) {
  const [columns, setColumns] = useRecoilState(columnState);
  const setDashBoardId = useSetRecoilState(dashboardIdState);
  const [modalType, callModal, setModalType] = useRenderModal();
  const router = useRouter();

  const getData = async () => {
    const {
      data: { data },
    } = await axiosInstance.get(`columns?dashboardId=${params.dashboardId}`);
    setColumns(data);
    setDashBoardId(params.dashboardId);
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
      <div className='flex h-screen w-full flex-col pt-[4.3125rem] lg:flex-row'>
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
                  className='border-gray-20 h-full border-b lg:border-b-0 lg:border-r'
                >
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
