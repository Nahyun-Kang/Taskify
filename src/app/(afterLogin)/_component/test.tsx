'use client';

import InputField from '../../_component/Input/InputField';
import InputForm from '../../_component/InputForm';

export default function Test() {
  return (
    <div>
      <InputForm onSubmit={() => {}}>
        <InputField.labelText='이메일' placeholder='이메일을 입력해' id='email' />
        <InputField.PasswordInput labelText='비번' placeholder='입력해' id='pass' />
        <InputField.TextInput labelText='텍스트' placeholder='입력해' id='text' />
        <InputField.DateInput labelText='날짜' id='date' />
        <InputField.CommentInput labelText='댓글' placeholder='댓글' id='comment' handleClick={() => {}} />
      </InputForm>
      <InputForm onSubmit={() => {}}>
        <InputField.TagInput labelText='태그' placeholder='태그' id='tag' />
      </InputForm>
    </div>
  );
}
