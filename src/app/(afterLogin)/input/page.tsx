'use client';
import InputForm from '@/src/app/_component/InputForm';
import { FieldValues } from 'react-hook-form';
export default function Inputs() {
  const handleSubmit = (data: FieldValues) => console.log(data);

  return (
    <div>
      <InputForm onSubmit={handleSubmit}>
        <InputForm.EmailInput label='이메일' placeholder='이메일을 입력해주세요.' id='email' />
        <InputForm.PasswordInput label='비밀번호' placeholder='비밀번호를 입력해주세요.' id='password' />
        <InputForm.TextInput label='텍스트' placeholder='텍스트를 입력해주세요.' id='text' />
        <InputForm.DateInput label='날짜' id='date' placeholder='날짜 선택' />
        <InputForm.CommentInput label='댓글' placeholder='댓글을 입력해주세요.' id='comment' handleClick={() => {}} />
        <InputForm.TagInput label='태그' placeholder='태그를 입력해주세요.' id='tag' />
      </InputForm>
    </div>
  );
}
