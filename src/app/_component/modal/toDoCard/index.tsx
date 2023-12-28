'use client';
import useRenderModal from '@/src/app/_hook/useRenderModal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DropdownAndFilter from '../../dropdown/filter';
import InputForm from '../../InputForm';
import { DetailAssignee, DetailCardComment, DetailIconButton, DetailMainContent } from './DetailComponent';
import AddImageFile from '@/src/app/(afterLogin)/_component/AddImageFile';
import { axiosInstance } from '@/src/app/_util/axiosInstance';
import { FieldValues, useFormContext } from 'react-hook-form';
import Dropdown from '../../dropdown';
// import { SubmitHandler } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { cardStateAboutColumn } from '@/src/app/_recoil/cardAtom';
import { CardInfo } from '@/src/app/(afterLogin)/_constant/type';
interface TodoProps {
  mainTitle: string;
}

export interface ToDoCardDetailProps {
  columnId?: number;
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
// 할 일 카드 생성 모달 내용
export function CreateToDo({ mainTitle }: TodoProps) {
  const { watch, setValue } = useFormContext();
  const title = watch('title');
  const description = watch('description');
  const assigneeUserId = watch('assigneeUserId');
  const dueDate = watch('dueDate');
  const imageUrl = watch('imageUrl');
  const tags = watch('tags');

  const isButtonDisabled = !(title && description && assigneeUserId && dueDate && imageUrl && tags.length >= 1);
  setValue('isDisabled2', isButtonDisabled);
  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <DropdownAndFilter />
      <InputForm.TextInput label='제목' placeholder='제목을 입력해주세요' id='title' isRequired={true} />
      <InputForm.TextInput label='설명' placeholder='설명을 입력해주세요' id='description' isRequired={true} />
      <InputForm.DateInput label='마감일' id='dueDate' placeholder='날짜 선택' />
      <InputForm.TagInput label='태그' id='tags' placeholder='입력 후 Enter' />
      <AddImageFile size='big' />
    </>
  );
}
// 할 일 카드 수정 모달 내용
export function UpdateToDo({ mainTitle, cardData }: { mainTitle: string; cardData: ToDoCardDetailProps }) {
  const { watch, setValue } = useFormContext();
  const title = watch('title');
  const description = watch('description');

  const isButtonDisabled = !(title && description);
  setValue('isDisabled', isButtonDisabled);

  return (
    <>
      <span className='font-Pretendard text-[1.5rem] font-bold'>{mainTitle}</span>
      <div className='flex justify-between'>
        <Dropdown column={cardData.columnId} />
        <DropdownAndFilter assignee={cardData.assignee} />
      </div>
      <InputForm.TextInput
        label='제목'
        placeholder='제목을 입력해주세요'
        id='title'
        isRequired={true}
        initialValue={cardData.title}
      />
      <InputForm.TextInput
        label='설명'
        placeholder='설명을 입력해주세요'
        id='description'
        isRequired={true}
        initialValue={cardData.description}
      />
      <InputForm.DateInput label='마감일' id='dueDate' placeholder='날짜 입력' initialDate={new Date('2023-12-24')} />
      <InputForm.TagInput label='태그' id='tags' placeholder='입력 후 Enter' initialTags={cardData.tags} />
      <AddImageFile size='big' profileImageUrl={cardData.imageUrl} />
    </>
  );
}

// 할 일 카드 삭제 모달 내용
export function DeleteTodo({ mainTitle }: TodoProps) {
  return (
    <>
      <span className='flex items-center justify-center text-[1rem] font-medium text-black'>{mainTitle}</span>
    </>
  );
}

export interface commentType {
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

// 할 일 카드 상세 모달 내용
export function DetailToDo({ cardId, onClose, columnId }: { cardId: number; onClose: () => void; columnId: number }) {
  console.log('columnId', columnId);
  const [show, setShow] = useState(true);
  const setCards = useSetRecoilState(cardStateAboutColumn(columnId));

  const [cardData, setCardData] = useState<ToDoCardDetailProps | null>(null);
  const [isOpenPopOver, setIsOpenPopOver] = useState(false);
  const [comments, setComments] = useState<commentType[] | null>(null);
  const [modalType, callModal, setModalType] = useRenderModal();

  // 카드 수정 서브밋 함수
  const putCard = async (form: FieldValues) => {
    try {
      const res = await axiosInstance.put(`cards/${cardId}`, {
        ...form,
        columnId: +form.columnId,
        assigneeUserId: +form.assigneeUserId,
      });
      setCards((oldCards: CardInfo[]) => oldCards.map((item) => (item.id === cardId ? { ...res.data } : item)));
      console.log('cards2', res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setModalType(null);
    }
  };
  // 카드 수정 모달 호출 함수
  const RenderUpdatedoModal = (e: React.MouseEvent<HTMLDivElement>, cardData: ToDoCardDetailProps) => {
    callModal({ name: (e.target as HTMLElement).id, onSubmit: putCard, cardData: cardData });
    setShow(false);
  };

  // 카드 삭제 서브밋 함수
  const DeleteCard = async () => {
    try {
      await axiosInstance.delete(`cards/${cardId}`);
      setCards((oldCards: CardInfo[]) => oldCards.filter((item) => item.id !== cardId));
    } catch (error) {
      console.log(error);
    } finally {
      setModalType(null);
    }
  };
  // 카드 삭제 모달 호출 함수
  const RenderDeleteModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof callModal === 'function') {
      callModal({ name: (e.target as HTMLElement).id, onSubmit: DeleteCard });
      setShow(false);
    }
  };
  // 특정 카드 클릭 시 할 일 카드 상세 모달에 데이터 바인딩하기 위한 api 요청
  const handleRenderCard = async () => {
    try {
      const res = await axiosInstance.get(`cards/${cardId}`);

      const newData = res.data;
      setCardData(newData);
    } catch (error) {
      console.log(error);
    }
  };
  // 댓글 생성 함수

  // const createComment: SubmitHandler<FieldValues> = async (data: FieldValues) => {
  //   console.log(data);
  //   try {
  //     const res = await axiosInstance.post('comments', { ...data, columnId: 50, cardId: 59 });
  //     setComments((prev) => [res.data, ...(prev ? prev : [])]);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // 할 일 카드 상세 모달 마운트 시 기존의 댓글을 보여주는 함수
  const getComment = async () => {
    try {
      const res = await axiosInstance.get('comments?size=10&cardId=59');
      setComments(res.data.comments);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // const onSubmit = async (data: FieldValues) => {
  //   await createComment(data);
  // };

  const handleKebab = () => setIsOpenPopOver(true);
  // 할 일 카드 상세 모달 마운트 시 해당 카드 및 댓글 데이터바인딩
  useEffect(() => {
    handleRenderCard();
    getComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!cardData) return;
  console.log(show);
  if (!show) {
    return <>{modalType}</>;
  }

  return (
    <>
      {modalType ? (
        <>{modalType}</>
      ) : (
        <>
          <div className='fixed left-0 top-0 z-[1000] flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-70'>
            <div
              className=' relative flex flex-col gap-[1rem] rounded-[0.5rem] border border-white bg-white sm:w-[20.4375rem]
              sm:px-[1.25rem] sm:py-[2.5rem] md:w-[42.5rem] md:px-[1.75rem] md:py-[2rem] lg:w-[45.625rem]'
            >
              <DetailIconButton
                handleKebab={handleKebab}
                onUpdate={RenderUpdatedoModal}
                onDelete={RenderDeleteModal}
                isOpenPopOver={isOpenPopOver}
                onClose={onClose}
                cardData={cardData}
              />
              <span className='flex text-[1.5rem] font-bold text-black'>{cardData.title}</span>
              <div className=' sm:flex  sm:flex-col-reverse md:flex md:flex-row md:justify-between'>
                <DetailMainContent tags={cardData.tags} description={cardData.description} />
                <DetailAssignee assignee={cardData.assignee} dueDate={cardData.dueDate} />
              </div>
              <div className=' flex flex-col gap-[1.5rem]  sm:w-[17.9375rem] md:w-[28.125rem]'>
                <div className='relative flex sm:h-[8.3125rem] sm:w-[17.9375rem] md:h-[16.375rem] md:w-[28.125rem]'>
                  {cardData.imageUrl && <Image src={cardData.imageUrl} fill alt='imageUrl' />}
                </div>

                <InputForm.CommentInput id='content' placeholder='댓글을 입력해주세요' label='댓글' />

                {comments?.map((comment) => {
                  return <DetailCardComment key={comment.id} data={comment} />;
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
