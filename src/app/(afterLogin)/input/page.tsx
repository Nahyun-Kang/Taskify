'use client';
import InputField from '../../_component/Input/InputField';
import { FormData } from '../../_constant/Input';
export default function Inputs() {
  const handleSubmit = (data: FormData) => console.log(data);
  return (
    <div>
      <InputField onSubmit={handleSubmit}>
        <InputField.EmailInput label='이메일' placeholder='이메일을 입력해주세요.' id='email' />
        <InputField.PasswordInput label='비밀번호' placeholder='비밀번호를 입력해주세요.' id='password' />
        <InputField.TextInput label='텍스트' placeholder='텍스트를 입력해주세요.' id='text' />
        <InputField.DateInput label='날짜' id='date' placeholder='날짜 선택' />
        <InputField.CommentInput label='댓글' placeholder='댓글을 입력해주세요.' id='comment' handleClick={() => {}} />
        <InputField.TagInput label='태그' placeholder='태그를 입력해주세요.' id='tag' />
      </InputField>
    </div>
  );
}
