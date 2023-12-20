'use client';
import Cancel from './_component/Button/Cancel';
import Input from './_component/Button/Input';
export default function Home() {
  const handleClick = () => {
    console.log('click ');
  };
  return (
    <main>
      <p>랜딩</p>
      <Input size='large' onClick={handleClick} />
      <Cancel size='small' onClick={handleClick} />
    </main>
  );
}
