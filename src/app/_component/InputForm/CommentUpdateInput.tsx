import { SubmitHandler } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
export default function CommentUpdateInput({
  placeholder,
  id,
  initialValue = '',
  onUpdate,
  onCancel,
}: {
  onUpdate: SubmitHandler<FieldValues>;
  onCancel?: () => void;
  placeholder: string;
  id: string;
  isRequired?: boolean;
  initialValue?: string;
  validationRules?: {
    required?: {
      value: boolean;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
}) {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit(onUpdate)}>
        <div className='my-2 flex w-[39.0625rem] flex-col items-center gap-[0.375rem]'>
          <input
            id={id}
            type='text'
            className='w-full border-b-2  border-black focus:outline-none'
            placeholder={placeholder}
            defaultValue={initialValue}
            {...register('content')}
          />
          <div className=' flex w-full justify-end'>
            <button className='mr-1 rounded px-2 py-1 text-black hover:bg-blue' type='submit'>
              수정
            </button>
            <button type='button' className='rounded  px-2 py-1 text-black hover:bg-red' onClick={onCancel}>
              취소
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
