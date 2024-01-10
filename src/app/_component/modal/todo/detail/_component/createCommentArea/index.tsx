import InputForm from '@/src/app/_component/InputForm';
import { useParams } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { createComment } from '@/src/app/_api/comment';
import { CommentType } from '@/src/app/_component/modal/todo/type';
import { useSetRecoilState } from 'recoil';
import { commentsStateAboutCardId } from '@/src/app/_recoil/ModalAtom/todo';

export default function CreateCommentArea({ cardId, columnId }: { cardId: number; columnId: number }) {
  const setComments = useSetRecoilState(commentsStateAboutCardId(cardId));
  const params = useParams();
  const onSubmitCreateComment = async (data: FieldValues) => {
    try {
      const newComment = await createComment(data, Number(params.dashboardId), cardId, columnId);
      setComments((prev: CommentType[]) => [newComment, ...(prev ? prev : [])]);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <InputForm onSubmit={onSubmitCreateComment}>
      <InputForm.CommentInput id='content' placeholder='댓글을 입력해주세요' label='댓글'></InputForm.CommentInput>
    </InputForm>
  );
}
